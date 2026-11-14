import type { PlaneBasic, PlanesOnMap, VerticalDirection } from '@/types.ts';

const EMPTY = '-';
const MS_TO_KMH = 3.6;
const MINUTE = 60 * 1000;

const numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const timeFormat = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });

/**
 * exponential backoff with jitter
 */
export const backoff = (attempt: number): number => {
    return Math.min(10000 + Math.random() * 1000, 1000 * 2 ** attempt + Math.random() * 1000);
};

/**
 * Round number and format with commas
 */
export const formatNumber = (value?: number): string => {
    if (value === undefined) return EMPTY;
    return numberFormat.format(value);
};

/**
 * m/s to km/h
 */
export const formatSpeed = (metersPerSec?: number): string => {
    if (metersPerSec === undefined) return EMPTY;
    return formatNumber(metersPerSec * MS_TO_KMH);
};

/**
 * Value without minus + direction for the arrow icon
 */
export const formatVerticalSpeed = (metersPerSec?: number): { value: string; direction: VerticalDirection } => {
    if (metersPerSec === undefined) return { value: EMPTY, direction: 'level' };

    const value = Math.abs(metersPerSec).toFixed(1);
    if (value === '0.0') return { value, direction: 'level' };

    return { value, direction: metersPerSec > 0 ? 'up' : 'down' };
};

/**
 * Degrees format
 */
export const formatHeading = (deg?: number): string => {
    if (deg === undefined) return EMPTY;
    return `${Math.round(deg) % 360}°`;
};

/**
 * Timestamp "HH:mm"
 */
export const formatTime = (timestamp?: number): string => {
    if (timestamp === undefined) return EMPTY;
    return timeFormat.format(timestamp);
};

/**
 * "45m" or "2h 5m"
 */
export const formatDuration = (minutes?: number): string => {
    if (minutes === undefined) return EMPTY;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    if (hours === 0) return `${rest}m`;
    return `${hours}h ${rest}m`;
};

/**
 * "in 1h 20m"
 */
export const formatTimeLeft = (arrival?: number): string => {
    if (arrival === undefined) return '';
    const minutesLeft = Math.floor((arrival - Date.now()) / MINUTE);
    if (minutesLeft < 0) return 'overdue';
    if (minutesLeft === 0) return 'arriving';
    return `in ${formatDuration(minutesLeft)}`;
};

/**
 * Ratio from 0 to 1 for progress bars
 */
export const getRatio = (part?: number, total?: number): number => {
    if (part === undefined || !total) return 0;
    return Math.min(part / total, 1);
};

/**
 * FLight progress from 0 to 1 for progress bars
 */
export const getFlightProgress = (flownMinutes?: number, arrival?: number): number => {
    if (flownMinutes === undefined || arrival === undefined) return 0;
    const leftMinutes = Math.max(0, (arrival - Date.now()) / MINUTE);
    return getRatio(flownMinutes, flownMinutes + leftMinutes);
};

/**
 * Calculate heading using prev and next steps lat and lon
 */
export const getBearing = (prev: PlanesOnMap | undefined, next: PlaneBasic): number => {
    if (!prev) return 0;

    const dLat = next.latitude - prev.latitude;
    const dLng = (next.longitude - prev.longitude) * Math.cos((prev.latitude * Math.PI) / 180);

    const deg = (Math.atan2(dLng, dLat) * 180) / Math.PI;
    return (deg + 360) % 360;
};

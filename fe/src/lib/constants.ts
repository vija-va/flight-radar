import type { DetailsStatus, FlightStatus, SocketStatus } from '@/types.ts';

export const IDLE_TIMEOUT_MS = 5000;
export const SERVER_REJECT_CLOSE_CODE = 1008;
export const MAX_RECONNECT_ATTEMPTS = 10;

export const SOCKET_LABELS: Record<SocketStatus, string> = {
    open: 'Live',
    connecting: 'Connecting',
    reconnecting: 'Reconnecting',
    closed: 'Offline',
};

export const FLIGHT_STATUS_LABELS: Record<FlightStatus, string> = {
    departed: 'Departed',
    enroute: 'En route',
    cruising: 'Cruising',
    landing: 'Landing',
};

export const DETAILS_STATUS_LABELS: Record<DetailsStatus, string> = {
    idle: 'Idle',
    loading: 'Loading',
    live: 'Live',
    error: 'Error',
};

export const DETAILS_STATUS_DOT: Record<DetailsStatus, SocketStatus> = {
    idle: 'closed',
    loading: 'connecting',
    live: 'open',
    error: 'closed',
};

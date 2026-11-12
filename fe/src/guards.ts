import type { Airport, FlightStatus, PlaneBasic, PlaneDetailed } from './types.ts';

type Callback = (value: unknown) => boolean;

type Primitive = 'string' | 'number' | 'boolean';

const FLIGHT_STATUS_SET: Record<FlightStatus, true> = {
    departed: true,
    enroute: true,
    cruising: true,
    landing: true,
};

export const typeGuard = <T>(
    obj: unknown,
    schema: Record<keyof T, Primitive | Callback>,
): obj is Record<string, unknown> => {
    if (obj === null || typeof obj !== 'object') {
        return false;
    }

    const record = obj as Record<string, unknown>;

    for (const [key, rule] of Object.entries(schema)) {
        if (!Object.hasOwn(record, key)) {
            return false;
        }
        if (typeof rule === 'function') {
            if (!rule(record[key])) return false;
        } else {
            if (typeof record[key] !== rule) return false;
        }
    }
    return true;
};

const isAirport = (obj: unknown): obj is Airport => {
    return typeGuard<Airport>(obj, {
        airport: 'string',
        city: 'string',
    });
};

export const isPlaneBasic = (obj: unknown): obj is PlaneBasic => {
    return typeGuard<PlaneBasic>(obj, {
        id: 'string',
        latitude: 'number',
        longitude: 'number',
        altitude: 'number',
        color: 'string',
    });
};

export const isPlaneDetailed = (obj: unknown): obj is PlaneDetailed => {
    return typeGuard<PlaneDetailed>(obj, {
        id: 'string',
        model: 'string',
        airline: 'string',
        flightNumber: 'string',
        registration: 'string',
        latitude: 'number',
        longitude: 'number',
        altitude: 'number',
        speed: 'number',
        heading: 'number',
        verticalSpeed: 'number',
        origin: isAirport,
        destination: isAirport,
        flightDuration: 'number',
        estimatedArrival: 'number',
        numberOfPassengers: 'number',
        maxPassengers: 'number',
        status: (value) => typeof value === 'string' && Object.hasOwn(FLIGHT_STATUS_SET, value),
        color: 'string',
    });
};

import type {
    Airport,
    BasicPlanesMessage,
    ErrorMessage,
    FlightStatus,
    PlaneBasic,
    PlaneDetailed,
    PlaneDetailsMessage,
    ServerMessage,
} from './types.ts';

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

const isBasicPlanesMessage = (msg: unknown): msg is BasicPlanesMessage => {
    return typeGuard<BasicPlanesMessage>(msg, {
        type: (value) => value === 'planes',
        data: (value) => Array.isArray(value),
    });
};

const isPlaneDetailsMessage = (msg: unknown): msg is PlaneDetailsMessage => {
    return typeGuard<PlaneDetailsMessage>(msg, {
        type: (value) => value === 'plane-details',
        data: (value) => isPlaneDetailed(value),
    });
};

const isErrorMessage = (msg: unknown): msg is ErrorMessage => {
    return typeGuard<ErrorMessage>(msg, {
        type: (value) => value === 'error',
        message: 'string',
    });
};

export const isServerMessage = (msg: unknown): msg is ServerMessage => {
    return isBasicPlanesMessage(msg) || isPlaneDetailsMessage(msg) || isErrorMessage(msg);
};

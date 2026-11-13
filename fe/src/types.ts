export type FlightStatus = 'departed' | 'enroute' | 'cruising' | 'landing';
export type DetailsStatus = 'idle' | 'loading' | 'live' | 'error';
export type SocketStatus = 'connecting' | 'open' | 'reconnecting' | 'closed';

export type Airport = {
    airport: string;
    city: string;
};

export type PlaneBasic = {
    id: string;
    latitude: number;
    longitude: number;
    altitude: number;
    color: string;
};

export type PlaneDetailed = {
    id: string;

    // Aircraft
    model: string;
    airline: string;
    flightNumber: string;
    registration: string;

    // Position
    latitude: number;
    longitude: number;
    altitude: number; // meters
    speed: number; // meters per second
    heading: number;
    verticalSpeed: number;

    // Route
    origin: Airport;
    destination: Airport;

    // Time
    flightDuration: number;
    estimatedArrival: number;

    // Load & status
    numberOfPassengers: number;
    maxPassengers: number;
    status: FlightStatus;

    // UI
    color: string;
};

export type BasicPlanesMessage = {
    type: 'planes';
    data: PlaneBasic[];
};

export type PlaneDetailsMessage = {
    type: 'plane-details';
    data: PlaneDetailed;
};

export type SubscribeMessage = {
    type: 'subscribe';
    planeId: string;
};

export type ErrorMessage = { type: 'error'; message: string };

export type ServerMessage = BasicPlanesMessage | PlaneDetailsMessage | ErrorMessage;

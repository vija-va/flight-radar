export type FlightStatus = 'departed' | 'enroute' | 'cruising' | 'landing';

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

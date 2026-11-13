import { configureStore } from '@reduxjs/toolkit';
import connectionReducer from './slices/connection.ts';
import planesReducer from './slices/planes.ts';
import selectionReducer from './slices/selection.ts';
import { listenerMiddleware } from './listener.ts';

export const store = configureStore({
    reducer: {
        connection: connectionReducer,
        planes: planesReducer,
        selection: selectionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

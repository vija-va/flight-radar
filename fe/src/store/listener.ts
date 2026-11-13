import { createListenerMiddleware } from '@reduxjs/toolkit';
import { appStarted } from './actions.ts';
import { Socket } from '../lib/socket.ts';
import { isServerMessage } from '../guards.ts';
import { setStatus } from './slices/connection.ts';
import { planesReceived } from './slices/planes.ts';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: appStarted,
    effect: (_, api) => {
        const basicSocket = new Socket({
            url: (import.meta.env.VITE_WS_URL ?? 'ws://localhost:4000') + '/ws/planes/basic',
            onMessage: (msg) => {
                if (isServerMessage(msg)) {
                    switch (msg.type) {
                        case 'planes':
                            api.dispatch(planesReceived(msg.data));
                            break;
                        case 'plane-details':
                            // TODO: add details
                            break;
                        case 'error':
                            // TODO: add details
                            break;
                    }
                }
            },
            onStatus: (status, attempt, reason) => {
                api.dispatch(setStatus({ status, attempt, reason: reason || null }));
            },
        });

        basicSocket.connect();
    },
});

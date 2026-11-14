import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { appStarted, retryClicked } from './actions.ts';
import { Socket } from '@/lib/socket.ts';
import { isPlaneBasic, isServerMessage } from '@/guards.ts';
import { setStatus } from '@/store/slices/connection.ts';
import { planesReceived } from '@/store/slices/planes.ts';
import {
    detailsFailed,
    detailsReceived,
    detailsSocketChanged,
    planeSelected,
    selectionCleared,
} from '@/store/slices/selection.ts';
import type { AppDispatch, RootState } from '@/store/store.ts';

let basicSocket: Socket | null = null;
let detailedSocket: Socket | null = null;

const url = import.meta.env.VITE_WS_URL ?? 'ws://localhost:4000';

export const listenerMiddleware = createListenerMiddleware();
export const startAppListener = listenerMiddleware.startListening.withTypes<RootState, AppDispatch>();
startAppListener({
    actionCreator: appStarted,
    effect: (_, api) => {
        const socket = new Socket({
            url: url + '/ws/planes/basic',
            onMessage: (msg) => {
                if (isServerMessage(msg)) {
                    switch (msg.type) {
                        case 'planes':
                            const planes = msg.data.filter(isPlaneBasic);
                            api.dispatch(planesReceived(planes));
                            break;
                    }
                }
            },
            onStatus: (status, attempt, reason) => {
                api.dispatch(setStatus({ status, attempt, reason: reason || null }));
            },
        });

        const detailed = new Socket({
            url: url + '/ws/planes/details',
            onMessage: (msg) => {
                if (isServerMessage(msg)) {
                    switch (msg.type) {
                        case 'plane-details':
                            api.dispatch(detailsReceived(msg.data));
                            break;
                        case 'error':
                            api.dispatch(detailsFailed(msg.message));
                            break;
                    }
                }
            },
            onStatus: (status, _, reason) => {
                api.dispatch(detailsSocketChanged({ status, reason }));
                if (status === 'open') {
                    const id = api.getState().selection.selectedId;
                    if (id) {
                        detailed.send({ type: 'subscribe', planeId: id });
                    }
                }
            },
        });

        socket.connect();

        detailedSocket = detailed;
        basicSocket = socket;
    },
});

startAppListener({
    matcher: isAnyOf(planeSelected, selectionCleared),
    effect: (_, api) => {
        if (!detailedSocket) {
            return;
        }
        const id = api.getState().selection.selectedId;
        if (id) {
            detailedSocket.restart();
        } else {
            detailedSocket.disconnect();
        }
    },
});

startAppListener({
    actionCreator: retryClicked,
    effect: () => {
        if (!basicSocket) {
            return;
        }
        basicSocket.connect();
    },
});

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DetailsStatus, PlaneDetailed, SocketStatus } from '@/types.ts';

interface SelectionState {
    selectedId: PlaneDetailed['id'] | null;
    details: PlaneDetailed | null;
    detailsStatus: DetailsStatus;
    reason: string | null;
}

const initialState: SelectionState = {
    selectedId: null,
    details: null,
    detailsStatus: 'idle',
    reason: null,
};

const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        planeSelected(state, action: PayloadAction<string>) {
            if (state.selectedId === action.payload) {
                return initialState;
            }
            return { ...initialState, selectedId: action.payload, detailsStatus: 'loading' };
        },
        selectionCleared() {
            return initialState;
        },
        detailsReceived(state, action: PayloadAction<PlaneDetailed>) {
            if (action.payload.id === state.selectedId) {
                return { ...state, reason: null, details: action.payload, detailsStatus: 'live' };
            }
        },
        detailsFailed(state, action: PayloadAction<string>) {
            return { ...state, reason: action.payload, detailsStatus: 'error' };
        },
        detailsSocketChanged(state, action: PayloadAction<{ status: SocketStatus; reason?: string }>) {
            if (state.selectedId === null || state.detailsStatus === 'error') return;

            const { status, reason } = action.payload;
            if (status === 'reconnecting') {
                state.detailsStatus = 'loading';
            }
            if (status === 'closed') {
                state.detailsStatus = 'error';
                state.reason = reason || 'Connection lost';
            }
        },
    },
});

export const { planeSelected, selectionCleared, detailsReceived, detailsFailed, detailsSocketChanged } =
    selectionSlice.actions;

export default selectionSlice.reducer;

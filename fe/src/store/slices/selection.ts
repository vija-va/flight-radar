import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DetailsStatus, PlaneDetailed } from '@/types.ts';

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
            state.selectedId = action.payload;
            state.details = null;
            state.detailsStatus = 'loading';
            state.reason = null;
        },
        selectionCleared(state) {
            state.selectedId = null;
            state.details = null;
            state.detailsStatus = 'idle';
            state.reason = null;
        },
        detailsReceived(state, action: PayloadAction<PlaneDetailed>) {
            if (action.payload.id === state.selectedId) {
                state.details = action.payload;
                state.detailsStatus = 'live';
                state.reason = null;
            }
        },
        detailsFailed(state, action: PayloadAction<string>) {
            state.details = null;
            state.detailsStatus = 'error';
            state.reason = action.payload;
        },
    },
});

export const { planeSelected, selectionCleared, detailsReceived, detailsFailed } = selectionSlice.actions;

export default selectionSlice.reducer;

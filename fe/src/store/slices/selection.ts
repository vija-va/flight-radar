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
    },
});

export const { planeSelected, selectionCleared, detailsReceived, detailsFailed } = selectionSlice.actions;

export default selectionSlice.reducer;

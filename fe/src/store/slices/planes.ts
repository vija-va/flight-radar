import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PlaneBasic } from '@/types.ts';
import type { RootState } from '../store.ts';

const planesAdapter = createEntityAdapter<PlaneBasic>();

const planesSlice = createSlice({
    name: 'planes',
    initialState: planesAdapter.getInitialState,
    reducers: {
        planesReceived(state, action: PayloadAction<PlaneBasic[]>) {
            planesAdapter.setAll(state, action.payload);
        },
    },
});

export const { planesReceived } = planesSlice.actions;
export const planesSelectors = planesAdapter.getSelectors<RootState>((state) => state.planes);
export default planesSlice.reducer;

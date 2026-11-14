import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PlaneBasic, PlanesOnMap } from '@/types.ts';
import type { RootState } from '../store.ts';
import { getBearing } from '@/lib/utils.ts';

const planesAdapter = createEntityAdapter<PlanesOnMap>();

const planesSlice = createSlice({
    name: 'planes',
    initialState: planesAdapter.getInitialState,
    reducers: {
        planesReceived(state, action: PayloadAction<PlaneBasic[]>) {
            const planes = action.payload.map((plane) => {
                const prev = state.entities[plane.id];
                return { ...plane, bearing: getBearing(prev, plane) };
            });
            planesAdapter.setAll(state, planes);
        },
    },
});

export const { planesReceived } = planesSlice.actions;
export const planesSelectors = planesAdapter.getSelectors<RootState>((state) => state.planes);
export default planesSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SocketStatus } from '@/types.ts';

interface ConnectionState {
    status: SocketStatus;
    attempt: number;
    reason?: string;
}

const initialState: ConnectionState = {
    status: 'connecting',
    attempt: 0,
};

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<ConnectionState>) {
            state.status = action.payload.status;
            state.attempt = action.payload.attempt;
            state.reason = action.payload.reason;
        },
    },
});

export const { setStatus } = connectionSlice.actions;

export default connectionSlice.reducer;

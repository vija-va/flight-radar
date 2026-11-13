import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SocketStatus } from '@/types.ts';

interface ConnectionState {
    status: SocketStatus;
    attempt: number;
    reason: string | null;
}

const initialState: ConnectionState = {
    status: 'connecting',
    attempt: 0,
    reason: null,
};

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        setStatus(_, action: PayloadAction<ConnectionState>) {
            return action.payload;
        },
    },
});

export const { setStatus } = connectionSlice.actions;

export default connectionSlice.reducer;

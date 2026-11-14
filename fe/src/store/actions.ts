import { createAction } from '@reduxjs/toolkit';

export const appStarted = createAction('app/started');
export const retryClicked = createAction('connection/retryClicked');

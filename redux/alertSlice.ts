import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import Alert from '../types/Alert';

const initialState: Alert = {
  display: false,
  status: '',
  msg: '',
  timeout: 0,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Alert>) => {
      state.display = action.payload.display;
      state.status = action.payload.status;
      state.msg = action.payload.msg;
      state.timeout = action.payload.timeout;
    },
    clearAlert: (state) => {
      state.display = initialState.display;
      state.status = initialState.status;
      state.msg = initialState.msg;
      state.timeout = initialState.timeout;
    },
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;
export const alertStatus = (state: RootState) => state;
export default alertSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';

// Reducer
import alertSlice from './alertSlice';
import editInvoiceSlice from './editInvoice.slice';

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    editInvoice: editInvoiceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

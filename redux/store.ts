import { configureStore } from '@reduxjs/toolkit';
// Reducer
import alertSlice from './alertSlice';
import editInvoiceSlice from './editInvoice.slice';
import propertiesSlice from './properties.slice';
import categoriesSlice from './categories.slice';
import selectedYearSlice from './selectedYear.slice';

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    editInvoice: editInvoiceSlice,
    properties: propertiesSlice,
    categories: categoriesSlice,
    selectedYear: selectedYearSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

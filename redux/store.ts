import { configureStore } from '@reduxjs/toolkit';
// Reducer
import alertSlice from './alertSlice';
import offCanvasSlice from './offCanvasHandler.slice';
import propertiesSlice from './properties.slice';
import categoriesSlice from './categories.slice';
import selectedYearSlice from './selectedYear.slice';

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    offCanvas: offCanvasSlice,
    properties: propertiesSlice,
    categories: categoriesSlice,
    selectedYear: selectedYearSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

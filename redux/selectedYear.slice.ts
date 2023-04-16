import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: { value: { years: string[]; selectedYear: string } } = {
  value: {
    years: ['2020', '2021', '2022', '2023', '2024'],
    selectedYear: '2023',
  },
};

export const selectedYearSlice = createSlice({
  name: 'selectedYearSlice',
  initialState,
  reducers: {
    update_year: (state, action: PayloadAction<string>) => {
      state.value.selectedYear = action.payload;
    },
  },
});

export const { update_year } = selectedYearSlice.actions;

export default selectedYearSlice.reducer;

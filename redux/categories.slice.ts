import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../types/Property';
import { Categories } from '../constants/Categories';

const initialState: { value: Category[] } = {
  value: [
    Categories.PRAXIS,
    Categories.GENERAL,
    Categories.CARL,
    Categories.SIDE_COSTS,
    Categories.RENOVATION,
    Categories.COSTS,
    Categories.EXPENSES,
  ],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;

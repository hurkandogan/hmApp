import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showForm: false,
  isEdited: false,
  expense: {
    date: '',
    firm: '',
    description: '',
    amount: '',
    link: '',
    isPaid: false,
    categoryId: '',
    objectId: '',
    userId: '',
  },
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    editSelectedExpense: (state, action) => {
      state.showForm = true;
      state.expense = action.payload;
    },
    clearSelectedExpense: (state) => {
      state.showForm = false;
      state.expense = initialState.expense;
    },
    expenseIsEdited: (state) => {
      state.isEdited = true;
    },
    expenseEditIsDone: (state) => {
      state.isEdited = false;
    },
    stateChangeHandler: (state, action) => {
      const { name, value } = action.payload;
      state.expense[name] = value;
    },
  },
});

export const {
  editSelectedExpense,
  clearSelectedExpense,
  expenseIsEdited,
  expenseEditIsDone,
  stateChangeHandler,
} = alertSlice.actions;
export const alertStatus = (state) => state;
export default alertSlice.reducer;

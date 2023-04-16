import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Expense from '../types/Expense';

const initialState: {
  value: {
    showForm: boolean;
    isEdited: boolean;
    expense: Expense;
  };
} = {
  value: {
    showForm: false,
    isEdited: false,
    expense: {
      id: '',
      date: '',
      firm: '',
      description: '',
      amount: '',
      link: '',
      isPaid: false,
      category: '',
      property: '',
      user: '',
    },
  },
};

export const editExpenseSlice = createSlice({
  name: 'editExpense',
  initialState,
  reducers: {
    editSelectedExpense: (state, action: PayloadAction<Expense>) => {
      state.value.showForm = true;
      state.value.expense = action.payload;
    },
    clearSelectedExpense: (state) => {
      state.value.showForm = false;
      state.value.expense = initialState.value.expense;
    },
    expenseIsEdited: (state) => {
      state.value.isEdited = true;
    },
    expenseEditIsDone: (state) => {
      state.value.isEdited = false;
    },
    stateChangeHandler: (
      state,
      action: PayloadAction<{ name: string; value: string | boolean }>
    ) => {
      const { name, value } = action.payload;
      state.value.expense[name] = value;
    },
  },
});

export const {
  editSelectedExpense,
  clearSelectedExpense,
  expenseIsEdited,
  expenseEditIsDone,
  stateChangeHandler,
} = editExpenseSlice.actions;
export default editExpenseSlice.reducer;

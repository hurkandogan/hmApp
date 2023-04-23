import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: {
  value: {
    showForm: boolean;
    formType: string;
  };
} = {
  value: {
    showForm: false,
    formType: '',
  },
};

export const offCanvasSlice = createSlice({
  name: 'editExpense',
  initialState,
  reducers: {
    setFormType: (state, action: PayloadAction<string>) => {
      const form = action.payload;
      if (form === '') {
        state.value.showForm = false;
        state.value.formType = form;
      } else {
        state.value.showForm = true;
        state.value.formType = form;
      }
    },
  },
});

export const { setFormType } = offCanvasSlice.actions;
export default offCanvasSlice.reducer;

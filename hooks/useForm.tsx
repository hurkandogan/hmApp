import { ChangeEvent, useState } from 'react';
// Redux
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { showAlert } from '../redux/alertSlice';
import { setFormType } from '../redux/offCanvasHandler.slice';
// Components
import Expense from '../types/Expense';
import { Insurance } from '../types/Insurance';
import { SelectChangeEvent } from '@mui/material';
// Database
import { getDatabase, ref, push, set, update } from 'firebase/database';

interface FormData {
  new_expense: Expense;
  edit_expense: Expense;
  new_insurance: Insurance;
  edit_insurance: Insurance;
}

const INITIAL_STATE: FormData = {
  new_expense: {
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
  edit_expense: {
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
  new_insurance: {
    contract_end_date: '',
    contract_renewal: '',
    contract_start_date: '',
    description: '',
    insurance_name: '',
    insurance_number: '',
    insurance_property: '',
    insurance_paper_link: '',
    insurance_vendor: '',
    monthly_amount: '',
    payment_type: '',
    yearly_amount: '',
    user: '',
  },
  edit_insurance: {
    id: '',
    contract_end_date: '',
    contract_renewal: '',
    contract_start_date: '',
    description: '',
    insurance_name: '',
    insurance_number: '',
    insurance_property: '',
    insurance_paper_link: '',
    insurance_vendor: '',
    monthly_amount: '',
    payment_type: '',
    yearly_amount: '',
    user: '',
  },
};

export const useForm = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const formType = useAppSelector((state) => state.offCanvas.value.formType);

  const setEditExpenseData = (e: Expense) => {
    dispatch(setFormType('edit_expense'));
    INITIAL_STATE.edit_expense = e;
  };
  const setEditInsuranceData = (i: Insurance) => {
    INITIAL_STATE.edit_insurance = i;
    dispatch(setFormType('edit_insurance'));
  };
  const [formData, setFormData] = useState<Expense | Insurance>(
    INITIAL_STATE[formType as keyof typeof INITIAL_STATE]
  );

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (formData) {
      if (e.target.type === 'checkbox') {
        setFormData({
          ...formData,
          [e.target.name]: e.target.checked,
        });
      } else if (e.target.name === 'amount') {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value.replace(/,/g, '.'),
        });
      } else {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  const selectBoxChangeHandler = (e: SelectChangeEvent<string>): void => {
    formData && setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearForm = (): void => {
    setFormData(INITIAL_STATE[formType as keyof typeof INITIAL_STATE]);
    dispatch(setFormType(''));
  };

  const handleSubmit = (): void => {
    const db = getDatabase();
    setLoading(true);

    switch (formType) {
      case 'new_expense':
        {
          const postRef = ref(db, 'expenses');
          const pushedRef = push(postRef);
          set(pushedRef, formData)
            .then(() =>
              dispatch(
                showAlert({
                  display: true,
                  status: 'success',
                  msg: 'Invoice is successfully saved!',
                })
              )
            )
            .catch((err) =>
              showAlert({
                display: true,
                status: 'error',
                msg: 'An error occured on saving: ' + err,
              })
            );
          clearForm();
        }
        break;
      case 'edit_expense':
        {
          const db = getDatabase();
          const updates = {
            ['/expenses/' + (formData as Expense).id]: formData,
          };
          update(ref(db), updates);
          clearForm();
        }
        break;
      case 'new_insurance':
        {
          const postRef = ref(db, 'insurances');
          const pushedRef = push(postRef);
          set(pushedRef, formData)
            .then(() =>
              dispatch(
                showAlert({
                  display: true,
                  status: 'success',
                  msg: 'Insurance is successfully saved!',
                })
              )
            )
            .catch((err) =>
              showAlert({
                display: true,
                status: 'error',
                msg: 'An error occured on saving: ' + err,
              })
            );
          clearForm();
        }
        break;
      case 'edit_insurance':
        {
          const db = getDatabase();
          const updates = {
            ['/insurances/' + (formData as Insurance).id]: formData,
          };
          update(ref(db), updates);
          clearForm();
        }
        break;
    }

    setLoading(false);
  };

  const formValidation = (data: Expense | Insurance): string[] => {
    const errors: string[] = [];

    // if (data.documentId === '') {
    //   errors.push('No upload file');
    // }

    // if (document.title.de === '') {
    //   errors.push('Title (DE) missing');
    // }

    // if (document.description.de === '') {
    //   errors.push('Description (DE) missing');
    // }

    // if (document.documentCategory === '') {
    //   errors.push('Must assign category');
    // }

    // if (document.uploadDate === '') {
    //   errors.push('Must set upload date');
    // }

    return errors;
  };

  return {
    formData,
    setFormData,
    inputChangeHandler,
    selectBoxChangeHandler,
    clearForm,
    handleSubmit,
    setEditExpenseData,
    setEditInsuranceData,
    loading,
    setLoading,
    formValidation,
  };
};

export default useForm;

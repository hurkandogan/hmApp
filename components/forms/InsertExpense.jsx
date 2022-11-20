import { useState, useEffect } from 'react';
import { useAppContext } from '../../context';
import styles from '../../styles/modules/Form.module.sass';
import globalStyles from '../../styles/Global.module.sass';
import { validateExpenseFields } from '../../validation/InsertExpense';

// Redux
import { useAppDispatch } from '../../redux/hooks';
import { showAlert, clearAlert } from '../../redux/alertSlice';

// Services
import saveExpense from '../../service/expenses/saveExpense';

// Components
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button';

const INITIAL_STATE = {
  date: '',
  firm: '',
  description: '',
  amount: '',
  link: '',
  isPaid: false,
  categoryId: '-',
  objectId: '-',
  userId: '',
};

const InsertExpense = () => {
  const { objects, categories } = useAppContext();
  const [expense, setExpense] = useState(INITIAL_STATE);
  const [requiredFields, setRequiredFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const changeHandler = (e) => {
    const { type, checked, name, value } = e.target;
    if (type === 'checkbox') {
      setExpense({ ...expense, [name]: checked ? 1 : 0 });
    } else {
      setExpense({ ...expense, [name]: value });
    }
  };

  const amountFieldChangeHandler = (e) => {
    const { name, value } = e.target;
    const dottedValue = value.replace(/,/g, '.');
    setExpense({
      ...expense,
      [name]: dottedValue,
    });
  };

  const formSubmit = () => {
    const reqFields = validateExpenseFields(expense);
    setRequiredFields(reqFields);
    if (reqFields.length <= 0) {
      setLoading(true);
      saveExpense(expense)
        .then((res) => {
          if (res.status === 200) {
            dispatch(
              showAlert({
                display: true,
                status: 'success',
                msg: 'Invoice is successfully saved!',
              })
            );
            setExpense(INITIAL_STATE);
          }
        })
        .catch((err) => {
          showAlert({
            display: true,
            status: 'error',
            msg: 'An error occured on saving',
          });
        });
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Insert Expense</h1>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="date"
            id="expenseDate"
            name="date"
            value={expense.date}
            onChange={changeHandler}
            autoComplete="off"
            required={true}
            error={requiredFields.indexOf('date') > -1}
            size="small"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="expenseVendor"
            name="firm"
            value={expense.firm}
            onChange={changeHandler}
            label="Vendor"
            required={true}
            error={requiredFields.indexOf('firm') > -1}
            size="small"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="expenseAmount"
            name="amount"
            value={expense.amount}
            onChange={amountFieldChangeHandler}
            placeholder="Amount"
            label="Expense Amount"
            autoComplete="off"
            required={true}
            error={requiredFields.indexOf('amount') > -1}
            size="small"
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="expenseDesc"
            name="description"
            value={expense.description}
            onChange={changeHandler}
            placeholder="Description"
            label="Description"
            autoComplete="off"
            size="small"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="invoiceLink"
            name="link"
            value={expense.link}
            onChange={changeHandler}
            placeholder="Link"
            label="Invoice Link"
            autoComplete="off"
            size="small"
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <FormControl>
            <InputLabel id="object">Property</InputLabel>
            <Select
              label="Property"
              placeholder="Object"
              id="object"
              name="objectId"
              value={expense.objectId}
              onChange={changeHandler}
              size="small"
              required={true}
              error={requiredFields.indexOf('objectId') > -1}
            >
              <MenuItem value={'-'} disabled={true}>
                Choose a property
              </MenuItem>
              {objects.map((object) => {
                return (
                  <MenuItem key={object.id} value={object.id}>
                    {object.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.formGroupContainer_inner}>
          <FormControl>
            <InputLabel id="category">Category</InputLabel>
            <Select
              label="Category"
              id="category"
              name="categoryId"
              value={expense.categoryId}
              onChange={changeHandler}
              size="small"
              required={true}
              error={requiredFields.indexOf('categoryId') > -1}
            >
              <MenuItem value={'-'} disabled={true}>
                Choose a category
              </MenuItem>
              {categories.map((cat) => {
                return (
                  <MenuItem key={cat.name} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.formGroupContainer_inner}>
          <FormControlLabel
            control={
              <Switch
                abel="Payment Status"
                id="isPaid"
                name="isPaid"
                checked={expense.isPaid}
                onChange={changeHandler}
              />
            }
            label="Paid"
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}></div>
      <div className={styles.formGroupContainer}>
        <Button
          variant="contained"
          onClick={formSubmit}
          disabled={loading}
          type={'primary'}
        >
          {`Submit ${
            loading ? (
              <div className={globalStyles.spinner} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              ''
            )
          }`}
        </Button>
      </div>
    </div>
  );
};

export default InsertExpense;

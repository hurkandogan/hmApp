import { useState, ChangeEvent } from 'react';
import styles from '../../styles/modules/Form.module.sass';
import globalStyles from '../../styles/Global.module.sass';
import { validateExpenseFields } from '../../validation/InsertExpense';
// Firebase
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, push } from 'firebase/database';
// Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { showAlert } from '../../redux/alertSlice';
// Types
import Expense from '../../types/Expense';
import { Property } from '../../types/Property';
// Components
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button';

const InsertExpense = () => {
  const db = getDatabase();
  const auth = getAuth();
  const INITIAL_STATE: Expense = {
    date: '',
    firm: '',
    description: '',
    amount: '',
    link: '',
    isPaid: false,
    category: '-',
    property: '-',
    user: auth.currentUser?.displayName as string,
  };
  const [expense, setExpense] = useState<Expense>(INITIAL_STATE);
  const [selectedProperty, setSelectedProperty] = useState<Property>();
  const [requiredFields, setRequiredFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const properties = useAppSelector((state) => state.properties.value.all);
  const dispatch = useAppDispatch();

  console.log(properties);

  const options: Property[] = [];
  properties.forEach((property) => {
    if (property.sub_property) {
      property.sub_property.forEach((subProperty: Property) => {
        options.push(subProperty);
      });
    } else {
      options.push(property);
    }
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { type, checked, name, value } = e.target;
    if (type === 'checkbox') {
      setExpense({ ...expense, [name]: checked ? true : false });
    } else {
      setExpense({ ...expense, [name]: value });
    }
  };

  const selectBoxChangeHandler = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name === 'property') {
      options.forEach((el) => {
        if (el.id === value) {
          setSelectedProperty(el);
        }
      });
    }
    setExpense({ ...expense, [name]: value });
  };

  const amountFieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
      const postRef = ref(db, 'expenses');
      const pushedRef = push(postRef);
      set(pushedRef, expense)
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
            msg: 'An error occured on saving' + err,
          })
        );
      setLoading(false);
      setExpense(INITIAL_STATE);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Expense</h1>
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
              name="property"
              value={expense.property}
              onChange={selectBoxChangeHandler}
              size="small"
              required={true}
              error={requiredFields.indexOf('objectId') > -1}
            >
              <MenuItem value={'-'} disabled={true}>
                Choose a property
              </MenuItem>
              {options.map((property) => {
                return (
                  <MenuItem key={property.id} value={property.id}>
                    {property.name}
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
              name="category"
              value={expense.category}
              onChange={selectBoxChangeHandler}
              size="small"
              required={true}
              error={requiredFields.indexOf('categoryId') > -1}
              disabled={
                typeof selectedProperty?.available_categories === 'undefined'
              }
            >
              <MenuItem value={'-'} disabled={true}>
                Choose a category
              </MenuItem>
              {selectedProperty?.available_categories &&
                selectedProperty?.available_categories.map((cat) => {
                  return (
                    <MenuItem key={cat.val} value={cat.val}>
                      {cat.label}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="user"
            name="user"
            value={auth.currentUser?.displayName}
            disabled={true}
            placeholder="Username"
            label="User"
            autoComplete="off"
            size="small"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <FormControlLabel
            control={
              <Switch
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
          style={{ background: '#1976d2' }}
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

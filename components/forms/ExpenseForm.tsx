import { useState } from 'react';
import styles from '../../styles/modules/Form.module.sass';
import globalStyles from '../../styles/Global.module.sass';
// Firebase
import { getAuth } from 'firebase/auth';
// Redux
import { useAppSelector } from '../../redux/hooks';
// Types
import Expense from '../../types/Expense';
// Components
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import useForm from '../../hooks/useForm';

const ExpenseForm = () => {
  const auth = getAuth();

  const {
    formData,
    inputChangeHandler,
    selectBoxChangeHandler,
    handleSubmit,
    loading,
  } = useForm();

  const [requiredFields] = useState<string[]>([]);
  const properties = useAppSelector((state) => state.properties.value.all);
  const categories = useAppSelector((state) => state.categories.value);

  return (
    <div className={styles.container}>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="date"
            id="expenseDate"
            name="date"
            value={(formData as Expense)?.date}
            onChange={inputChangeHandler}
            autoComplete="off"
            required={true}
            error={requiredFields.indexOf('date') > -1}
            size="medium"
            disabled={loading}
            variant="filled"
            label="Date"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="expenseVendor"
            name="firm"
            value={(formData as Expense)?.firm}
            onChange={inputChangeHandler}
            label="Vendor"
            required={true}
            error={requiredFields.indexOf('firm') > -1}
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="expenseAmount"
            name="amount"
            value={(formData as Expense)?.amount}
            onChange={inputChangeHandler}
            placeholder="Amount"
            label="Expense Amount"
            autoComplete="off"
            required={true}
            error={requiredFields.indexOf('amount') > -1}
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="expenseDesc"
            name="description"
            value={(formData as Expense)?.description}
            onChange={inputChangeHandler}
            placeholder="Description"
            label="Description"
            autoComplete="off"
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="invoiceLink"
            name="link"
            value={(formData as Expense)?.link}
            onChange={inputChangeHandler}
            placeholder="Link"
            label="Invoice Link"
            autoComplete="off"
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <FormControl>
            <InputLabel id="object" variant="filled">
              Property
            </InputLabel>
            <Select
              label="Property"
              placeholder="Object"
              id="object"
              name="property"
              value={(formData as Expense)?.property}
              onChange={selectBoxChangeHandler}
              size="medium"
              required={true}
              error={requiredFields.indexOf('objectId') > -1}
              disabled={loading}
              variant="filled"
            >
              <MenuItem value={'-'} disabled={true}>
                Choose a property
              </MenuItem>
              {properties.map((property) => {
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
            <InputLabel id="category" variant="filled">
              Category
            </InputLabel>
            <Select
              label="Category"
              id="category"
              name="category"
              value={(formData as Expense)?.category}
              onChange={selectBoxChangeHandler}
              size="medium"
              required={true}
              variant="filled"
              error={requiredFields.indexOf('categoryId') > -1}
            >
              <MenuItem value={'-'} disabled={true}>
                Choose a category
              </MenuItem>
              {categories.map((cat) => {
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
            autoComplete="off"
            size="small"
            variant="filled"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <FormControlLabel
            control={
              <Switch
                id="isPaid"
                name="isPaid"
                checked={(formData as Expense)?.isPaid}
                onChange={inputChangeHandler}
                disabled={loading}
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
          onClick={handleSubmit}
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

export default ExpenseForm;

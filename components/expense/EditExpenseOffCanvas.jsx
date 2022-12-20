import { useState } from 'react';
import moment from 'moment';
import { useAppContext } from '../../context';
import editExpense from '../../service/expenses/editExpense';
import styles from '../../styles/expense/EditExpenseOffCanvas.module.sass';
import globalStyles from '../../styles/Global.module.sass';
import { close_icon } from '../../assets/icons';
import { numberDivider } from '../../assets/misc/functions';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button';

// Redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  editSelectedExpense,
  clearSelectedExpense,
  expenseIsEdited,
  stateChangeHandler,
} from '../../redux/editInvoice.slice';

const EditExpenseOffCanvas = (props) => {
  const { objects, categories } = useAppContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const showForm = useAppSelector((state) => state.editInvoice.showForm);
  const expense = useAppSelector((state) => state.editInvoice.expense);

  const changeHandler = (e) => {
    const { type, checked, name, value } = e.target;
    if (type === 'checkbox') {
      dispatch(stateChangeHandler({ name: name, checked: checked ? 1 : 0 }));
    } else {
      dispatch(stateChangeHandler({ name: name, value: value }));
    }
  };

  const amountFieldChangeHandler = (e) => {
    const { name, value } = e.target;
    let dottedValue = value.replace(/,/g, '.');
    dispatch(stateChangeHandler({ name: name, value: dottedValue }));
  };

  const formSubmit = () => {
    setLoading(true);
    expense.date = moment(expense.date).format('YYYY-MM-DD');
    editExpense(expense)
      .then((res) => {
        if (res.status === 200) {
          dispatch(clearSelectedExpense());
          dispatch(expenseIsEdited());
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  return (
    <div className={styles.page_wrapper + ' ' + (showForm && styles.show)}>
      <div
        className={styles.empty_field_close_div}
        onClick={() => dispatch(clearSelectedExpense())}
      ></div>
      <div className={styles.container + ' ' + (showForm && styles.open)}>
        <div className={styles.container_header}>
          <h1>Edit Invoice</h1>
          <p
            className={styles.close_icon}
            onClick={() => dispatch(clearSelectedExpense())}
          >
            {close_icon}
          </p>
        </div>
        <div className={styles.container_body}>
          <div className={styles.formGroupContainer}>
            <div className={styles.formGroupContainer_inner}>
              <TextField
                className={styles.input}
                variant={'outlined'}
                type="date"
                id="expenseDate"
                name="date"
                value={expense?.date}
                onChange={changeHandler}
                autoComplete="off"
                size={'small'}
              />
            </div>
            <div className={styles.formGroupContainer_inner}>
              <TextField
                className={styles.input}
                type="text"
                id="expenseVendor"
                name="firm"
                value={expense?.firm}
                onChange={changeHandler}
                autoComplete="off"
                size={'small'}
                placeholder={'Firm'}
              />
            </div>
            <div className={styles.formGroupContainer_inner}>
              <TextField
                className={styles.input}
                type="text"
                id="expenseDesc"
                name="description"
                value={expense?.description}
                onChange={changeHandler}
                autoComplete="off"
                size={'small'}
                placeholder={'Description'}
              />
            </div>
          </div>
          <div className={styles.formGroupContainer}>
            <div className={styles.formGroupContainer_inner}>
              <FormControl>
                <Select
                  className={styles.input}
                  id="object"
                  name="objectId"
                  value={expense?.objectId}
                  onChange={changeHandler}
                  size={'small'}
                  defaultValue={expense?.objectId}
                >
                  {objects.map((obj) => (
                    <MenuItem key={obj.id} value={obj.id}>
                      {obj.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles.formGroupContainer_inner}>
              <FormControl>
                <Select
                  id="category"
                  name="categoryId"
                  value={expense?.categoryId}
                  onChange={changeHandler}
                  disabled={categories.length < 1 && true}
                  className={styles.input}
                  size={'small'}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={styles.formGroupContainer}>
            <div className={styles.formGroupContainer_inner}>
              <TextField
                type="text"
                id="expenseAmount"
                name="amount"
                value={expense?.amount}
                onChange={amountFieldChangeHandler}
                className={styles.input}
                size={'small'}
              />
            </div>
            <div className={styles.formGroupContainer_inner}>
              <TextField
                type="text"
                id="documentLink"
                name="documentLink"
                value={expense?.documentLink}
                onChange={changeHandler}
                className={styles.input}
                size={'small'}
              />
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
          <div className={styles.formGroupContainer}>
            <div className={styles.formGroupContainer_inner}>
              <Button
                variant={'contained'}
                onClick={formSubmit}
                disabled={loading}
              >
                {loading && (
                  <div className={globalStyles.spinner} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseOffCanvas;

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/expense/EditExpenseOffCanvas.module.sass';
import globalStyles from '../../styles/Global.module.sass';
import { close_icon } from '../../assets/icons';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
// Redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  clearSelectedExpense,
  stateChangeHandler,
} from '../../redux/editInvoice.slice';
// Types
import { Property } from '../../types/Property';
// Services
import { getDatabase, ref, update } from 'firebase/database';

const EditExpenseOffCanvas: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property>();
  const showForm = useAppSelector((state) => state.editInvoice.value.showForm);
  const expense = useAppSelector((state) => state.editInvoice.value.expense);
  const properties = useAppSelector((state) => state.properties.value.grouped);
  const categories = useAppSelector((state) => state.categories.value);

  useEffect(() => {
    setSelectedProperty(
      properties.filter((el) => el.id === router.query.route)[0]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expense]);

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
      dispatch(
        stateChangeHandler({ name: name, value: checked ? true : false })
      );
    } else {
      console.log(name, value);
      dispatch(stateChangeHandler({ name: name, value: value }));
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
    dispatch(stateChangeHandler({ name: name, value: value }));
  };

  const amountFieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let dottedValue = value.replace(/,/g, '.');
    dispatch(stateChangeHandler({ name: name, value: dottedValue }));
  };

  const formSubmit = () => {
    setLoading(true);
    const db = getDatabase();
    const updates = { ['/expenses/' + expense.id]: expense };
    update(ref(db), updates);
    dispatch(clearSelectedExpense());
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
                  name="property"
                  value={expense?.property}
                  onChange={selectBoxChangeHandler}
                  size={'small'}
                  defaultValue={expense?.property}
                >
                  {options.map((obj) => (
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
                  name="category"
                  value={expense?.category}
                  onChange={selectBoxChangeHandler}
                  disabled={
                    selectedProperty?.available_categories &&
                    selectedProperty?.available_categories.length < 1
                  }
                  className={styles.input}
                  size={'small'}
                >
                  <MenuItem disabled={true}>Select a category</MenuItem>
                  {categories &&
                    categories.map((cat) => {
                      return (
                        <MenuItem key={cat.val} value={cat.val}>
                          {cat.label}
                        </MenuItem>
                      );
                    })}
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
                id="link"
                name="link"
                value={expense.link}
                onChange={changeHandler}
                className={styles.input}
                size={'small'}
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

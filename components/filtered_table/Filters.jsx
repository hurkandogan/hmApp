import styles from '../../styles/filtered_table/filters.module.sass';

// Context API
import { useAppContext } from '../../context/index';

// Components
import TextField from '../atoms/TextField';
import Checkbox from '../atoms/Checkbox';
import SelectBox from '../atoms/SelectBox';
import Button from '../atoms/Button';
import { useState } from 'react';

const INITIAL_STATE = {
  date_from: '',
  date_to: '',
  vendor: '',
  min_amount: '',
  max_amount: '',
  payment: 0,
  objectId: '',
  categoryId: '',
};

const Filters = (props) => {
  const { objects, categories } = useAppContext();
  const [filterData, setFilterData] = useState(INITIAL_STATE);
  const changeHandler = (e) => {
    const { type, checked, name, value } = e.target;
    if (type === 'checkbox') {
      setFilterData({ ...filterData, [name]: checked ? 1 : 0 });
    } else {
      setFilterData({ ...filterData, [name]: value });
    }
  };
  const amountFieldChangeHandler = (e) => {
    const { name, value } = e.target;
    const dottedValue = value.replace(/,/g, '.');
    setFilterData({
      ...filterData,
      [name]: dottedValue,
    });
  };
  const selectBoxChangeHandler = (val, name) => {
    setFilterData({
      ...filterData,
      [name]: val,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <div className={styles.field_wrapper}>
            <SelectBox
              label="Object"
              type="text"
              id="objectId"
              name="objectId"
              value={filterData.objectId}
              options={objects}
              disabled={objects.length < 1 && true}
              onChange={selectBoxChangeHandler}
            />
          </div>
          <div className={styles.field_wrapper}>
            <SelectBox
              label="Category"
              type="text"
              id="categoryId"
              name="categoryId"
              value={filterData.categoryId}
              options={categories}
              disabled={categories.length < 1 && true}
              onChange={selectBoxChangeHandler}
            />
          </div>
        </div>
        <div className={styles.form_container}>
          <div className={styles.field_wrapper}>
            <TextField
              label="From:"
              type="date"
              name="date_from"
              id="date_from"
              value={filterData.date_from}
              onChange={changeHandler}
            />
          </div>
          <div className={styles.field_wrapper}>
            <TextField
              label="To:"
              type="date"
              name="date_to"
              id="date_to"
              value={filterData.date_to}
              onChange={changeHandler}
            />
          </div>
          <div className={styles.field_wrapper}>
            <TextField
              label="Vendor:"
              type="text"
              placeholder="Vendor Name"
              name="vendor"
              id="vendor"
              value={filterData.vendor}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className={styles.form_container}>
          <div className={styles.field_wrapper}>
            <TextField
              label="Min. Amount"
              type="text"
              id="min_amount"
              name="min_amount"
              value={filterData.min_amount}
              onChange={amountFieldChangeHandler}
            />
          </div>
          <div className={styles.field_wrapper}>
            <TextField
              label="Max. Amount"
              type="text"
              id="max_amount"
              name="max_amount"
              value={filterData.max_amount}
              onChange={amountFieldChangeHandler}
            />
          </div>
          <div className={styles.field_wrapper}>
            <Checkbox
              label="Payment"
              type="text"
              id="payment"
              name="payment"
              checked={filterData.payment}
              onChange={changeHandler}
            />
          </div>
          <div className={styles.field_wrapper}>
            <Button type="primary" text="Submit" onClick={props.submit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;

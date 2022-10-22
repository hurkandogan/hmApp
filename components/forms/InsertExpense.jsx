import { useState, useEffect } from 'react';
import { useAppContext } from '../../context';
import styles from '../../styles/modules/Form.module.sass';
import globalStyles from '../../styles/Global.module.sass';

// Components
import TextField from '../atoms/TextField';
import SelectBox from '../atoms/SelectBox';
import Checkbox from '../atoms/Checkbox';
import Button from '../atoms/Button';

// Services
import getCategories from '../../service/categories/getCategories';
import saveExpense from '../../service/expenses/saveExpense';

const InsertExpense = () => {
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
  const { objects } = useAppContext();

  const [expense, setExpense] = useState(INITIAL_STATE);
  const [categories, setCategories] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories()
      .then((res) => {
        const categories = res.data.data;
        let categoriesToMap = [];
        if (selectedObject && categories.length > 0) {
          categories.forEach((el) => {
            if (selectedObject.isHouse === el.isHouse) {
              categoriesToMap.push(el);
            }
          });
        }
        setCategories(categoriesToMap);
      })
      .catch((err) => console.log(err));
  }, [selectedObject]);

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

  const selectBoxChangeHandler = (val, name) => {
    const selectedObject = objects.find((object) => object.id === val);
    if (selectedObject)
      setSelectedObject({
        id: selectedObject.id,
        name: selectedObject.name,
        isHouse: selectedObject.isHouse,
      });
    setExpense({
      ...expense,
      [name]: val,
    });
  };

  const formSubmit = () => {
    setLoading(true);
    saveExpense(expense)
      .then((res) => {
        if (res.status === 200) {
          setExpense(INITIAL_STATE);
          setCategories([]);
        }
        // TODO: Add notification!
      })
      .catch((err) => console.log(err));
    // TODO: Add notification!
    setLoading(false);
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
            placeholder="Date"
            label="Date"
            autoComplete="off"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="expenseVendor"
            name="firm"
            value={expense.firm}
            onChange={changeHandler}
            placeholder="Vendor"
            label="Vendor"
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
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <SelectBox
            label="Object"
            id="object"
            name="objectId"
            value={expense.objectId}
            onChange={selectBoxChangeHandler}
            options={objects}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <SelectBox
            label="Category"
            id="category"
            name="categoryId"
            value={expense.categoryId}
            onChange={selectBoxChangeHandler}
            options={categories}
            disabled={categories.length < 1 && true}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
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
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <Checkbox
            label="Payment Status"
            id="isPaid"
            name="isPaid"
            checked={expense.isPaid}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <Button
          text={`Submit ${
            loading ? (
              <div className={globalStyles.spinner} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              ''
            )
          }`}
          onClick={formSubmit}
          disabled={loading}
          type={'primary'}
        />
      </div>
    </div>
  );
};

export default InsertExpense;

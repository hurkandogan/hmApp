import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import getObjects from '../service/objects/getObjects';
import getCategories from '../service/categories/getCategories';
import saveExpense from '../service/expenses/saveExpense';
import styles from '../styles/InsertExpense.module.sass';
import globalStyles from '../styles/Global.module.sass';

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

  const objectChangeHandler = (e) => {
    const { name, value } = e.target;
    const selectedObject = objects.find((object) => object.id === value);
    setSelectedObject({
      id: selectedObject.id,
      name: selectedObject.name,
      isHouse: selectedObject.isHouse,
    });
    setExpense({
      ...expense,
      [name]: value,
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
          <label htmlFor="expenseDate">Date</label>
          <input
            type="date"
            id="expenseDate"
            name="date"
            value={expense.date}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="expenseVendor">Vendor</label>
          <input
            type="text"
            id="expenseVendor"
            name="firm"
            value={expense.firm}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="expenseDesc">Description</label>
          <input
            type="text"
            id="expenseDesc"
            name="description"
            value={expense.description}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="object">Object</label>
          <select
            id="object"
            name="objectId"
            value={expense.objectId}
            onChange={objectChangeHandler}
          >
            <option value="-" disabled>
              Please Select an Object
            </option>
            {objects.map((obj) => {
              return (
                <option key={obj.id} value={obj.id}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="categoryId"
            value={expense.categoryId}
            onChange={changeHandler}
            disabled={categories.length < 1 && true}
          >
            <option value="-" disabled>
              Please Select a Category
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="expenseAmount">Amount</label>
          <input
            type="text"
            id="expenseAmount"
            name="amount"
            value={expense.amount}
            onChange={amountFieldChangeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="invoiceLink">Dropbox Link</label>
          <input
            type="text"
            id="invoiceLink"
            name="link"
            value={expense.link}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="isPaid">Payment Status</label>
          <input
            type="checkbox"
            id="isPaid"
            name="isPaid"
            checked={expense.isPaid}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <button
          className={globalStyles.primaryButton}
          onClick={formSubmit}
          disabled={loading}
        >
          {loading && (
            <div className={globalStyles.spinner} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          Submit
        </button>
      </div>
    </div>
  );
};

export default InsertExpense;

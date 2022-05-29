import { useState, useEffect } from 'react';
import moment from 'moment';
import { useAppContext } from '../../context';
import { editExpense } from '../../service/expenses/editExpense';
import styles from '../../styles/house/EditExpenseOffCanvas.module.sass';
import globalStyles from '../../styles/Global.module.sass';

const EditExpenseOffCanvas = (props) => {
  const { objects, categories } = useAppContext();
  const { expense, isOpen, close, editChangeHandler } = props;
  const [selectedObject, setSelectedObject] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { type, checked, name, value } = e.target;
    if (type === 'checkbox') {
      editChangeHandler(name, checked ? 1 : 0);
    } else {
      editChangeHandler(name, value);
    }
  };

  const amountFieldChangeHandler = (e) => {
    const { name, value } = e.target;
    const dottedValue = value.replace(/,/g, '.');
    editChangeHandler(name, dottedValue);
  };

  const formSubmit = () => {
    setLoading(true);
    editExpense(expense)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          close();
        }
      })
      .catch((err) => console.log(err));
    // TODO: Add notification!
    setLoading(false);
  };

  return (
    <div className={styles.page_wrapper + ' ' + (isOpen && styles.show)}>
      <div className={styles.container + ' ' + (isOpen && styles.open)}>
        <div className={styles.container_header}>
          <h1>Edit Invoice</h1>
          <p onClick={close}>Close</p>
        </div>
        <div className={styles.container_body}>
          <div className={styles.formGroupContainer}>
            <div className={styles.formGroupContainer_inner}>
              <label htmlFor="expenseDate">Date</label>
              <input
                type="text"
                id="expenseDate"
                name="date"
                value={expense?.date}
                onChange={changeHandler}
              />
            </div>
            <div className={styles.formGroupContainer_inner}>
              <label htmlFor="expenseVendor">Vendor</label>
              <input
                type="text"
                id="expenseVendor"
                name="firm"
                value={expense?.firm}
                onChange={changeHandler}
              />
            </div>
            <div className={styles.formGroupContainer_inner}>
              <label htmlFor="expenseDesc">Description</label>
              <input
                type="text"
                id="expenseDesc"
                name="description"
                value={expense?.description}
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
                value={expense?.objectId}
                onChange={changeHandler}
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
                value={expense?.categoryId}
                onChange={changeHandler}
                disabled={categories.length < 1 && true}
              >
                <option value="-" disabled>
                  Please Select a Category
                </option>
                {categories.map((cat) => {
                  if (cat.isHouse === expense.objectIsHouse)
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
                value={expense?.amount}
                onChange={amountFieldChangeHandler}
              />
            </div>
            <div className={styles.formGroupContainer_inner}>
              <label htmlFor="invoiceLink">Dropbox Link</label>
              <input
                type="text"
                id="documentLink"
                name="documentLink"
                value={expense?.documentLink}
                onChange={changeHandler}
              />
            </div>
            <div className={styles.formGroupContainer_inner}>
              <label htmlFor="isPaid">Payment Status</label>
              <input
                type="checkbox"
                id="isPaid"
                name="isPaid"
                checked={expense?.isPaid}
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
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseOffCanvas;

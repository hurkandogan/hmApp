import { useState } from 'react';
import saveCategory from '../service/categories/saveCategory';
import styles from '../styles/InsertExpense.module.sass';
import globalStyles from '../styles/Global.module.sass';

const InsertCategory = () => {
  const INITIAL_STATE = {
    name: '',
    description: '',
    isHouse: false,
  };

  const [category, setCategory] = useState(INITIAL_STATE);

  const changeHandler = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmit = () => {
    saveCategory(category)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <h1>Insert Category</h1>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="categoryName">Name</label>
          <input
            type="text"
            id="categoryName"
            name="name"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="categoryDesc">Description</label>
          <input
            type="text"
            id="categoryDesc"
            name="description"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="isHouse">Is House</label>
          <input
            type="checkbox"
            id="isHouse"
            name="isHouse"
            onClick={changeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <button className={globalStyles.primaryButton} onClick={formSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default InsertCategory;

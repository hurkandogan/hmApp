import { useState } from 'react';
import saveObject from '../../service/objects/saveObject';
import styles from '../../styles/modules/Form.module.sass';
import globalStyles from '../../styles/Global.module.sass';

const InsertObject = () => {
  const INITIAL_STATE = {
    name: '',
    adress: '',
    description: '',
    isMenu: false,
    isHouse: false,
  };

  const [object, setObject] = useState(INITIAL_STATE);

  const changeHandler = (e) => {
    setObject({
      ...object,
      [e.target.name]: e.target.value,
    });
  };

  const checkboxChangeHandler = (e) => {
    setObject({
      ...object,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
  };

  const formSubmit = () => {
    saveObject(object)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setObject(INITIAL_STATE);
  };

  return (
    <div className={styles.container}>
      <h1>Insert Object</h1>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="objectName">Name</label>
          <input
            type="text"
            id="objectName"
            name="name"
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="objectAdress">Adress</label>
          <input
            type="text"
            id="objectAdress"
            name="adress"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="objectDesc">Description</label>
          <input
            type="text"
            id="objectDesc"
            name="description"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="isMenu">Is Menu</label>
          <input
            type="checkbox"
            id="isMenu"
            name="isMenu"
            value={object.isMenu}
            onChange={checkboxChangeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="isHouse">Is House</label>
          <input
            type="checkbox"
            id="isHouse"
            name="isHouse"
            value={object.isHouse}
            onChange={checkboxChangeHandler}
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

export default InsertObject;

import { useState } from 'react';
import styles from '../../styles/house/EditExpenseOffCanvas.module.sass';

const EditExpenseOffCanvas = (props) => {
  return (
    <div className={styles.container + ' ' + (props.isOpen && styles.open)}>
      <div className={styles.container_header}>
        <h1>Edit Invoice</h1>
        <p onClick={props.close}>Close</p>
      </div>
      <div className={styles.container_body}></div>
    </div>
  );
};

export default EditExpenseOffCanvas;

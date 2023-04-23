import { FC, useEffect, useState } from 'react';
// Styles
import styles from '../styles/expense/OffCanvas.module.sass';
import { close_icon } from '../assets/icons';
// Components
import InsertExpense from './forms/ExpenseForm';
import InsertInsurance from './forms/InsertInsurance';
// Redux
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setFormType } from '../redux/offCanvasHandler.slice';

const OffCanvas: FC = () => {
  const dispatch = useAppDispatch();
  const [headline, setHeadline] = useState<string>('');
  const showForm = useAppSelector((state) => state.offCanvas.value.showForm);
  const formType = useAppSelector((state) => state.offCanvas.value.formType);

  useEffect(() => {
    switch (formType) {
      case 'new_expense':
        setHeadline('New Expense');
        break;
      case 'edit_expense':
        setHeadline('Edit Expense');
        break;
      case 'new_insurance':
        setHeadline('New Insurance');
        break;
      case 'edit_insurance':
        setHeadline('Edit Insurance');
        break;
    }
  }, [formType]);
  return (
    <div className={styles.page_wrapper + ' ' + (showForm && styles.show)}>
      <div
        className={styles.empty_field_close_div}
        onClick={() => dispatch(setFormType(''))}
      ></div>
      <div className={styles.container + ' ' + (showForm && styles.open)}>
        <div className={styles.container_header}>
          <h1>{headline}</h1>
          <p
            className={styles.close_icon}
            onClick={() => dispatch(setFormType(''))}
          >
            {close_icon}
          </p>
        </div>
        <div className={styles.container_body}>
          {formType === 'edit_expense' && <InsertExpense />}
          {formType === 'new_expense' && <InsertExpense />}
          {formType === 'new_insurance' && <InsertInsurance />}
          {formType === 'edit_insurance' && <InsertInsurance />}
        </div>
      </div>
    </div>
  );
};

export default OffCanvas;

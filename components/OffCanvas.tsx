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
import ModalBox from './ModalBox';
import Button from '@mui/material/Button';
import { getDatabase, ref, remove } from 'firebase/database';

const OffCanvas: FC = () => {
  const dispatch = useAppDispatch();
  const [headline, setHeadline] = useState<string>('');
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState<string>();
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

  const deleteExpense = (id: string | undefined) => {
    if (deleteExpenseId && deleteExpenseId !== '') {
      const db = getDatabase();
      const expRef = ref(db, `expenses/${id}`);
      remove(expRef).then(() => {
        setDeleteConfirm(false);
        setDeleteExpenseId('');
        dispatch(setFormType(''));
      });
    }
  };

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
          {formType === 'edit_expense' && (
            <InsertExpense
              deleteConfirm={deleteConfirm}
              setDeleteConfirm={setDeleteConfirm}
              setDeleteExpenseId={setDeleteExpenseId}
            />
          )}
          {formType === 'new_expense' && <InsertExpense />}
          {formType === 'new_insurance' && <InsertInsurance />}
          {formType === 'edit_insurance' && <InsertInsurance />}
        </div>
      </div>
      <ModalBox
        active={deleteConfirm}
        close={() => setDeleteConfirm(false)}
        headline="Remove Expense"
      >
        Are you sure to delete this expense?
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <Button
            variant="contained"
            onClick={() => setDeleteConfirm(false)}
            disabled={false}
            style={{ background: '#1976d2' }}
          >
            Close
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteExpense(deleteExpenseId)}
            disabled={false}
          >
            Delete
          </Button>
        </div>
      </ModalBox>
    </div>
  );
};

export default OffCanvas;

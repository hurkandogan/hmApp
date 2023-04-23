import { FC, useEffect, useState } from 'react';
import styles from '../../styles/expense/CategoryTab.module.sass';
import ExpenseTable from './ExpenseTable';
// Types
import Expense from '../../types/Expense';
import { Insurance } from '../../types/Insurance';
import InsuranceTable from './InsuranceTable';

interface Props {
  expenses?: Expense[];
  insurances?: Insurance[];
}

const CategoryTab: FC<Props> = ({ expenses, insurances }) => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let total = 0;
    if (insurances) {
      insurances.forEach((el) => {
        total += parseInt(el.yearly_amount as string);
      });
      setTotal(total);
    } else if (expenses) {
      expenses.forEach((el) => {
        total += parseInt(el.amount);
      });
      setTotal(total);
    }
  }, [expenses, insurances]);

  return (
    <div className={styles.container}>
      <div className={styles.tab_header}>
        <span>Total Amount: {total.toLocaleString()} €</span>
      </div>
      {expenses ? (
        <ExpenseTable expenses={expenses ? expenses : []} />
      ) : (
        <InsuranceTable insurances={insurances ? insurances : []} />
      )}
    </div>
  );
};

export default CategoryTab;

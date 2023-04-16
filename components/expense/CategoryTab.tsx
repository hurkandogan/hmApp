import { FC, useEffect, useState } from 'react';
import styles from '../../styles/expense/CategoryTab.module.sass';
import ExpenseTable from './ExpenseTable';
import { numberDivider } from '../../assets/misc/functions';
import Expense from '../../types/Expense';

interface Props {
  expenses: Expense[];
}

const CategoryTab: FC<Props> = ({ expenses }) => {
  const [expenseTotal, setExpenseTotal] = useState<number>(0);

  useEffect(() => {
    let total = 0;
    expenses.forEach((el) => {
      total += parseInt(el.amount);
    });
    setExpenseTotal(total);
  }, [expenses]);

  return (
    <div className={styles.container}>
      <div className={styles.tab_header}>
        <span>Total Amount: {numberDivider(expenseTotal)} €</span>
      </div>
      <ExpenseTable expenses={expenses} />
    </div>
  );
};

export default CategoryTab;

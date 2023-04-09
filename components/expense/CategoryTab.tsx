import { FC } from 'react';
import styles from '../../styles/expense/CategoryTab.module.sass';
import ExpenseTable from './ExpenseTable';
import { numberDivider } from '../../assets/misc/functions';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { target, paid_icon, unpaid_icon } from '../../assets/icons';
import Expense from '../../types/Expense';

interface Props {
  expenses: Expense[];
  category: string;
  editExpense(e: any, data: Expense): void;
}

const CategoryTab: FC<Props> = ({ category, expenses, editExpense }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tab_header}>
        <span>Total Amount: {numberDivider(parseFloat(category))} €</span>
      </div>
      <ExpenseTable expenses={expenses} editExpense={editExpense} />
    </div>
  );
};

export default CategoryTab;

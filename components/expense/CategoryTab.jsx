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

const CategoryTab = (props) => {
  const { category, editInvoice } = props;
  const openLink = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank').focus();
  };
  return (
    <div className={styles.container}>
      <div className={styles.tab_header}>
        <span>
          Total Amount: {numberDivider(parseFloat(category?.categoryTotal))} €
        </span>
      </div>
      <ExpenseTable expenses={category?.expenses} editInvoice={editInvoice} />
    </div>
  );
};

export default CategoryTab;

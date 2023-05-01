import { FC } from 'react';
import { numberDivider } from '../../assets/misc/functions';
import moment from 'moment';
import useForm from '../../hooks/useForm';
// Styles
import styles from '../../styles/expense/ExpenseTable.module.sass';
import { target, paid_icon, unpaid_icon } from '../../assets/icons';
// Components
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
// Types
import Expense from '../../types/Expense';

interface Props {
  expenses: Expense[];
}

const ExpenseTable: FC<Props> = ({ expenses }) => {
  const { setEditExpenseData } = useForm();

  const openLink = (e: any, url: string) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' || window !== null) {
      const w = window.open(url, '_blank');
      if (w) w.focus();
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} size={'small'}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Firma</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Invoice</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses?.map((exp) => (
              <TableRow
                key={exp.id}
                onClick={() => setEditExpenseData(exp)}
                className={styles.invoice_row}
              >
                <TableCell className={styles.payment_icon}>
                  {exp.isPaid ? paid_icon : unpaid_icon}
                </TableCell>
                <TableCell> {moment(exp.date).format('DD.MM.YYYY')}</TableCell>
                <TableCell>{exp.firm}</TableCell>
                <TableCell>{exp.description}</TableCell>
                <TableCell>€ {numberDivider(exp.amount)}</TableCell>
                <TableCell>
                  {exp.link.length > 0 ? (
                    <button onClick={(e) => openLink(e, exp.link)}>
                      <p className={styles.invoice_link}>Invoice {target}</p>
                    </button>
                  ) : (
                    <p>No Invoice</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExpenseTable;

import moment from 'moment';
import { target, paid_icon, unpaid_icon } from '../../assets/icons';
import { numberDivider } from '../../assets/misc/functions';
import styles from '../../styles/expense/ExpenseTable.module.sass';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

const ExpenseTable = (props) => {
  const { expenses, editInvoice } = props;
  const openLink = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank').focus();
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
                scope={'row'}
                onClick={(e) => editInvoice(e, exp)}
                className={styles.invoice_row}
              >
                <TableCell className={styles.payment_icon}>
                  {exp.isPaid ? paid_icon : unpaid_icon}
                </TableCell>
                <TableCell>{exp.date}</TableCell>
                <TableCell>{exp.firm}</TableCell>
                <TableCell>{exp.description}</TableCell>
                <TableCell>{exp.amount}</TableCell>
                <TableCell>
                  {exp.documentLink.length > 0 ? (
                    <button onClick={(e) => openLink(e, exp.documentLink)}>
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

import { FC } from 'react';
import moment from 'moment';
import useForm from '../../hooks/useForm';
// Styles
import { target, paid_icon } from '../../assets/icons';
import styles from '../../styles/expense/ExpenseTable.module.sass';
// Components
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
// Types
import { Insurance } from '../../types/Insurance';

interface Props {
  insurances: Insurance[];
}

const InsuranceTable: FC<Props> = ({ insurances }) => {
  const { setEditInsuranceData } = useForm();
  // const openLink = (e: any, url: string) => {
  //   e.stopPropagation();
  //   if (typeof window !== 'undefined' || window !== null) {
  //     window?.open(url, '_blank').focus();
  //   }
  // };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} size={'small'}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Insurance Firm</TableCell>
              <TableCell>Insurance</TableCell>
              <TableCell>Yearly Amount</TableCell>
              <TableCell>Insurance Paper</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {insurances?.map((insurance) => (
              <TableRow
                key={insurance.id}
                onClick={() => {
                  setEditInsuranceData(insurance);
                }}
                className={styles.invoice_row}
              >
                <TableCell className={styles.payment_icon}>
                  {paid_icon}
                </TableCell>
                <TableCell>
                  {moment(insurance.contract_start_date).format('DD.MM.YYYY')}
                </TableCell>
                <TableCell>{insurance.insurance_vendor}</TableCell>
                <TableCell>{insurance.insurance_name}</TableCell>
                <TableCell>
                  {parseFloat(
                    insurance.yearly_amount as string
                  ).toLocaleString()}{' '}
                  €
                </TableCell>
                <TableCell>
                  {insurance.insurance_paper_link.length > 0 ? (
                    <button /* onClick={(e) => openLink(e, exp.link)} */>
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

export default InsuranceTable;

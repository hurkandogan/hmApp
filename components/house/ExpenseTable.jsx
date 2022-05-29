import moment from 'moment';
import { target, paid_icon, unpaid_icon } from '../../assets/icons';
import styles from '../../styles/house/ExpenseTable.module.sass';

const ExpenseTable = (props) => {
  return (
    <div className={styles.container}>
      <table>
        <thead className={styles.table_head}>
          <tr className={styles.table}>
            <th className={styles.table_payment}></th>
            <th className={styles.table_date}>Date</th>
            <th className={styles.table_firm}>Firma</th>
            <th className={styles.table_desc}>Description</th>
            <th className={styles.table_amount}>Amount</th>
            <th className={styles.table_link}>Invoice</th>
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {props.expenses?.map((el, index) => {
            return (
              <tr
                onClick={() => props.editInvoice(el)}
                className={
                  styles.table_row +
                  ' ' +
                  (index % 2 === 1 ? styles.table_row_gray : '')
                }
                key={index}
              >
                <td>{el.isPaid ? paid_icon : unpaid_icon}</td>
                <td>{el.date}</td>
                <td>{el.firm}</td>
                <td>{el.description}</td>
                <td>{el.amount} €</td>
                <td>
                  <a href={el.documentLink} target="_blank" rel="noreferrer">
                    <p>Invoice {target}</p>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;

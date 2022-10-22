import moment from 'moment';
import { target, paid_icon, unpaid_icon } from '../../assets/icons';
import { numberDivider } from '../../assets/misc/functions';
import styles from '../../styles/expense/ExpenseTable.module.sass';

const ExpenseTable = (props) => {
  const test = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank').focus();
  };

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
                onClick={(e) => props.editInvoice(e, el)}
                className={
                  styles.table_row +
                  ' ' +
                  (index % 2 === 1 ? styles.table_row_gray : '')
                }
                key={index}
              >
                <td>{el.isPaid ? paid_icon : unpaid_icon}</td>
                <td>{moment(el.date).format('DD.MM.YYYY')}</td>
                <td>{el.firm}</td>
                <td>{el.description}</td>
                <td>{numberDivider(el.amount)} €</td>
                <td>
                  {el.documentLink.length > 0 ? (
                    <button onClick={(e) => test(e, el.documentLink)}>
                      <p>Invoice {target}</p>
                    </button>
                  ) : (
                    <p>No Invoice</p>
                  )}
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

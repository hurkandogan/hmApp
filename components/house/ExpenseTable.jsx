import styles from '../../styles/expense/ExpenseTable.module.sass';
const ExpenseTable = (props) => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr className={styles.table}>
            <th className={styles.table_date}>Date</th>
            <th className={styles.table_firm}>Firma</th>
            <th className={styles.table_desc}>Description</th>
            <th className={styles.table_amount}>Amount</th>
            <th className={styles.table_link}>Link</th>
          </tr>
        </thead>
        <tbody>
          {props.expenses?.map((el, index) => {
            return (
              <tr key={index}>
                <td>{el.date}</td>
                <td>{el.firm}</td>
                <td>{el.description}</td>
                <td>{el.amount}</td>
                <td>{el.documentLink}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;

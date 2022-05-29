import styles from '../../styles/house/CategoryTab.module.sass';
import ExpenseTable from './ExpenseTable';

const CategoryTab = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.tab_header}>
        <span>Total Amount: {props.category?.categoryTotal} €</span>
      </div>
      <ExpenseTable
        editInvoice={props.editInvoice}
        expenses={props.category?.expenses}
      />
    </div>
  );
};

export default CategoryTab;

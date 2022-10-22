import styles from '../../styles/expense/CategoryTab.module.sass';
import ExpenseTable from './ExpenseTable';
import { numberDivider } from '../../assets/misc/functions';

const CategoryTab = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.tab_header}>
        <span>
          Total Amount:{' '}
          {numberDivider(parseFloat(props.category?.categoryTotal))} €
        </span>
      </div>
      <ExpenseTable
        editInvoice={props.editInvoice}
        expenses={props.category?.expenses}
      />
    </div>
  );
};

export default CategoryTab;

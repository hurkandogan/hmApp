import styles from '../../styles/expense/CategoryTab.module.sass';
import ExpenseTable from './ExpenseTable';

const CategoryTab = (props) => {
  const getTotal = () => {
    let total = 0;
    props.category?.expenses.forEach((el) => {
      total += el.amount;
    });
    return total;
  };
  return (
    <div className={styles.container}>
      <div className={styles.tab_header}>
        <span>Total Amount: {getTotal()} €</span>
      </div>
      <hr />
      <ExpenseTable expenses={props.category?.expenses} />
    </div>
  );
};

export default CategoryTab;

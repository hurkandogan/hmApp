import styles from '../../styles/filtered_table/index.module.sass';
import Filters from '../../components/filtered_table/Filters';

const FilteredTable = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <h2>Invoices / Insurances</h2>
        <div className={styles.filter_container}>
          <Filters />
        </div>
      </div>
    </div>
  );
};

export default FilteredTable;

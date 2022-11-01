import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/filtered_table/index.module.sass';
import FilterContainer from '../../components/filtered_table/FilterContianer';
import ExpenseTable from '../../components/expense/ExpenseTable';
import { filter_icon } from '../../assets/icons';

const FilteredTable = () => {
  const Router = useRouter();
  const { route } = Router.query;
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.container_header}>
          <h2>{`${route === 'all_expenses' ? 'Invoices' : 'Insurances'}`}</h2>
          <span onClick={() => setFilterOpen(!filterOpen)}>{filter_icon}</span>
        </div>
        <div className={styles.table}>
          <ExpenseTable />
        </div>
      </div>
      {filterOpen && (
        <FilterContainer
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
      )}
    </div>
  );
};

export default FilteredTable;

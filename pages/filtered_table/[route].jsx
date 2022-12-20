import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/filtered_table/index.module.sass';
import { filter_icon } from '../../assets/icons';

// UI Components
import FilterContainer from '../../components/filtered_table/FilterContianer';
import ExpenseTable from '../../components/expense/ExpenseTable';

// Services
import getAllExpenses from '../../service/expenses/getAllExpenses';
import getAllInsurances from '../../service/insurances/getAllInsurances';
import { useAppSelector } from '../../redux/hooks';

const FilteredTable = () => {
  const Router = useRouter();
  const { route } = Router.query;
  const [filterOpen, setFilterOpen] = useState(false);
  const [data, setData] = useState([]);
  const isExpenseEdited = useAppSelector((state) => state.editInvoice.isEdited);

  useEffect(() => {
    if (route === 'expenses') {
      getAllExpenses().then((res) => {
        if (res.data) setData(res.data.data);
      });
    } else if (route === 'insurances') {
      getAllInsurances().then((res) => {
        if (res.data) setData(res.data.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, isExpenseEdited]);

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.container_header}>
          <h2>{`${route === 'expenses' ? 'Invoices' : 'Insurances'}`}</h2>
          <span onClick={() => setFilterOpen(!filterOpen)}>{filter_icon}</span>
        </div>
        <div className={styles.table}>
          {route === 'expenses' ? <ExpenseTable expenses={data} /> : ''}
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

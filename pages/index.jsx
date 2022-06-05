import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import { dashboard_arrow } from '../assets/icons';
import ObjectTotal from '../components/dashboard/ObjectTotal';
import ExpenseTable from '../components/house/ExpenseTable';
import styles from '../styles/Home.module.sass';
import getDashboardTotals from '../service/dashboard/getDashboardTotals';

const Home = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [totalsTab, setTotalsTab] = useState(true);
  const [unpaidTabIsOpen, setUnpaidTabIsOpen] = useState(false);

  const { selectedYear } = useAppContext();

  useEffect(() => {
    getDashboardTotals({ selectedYear: selectedYear })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data) setDashboardData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [selectedYear]);

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.dashboardTable}>
          <div
            className={styles.dashboard_title}
            onClick={() => setTotalsTab(!totalsTab)}
          >
            <h1>{selectedYear} Totals</h1>
            <span
              className={
                styles.dashboard_arrow +
                ' ' +
                (totalsTab
                  ? styles.dashboard_arrow_open
                  : styles.dashboard_arrow_close)
              }
            >
              {dashboard_arrow}
            </span>
          </div>
          <div
            className={
              styles.dashboard_content +
              ' ' +
              (totalsTab ? styles.dashboard_content_open : '')
            }
          >
            <div className={styles.container_inner_objects}>
              {dashboardData.objects?.map((object) => {
                if (object.isHouse) {
                  return <ObjectTotal key={object.id} object={object} />;
                }
              })}
            </div>
            <div className={styles.container_inner_objects}>
              {dashboardData.objects?.map((object) => {
                if (!object.isHouse) {
                  return <ObjectTotal key={object.id} object={object} />;
                }
              })}
            </div>
          </div>
        </div>
        {/* TODO: needs a headline */}

        <div className={styles.dashboardTable}>
          <div
            className={styles.dashboard_title}
            onClick={() => setUnpaidTabIsOpen(!unpaidTabIsOpen)}
          >
            <h1>Unpaid Invoices</h1>
            <span
              className={
                styles.dashboard_arrow +
                ' ' +
                (unpaidTabIsOpen
                  ? styles.dashboard_arrow_open
                  : styles.dashboard_arrow_close)
              }
            >
              {dashboard_arrow}
            </span>
          </div>
          <div
            className={
              styles.dashboard_content +
              ' ' +
              (unpaidTabIsOpen ? styles.dashboard_content_open : '')
            }
          >
            <ExpenseTable expenses={dashboardData.unpaidExpenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

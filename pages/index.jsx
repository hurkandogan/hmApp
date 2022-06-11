import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import { dashboard_arrow } from '../assets/icons';
import ObjectTotal from '../components/dashboard/ObjectTotal';
import ExpenseTable from '../components/house/ExpenseTable';
import ModalBox from '../components/ModalBox';
import styles from '../styles/Home.module.sass';
import globalStyles from '../styles/Global.module.sass';
import getDashboardTotals from '../service/dashboard/getDashboardTotals';
import editExpense from '../service/expenses/editExpense';

const Home = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [totalsTab, setTotalsTab] = useState(true);
  const [unpaidTabIsOpen, setUnpaidTabIsOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({});

  const { selectedYear } = useAppContext();

  useEffect(() => {
    loadData();
  }, [selectedYear]);

  const loadData = () => {
    getDashboardTotals({ selectedYear: selectedYear })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data) setDashboardData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const updatePaymentStatus = (el) => {
    setSelectedExpense(el);
    setShowModal(true);
  };

  const savePaymentStatus = () => {
    const tmpExpense = selectedExpense;
    tmpExpense.isPaid = 1;
    editExpense(tmpExpense)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
        }
        loadData();
      })
      .catch((err) => console.log(err));
    closeModalBox();
  };

  const closeModalBox = () => {
    setShowModal(false);
    setSelectedExpense({});
  };

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
            <ExpenseTable
              expenses={dashboardData.unpaidExpenses}
              editInvoice={updatePaymentStatus}
            />
          </div>
        </div>
      </div>
      <ModalBox
        active={showModal}
        close={closeModalBox}
        headline={'Is this invoice paid?'}
      >
        Is this invoice paid? (This action will update the payment status.)
        <div className={styles.modalBoxButtonWrapper}>
          <button
            className={globalStyles.primaryButton}
            onClick={savePaymentStatus}
          >
            Yes
          </button>
          <button
            className={globalStyles.secondaryButton}
            onClick={closeModalBox}
          >
            No
          </button>
        </div>
      </ModalBox>
    </div>
  );
};

export default Home;

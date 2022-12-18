import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/index';
import { useRouter } from 'next/router';
import styles from '../../styles/expense/Index.module.sass';
import moment from 'moment';

// Services
import getHouseData from '../../service/expenses/getHouseData';

// Assets
import { house_filled } from '../../assets/icons';
import { numberDivider } from '../../assets/misc/functions';

// Components
import CategoryTab from '../../components/expense/CategoryTab';
import EditExpenseOffCanvas from '../../components/expense/EditExpenseOffCanvas';
import ModalBox from '../../components/ModalBox';
import OilStatus from '../../components/expense/OilStatus';

const OBJECT_INITIAL_DATA = {
  object: {},
  objectTotal: 0,
  expenseCount: 0,
  expenseList: [],
};

const House = () => {
  const router = useRouter();
  const { selectedYear, selectedCategory, setSelectedCategory } =
    useAppContext();
  const [route, setRoute] = useState(undefined);
  const [object, setObject] = useState(OBJECT_INITIAL_DATA);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [oilStatusModal, setOilStatusModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRoute(router.query.route);
    setSelectedCategory(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.route]);

  useEffect(() => {
    loadHouseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, selectedYear]);

  const loadHouseData = () => {
    if (route) {
      setLoading(true);
      getHouseData({ route: route, selectedYear: selectedYear })
        .then((res) => {
          let data = res.data.data;
          setObject(data);
          getOilStatus(data.oilStatus);
        })
        .catch((err) => console.log(err));
      setLoading(false);
    }
  };

  const handleSelectedCategory = (cat_id) => setSelectedCategory(cat_id);

  const editInvoice = (e, data) => {
    let invoice = data;
    setIsEditOpen(true);
    setSelectedExpense(invoice);
  };

  const showOilStatusModal = () => setOilStatusModal(!oilStatusModal);
  const closeOilStatusModal = () => setOilStatusModal(false);

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.container_inner_title}>
          <h1>{object.object.name}</h1>
        </div>
        <div className={styles.container_inner_header}>
          <div className={styles.header_svg}>{house_filled}</div>
          <div className={styles.header_col}>
            {object.object.hasOilTank ? (
              <p className={styles.oilStatusText} onClick={showOilStatusModal}>
                Oil Level:{' '}
                <span>
                  {object.oilStatus?.status} Lt.
                  <i>
                    {' '}
                    (last status from:{' '}
                    {moment(object.oilStatus?.date).format('DD.MM.YYYY')})
                  </i>
                </span>
              </p>
            ) : (
              ''
            )}
            <p>Total invoice count: {object?.expenseCount} expense(s)</p>
            <p>
              Total expense amount:{' '}
              <strong>
                {numberDivider(parseFloat(object?.objectTotal))} €
              </strong>
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.tab_container}>
            <div className={styles.tab_title_container}>
              {object?.expenseList.map((el, index) => {
                if (el.expenses.length > 0) {
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelectedCategory(index)}
                      className={
                        styles.tab_title +
                        ' ' +
                        (index === selectedCategory
                          ? styles.tab_title_active
                          : '')
                      }
                    >
                      {el.name}
                    </div>
                  );
                }
              })}
              <div className={styles.offset}></div>
            </div>
            <CategoryTab
              editInvoice={editInvoice}
              category={object?.expenseList[selectedCategory]}
            />
          </div>
        </div>
      </div>
      <EditExpenseOffCanvas />
      <ModalBox
        active={oilStatusModal}
        close={closeOilStatusModal}
        headline="Oil Status"
      >
        <OilStatus selectedObject={object.object.id} />
      </ModalBox>
    </div>
  );
};

export default House;

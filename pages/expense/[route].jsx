import styles from '../../styles/House.module.sass';
import moment from 'moment';
import { useAppContext } from '../../context/index';
import { useEffect, useState } from 'react';
import { house_filled } from '../../assets/icons';
import { useRouter } from 'next/router';
import getHouseData from '../../service/expenses/getHouseData';
import CategoryTab from '../../components/house/CategoryTab';
import EditExpenseOffCanvas from '../../components/house/EditExpenseOffCanvas';
import ModalBox from '../../components/ModalBox';
import OilStatus from '../../components/house/OilStatus';
import { numberDivider } from '../../assets/misc/functions';

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
  }, [router.query.route]);

  useEffect(() => {
    loadHouseData();
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

  const editInvoiceClose = () => {
    setIsEditOpen(false);
    setSelectedExpense({});
    loadHouseData();
  };

  const editInvoice = (e, data) => {
    let invoice = data;
    setIsEditOpen(true);
    setSelectedExpense(invoice);
  };

  const editChangeHandler = (name, value) => {
    setSelectedExpense((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
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
          <div className={styles.header_col}></div>
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
            <div className={styles.tab_content}>
              <CategoryTab
                editInvoice={editInvoice}
                category={object?.expenseList[selectedCategory]}
              />
            </div>
          </div>
        </div>
      </div>
      <EditExpenseOffCanvas
        isOpen={isEditOpen}
        close={editInvoiceClose}
        expense={selectedExpense}
        editChangeHandler={editChangeHandler}
      />
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

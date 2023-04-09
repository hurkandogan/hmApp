import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/index';
import { useRouter } from 'next/router';
import styles from '../../styles/expense/Index.module.sass';
import moment from 'moment';
// Services
import {
  getDatabase,
  ref,
  onValue,
  query,
  equalTo,
  orderByKey,
  orderByChild,
} from 'firebase/database';
// Assets
import { house_filled } from '../../assets/icons';
import { numberDivider } from '../../assets/misc/functions';

// Components
import CategoryTab from '../../components/expense/CategoryTab';
import EditExpenseOffCanvas from '../../components/expense/EditExpenseOffCanvas';
import ModalBox from '../../components/ModalBox';
import OilStatus from '../../components/expense/OilStatus';

// Redux
import { useAppSelector } from '../../redux/hooks';

// Types
import Property from '../../types/Property';
import Expense from '../../types/Expense';

const OBJECT_INITIAL_DATA = {
  object: {},
  objectTotal: 0,
  expenseCount: 0,
  expenseList: [],
};

const House = () => {
  const router = useRouter();
  const properties = useAppSelector((state) => state.properties.value);
  const {
    selectedObject,
    selectedYear,
    selectedCategory,
    setSelectedCategory,
  } = useAppContext();
  console.log(selectedObject);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [object, setObject] = useState(OBJECT_INITIAL_DATA);
  const [property, setProperty] = useState<Property>();
  const [selectedExpense, setSelectedExpense] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [oilStatusModal, setOilStatusModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const db = getDatabase();

  useEffect(() => {
    const { route } = router.query;
    properties.forEach((el) => {
      if (route === el.id) {
        setProperty(el);
        return;
      }
      if (el.sub_property) {
        el.sub_property.forEach((sub: Property) => {
          if (route === sub.id) {
            setProperty(sub);
            return;
          }
        });
      }
    });
    const starCountRef = query(
      ref(db, 'expenses/'),
      orderByChild('property'),
      equalTo(route as string)
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const arr: Expense[] | null = data
        ? Object.entries(data).map(([id, expense]) => ({
            ...(expense as Expense),
            id,
          }))
        : null;
      if (arr) setExpenses(arr);
    });
    setSelectedCategory(
      property?.available_categories && property?.available_categories[0].val
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.route, selectedYear]);

  const handleSelectedCategory = (cat_id: string) =>
    setSelectedCategory(cat_id);

  const editInvoice = (e: any, data: Expense) => {
    setIsEditOpen(true);
    setSelectedExpense(data);
  };

  const showOilStatusModal = () => setOilStatusModal(!oilStatusModal);
  const closeOilStatusModal = () => setOilStatusModal(false);

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.container_inner_title}>
          <h1>{property?.name}</h1>
        </div>
        <div className={styles.container_inner_header}>
          <div className={styles.header_svg}>{house_filled}</div>
          <div className={styles.header_col}>
            {/* {object.object.hasOilTank ? (
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
            )} */}
            {/* <p>Total invoice count: {object?.expenseCount} expense(s)</p> */}
            {/* <p>
              Total expense amount:{' '}
              <strong>
                {numberDivider(parseFloat(object?.objectTotal))} €
              </strong>
            </p> */}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.tab_container}>
            <div className={styles.tab_title_container}>
              {property?.available_categories &&
                property.available_categories.map((el, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelectedCategory(el.val)}
                      className={
                        styles.tab_title +
                        ' ' +
                        (el.val === (selectedCategory as string)
                          ? styles.tab_title_active
                          : '')
                      }
                    >
                      {el.label}
                    </div>
                  );
                })}
              <div className={styles.offset}></div>
            </div>
            <CategoryTab
              editExpense={editInvoice}
              category={selectedCategory}
              expenses={expenses.filter(
                (exp) => exp.category === selectedCategory
              )}
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
        {/* <OilStatus selectedObject={property?.id} /> */}
      </ModalBox>
    </div>
  );
};

export default House;

import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/index';
import { useRouter } from 'next/router';
import styles from '../../styles/expense/Index.module.sass';
// Services
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  startAfter,
  endAt,
} from 'firebase/database';
// Assets
import { house_filled } from '../../assets/icons';
// Components
import CategoryTab from '../../components/expense/CategoryTab';
import EditExpenseOffCanvas from '../../components/OffCanvas';
import ModalBox from '../../components/ModalBox';
// import OilStatus from '../../components/expense/OilStatus';
// Redux
import { useAppSelector } from '../../redux/hooks';
// Types
import { Property } from '../../types/Property';
import Expense from '../../types/Expense';
import { Insurance } from '../../types/Insurance';

const House = () => {
  const router = useRouter();
  const properties = useAppSelector((state) => state.properties.value.grouped);
  const { selectedCategory, setSelectedCategory } = useAppContext();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [insurances, setInsurances] = useState<Insurance[]>();
  const [property, setProperty] = useState<Property>();
  const [oilStatusModal, setOilStatusModal] = useState(false);
  const selectedYear = useAppSelector(
    (state) => state.selectedYear.value.selectedYear
  );

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
    const expensesRef = query(
      ref(db, 'expenses/'),
      orderByChild('date'),
      startAfter(`${selectedYear}-01-01`),
      endAt(`${selectedYear}-12-31`)
    );

    const insRef = query(
      ref(db, 'insurances/'),
      orderByChild('contract_start_date')
    );

    onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();

      const arr: Expense[] | null = data
        ? Object.entries(data).map(([id, expense]) => ({
            ...(expense as Expense),
            id,
          }))
        : null;
      if (arr) setExpenses(arr);
    });

    onValue(insRef, (snapshot) => {
      const data = snapshot.val();
      const arr: Insurance[] | null = data
        ? Object.entries(data).map(([id, insurance]) => ({
            ...(insurance as Insurance),
            id,
          }))
        : null;
      if (arr) setInsurances(arr);
    });

    setSelectedCategory(
      property?.available_categories && property?.available_categories[0].val
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.route, selectedYear, property]);

  const handleSelectedCategory = (cat_id: string) =>
    setSelectedCategory(cat_id);

  // const showOilStatusModal = () => setOilStatusModal(!oilStatusModal);
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
              <div
                onClick={() => handleSelectedCategory('insurances')}
                className={
                  styles.tab_title +
                  ' ' +
                  ('insurances' === (selectedCategory as string)
                    ? styles.tab_title_active
                    : '')
                }
              >
                Insurances
              </div>
              <div className={styles.offset}></div>
            </div>
            {selectedCategory === 'insurances' ? (
              <CategoryTab
                insurances={
                  insurances &&
                  insurances.filter(
                    (ins) => ins.insurance_property === router.query.route
                  )
                }
              />
            ) : (
              <CategoryTab
                expenses={expenses.filter(
                  (exp) =>
                    exp.category === selectedCategory &&
                    exp.property === router.query.route
                )}
              />
            )}
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

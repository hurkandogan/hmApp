import styles from '../../styles/House.module.sass';
import { useAppContext } from '../../context/index';
import { useEffect, useState } from 'react';
import { house_filled } from '../../assets/icons';
import { useRouter } from 'next/router';
import getHouseData from '../../service/expenses/getHouseData';
import CategoryTab from '../../components/house/CategoryTab';
import EditExpenseOffCanvas from '../../components/house/EditExpenseOffCanvas';

const OBJECT_INITIAL_DATA = {
  object: {},
  objectTotal: 0,
  expenseCount: 0,
  expenseList: [],
};

const House = () => {
  const router = useRouter();
  const { selectedYear } = useAppContext();
  const [route, setRoute] = useState(undefined);
  const [object, setObject] = useState(OBJECT_INITIAL_DATA);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRoute(router.query.route);
  }, [router.query.route]);

  useEffect(() => {
    loadHouseData();
  }, [route, selectedYear]);

  useEffect(() => {
    setSelectedCategory(object?.expenseList[0]?.id);
  }, [object]);

  const loadHouseData = () => {
    if (route) {
      setLoading(true);
      getHouseData({ route: route, selectedYear: selectedYear })
        .then((res) => {
          let data = res.data.data;
          setObject(data);
        })
        .catch((err) => console.log(err));
      setLoading(true);
    }
  };

  const handleSelectedCategory = (cat_id) => setSelectedCategory(cat_id);

  const editInvoiceClose = () => {
    setIsEditOpen(false);
    setSelectedExpense({});
    loadHouseData();
  };

  const editInvoice = (data) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.container_inner_title}>
          <h1>{object.object.name}</h1>
        </div>
        <div className={styles.container_inner_header}>
          <div className={styles.header_svg}>{house_filled}</div>
          <div className={styles.header_col}>
            <p>
              Oil Level: <i>last updated at today</i>
            </p>
            <p>
              Electric: 999,99<i>last updated at today</i>
            </p>
            <p>Total invoice count: {object?.expenseCount} expense(s)</p>
            <p>Total expense amount: {object?.objectTotal} €</p>
          </div>
          <div className={styles.header_col}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.tab_container}>
            <div className={styles.tab_title_container}>
              {object?.expenseList.map((el, index) => {
                if (el.expenses.length > 0) {
                  if (!selectedCategory) setSelectedCategory(el.id);
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelectedCategory(el.id)}
                      className={
                        styles.tab_title +
                        ' ' +
                        (el.id === selectedCategory
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
                category={object?.expenseList.find(
                  (el) => el.id === selectedCategory
                )}
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
    </div>
  );
};

export default House;

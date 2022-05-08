import styles from '../../styles/House.module.sass';
import { useAppContext } from '../../context/index';
import { useEffect, useState } from 'react';
import { house_filled } from '../../assets/icons';
import { useRouter } from 'next/router';
import getHouseData from '../../service/expenses/getHouseData';
import getCategories from '../../service/categories/getCategories';
import CategoryTab from '../../components/house/CategoryTab';

const House = () => {
  const router = useRouter();
  const { selectedYear, setSelectedYear } = useAppContext();
  const [yearValues, setYearValues] = useState([]);
  const [route, setRoute] = useState(undefined);
  const [object, setObject] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    setRoute(router.query.route);
    // TODO: Year value should be handled in ContextAPI or in Header
    setYearValues([]);
    for (let i = selectedYear; i >= 2019; i--) {
      setYearValues((prevState) => [...prevState, i]);
    }
  }, [selectedYear, router.query.route]);

  useEffect(() => {
    if (route) {
      getHouseData({ route: route })
        .then((res) => setObject(res.data.object))
        .catch((err) => console.log(err));
    }
  }, [route]);

  useEffect(() => {
    let fetchedCategories = [];
    let categoriesWithExpenses = [];
    getCategories()
      .then((res) => {
        if (res.status === 200) fetchedCategories = res.data.result;
      })
      .then(() => {
        fetchedCategories.forEach((category) => {
          category.expenses = [];
          object.expenses?.rows.forEach((expense) => {
            if (category.id === expense.category.id) {
              category.expenses.push(expense);
            }
          });
          categoriesWithExpenses.push(category);
        });
        setCategories(categoriesWithExpenses);
        for (const i in categoriesWithExpenses) {
          if (categoriesWithExpenses[i].expenses.length > 0) {
            setSelectedCategory(categoriesWithExpenses[i].id);
          }
        }
      });
  }, [object]);

  const handleSelectedYear = (e) => setSelectedYear(e.target.value);
  const handleSelectedCategory = (cat_id) => setSelectedCategory(cat_id);

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.container_inner_title}>
          <h1>{object.name}</h1>
          <select onChange={handleSelectedYear} value={selectedYear}>
            {yearValues.map((el) => {
              return (
                <option key={el} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
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
            <p>Total invoice count: {object.expenses?.count}</p>
            <p>Total expense amount: {object.expenses?.total} €</p>
          </div>
          <div className={styles.header_col}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.tab_container}>
            <div className={styles.tab_title_container}>
              {categories.map((el, index) => {
                if (el.isHouse === object.isHouse && el.expenses.length > 0) {
                  if (selectedCategory === '') setSelectedCategory(el.id);
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelectedCategory(el.id)}
                      className={styles.tab_title}
                    >
                      {el.name}
                    </div>
                  );
                }
              })}
            </div>
            <div className={styles.tab_content}>
              <CategoryTab
                category={categories.find((el) => el.id === selectedCategory)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default House;

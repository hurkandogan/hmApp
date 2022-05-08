import styles from '../styles/Home.module.sass';
import { useAppContext } from '../context/index';
import { useEffect, useState } from 'react';
import { house_filled } from '../assets/icons';

const Home = () => {
  const { selectedYear, setSelectedYear } = useAppContext();
  const [yearValues, setYearValues] = useState([]);
  const [selectedTab, setSelectedTab] = useState([]);

  useEffect(() => {
    setYearValues([]);
    for (let i = selectedYear; i >= 2019; i--) {
      setYearValues((prevState) => [...prevState, i]);
    }
  }, []);

  const handleSelectedYear = (e) => setSelectedYear(e.target.value);
  const handleSelectedTab = (tab_title) => setSelectedTab(tab_title);

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.container_inner_title}>
          <h1>Property Name!</h1>
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
        Burada sadece totaller olacak! Anasayfa burasi olacak!
      </div>
    </div>
  );
};

export default Home;

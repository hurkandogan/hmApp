import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import styles from '../styles/Home.module.sass';
import getDashboardTotals from '../service/dashboard/getDashboardTotals';

const Home = () => {
  const [dashboardData, setDashboardData] = useState([]);

  const { selectedYear } = useAppContext();

  useEffect(() => {
    getDashboardTotals({ selectedYear: selectedYear })
      .then((res) => {
        console.log(res);
        if (res.data.data) setDashboardData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.container_inner_title}>
          <h1>Property Name!</h1>
        </div>
        {dashboardData.objects?.map((object) => {
          return (
            <div key={object.id}>
              <h2>{object.name}</h2>
              {object.expenses?.map((category) => {
                if (category.categoryTotal > 0) {
                  return (
                    <div key={category.id}>
                      <h3>{category.name}</h3>
                      <p>{category.categoryTotal}</p>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

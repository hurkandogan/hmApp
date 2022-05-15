import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.sass';
import getDashboardTotals from '../service/dashboard/getDashboardTotals';

const Home = () => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    getDashboardTotals()
      .then((res) => {
        if (res.data.data) {
          setObjects(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.container_inner_title}>
          <h1>Property Name!</h1>
        </div>
        {objects.map((object) => {
          return (
            <div key={object.id}>
              <h2>{object.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

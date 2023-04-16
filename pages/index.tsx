import { useState, useEffect } from 'react';
import ObjectTotal from '../components/dashboard/ObjectTotal';
import styles from '../styles/Home.module.sass';
import { useAppSelector } from '../redux/hooks';
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  startAfter,
  endAt,
} from 'firebase/database';
import { Property } from '../types/Property';

const Home = () => {
  const db = getDatabase();
  const [dashboardData, setDashboardData] = useState<Property[]>();
  const properties = useAppSelector((state) => state.properties.value.all);
  const selectedYear = useAppSelector(
    (state) => state.selectedYear.value.selectedYear
  );

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  const loadData = () => {
    const expRef = query(
      ref(db, 'expenses/'),
      orderByChild('date'),
      startAfter(`${selectedYear}-01-01`),
      endAt(`${selectedYear}-12-31`)
    );

    onValue(expRef, (snapshot) => {
      const data = snapshot.val();
      const allData: Property[] = [];
      if (data) {
        let allProps: Property[] = [];
        properties.map((el) => {
          if (el.sub_property) {
            el.sub_property.map((sub) => {
              allProps.push(sub);
            });
          } else {
            allProps.push(el);
          }
        });
        allProps.map((prop) => {
          const catArr: { name: string; total: number }[] = [];
          prop.available_categories?.forEach((cat) => {
            let total = 0;
            Object.keys(data).forEach((id) => {
              if (
                data[id].property === prop.id &&
                data[id].category === cat.val
              )
                total += parseInt(data[id].amount);
            });
            const res = { name: cat.label, total: total };
            catArr.push(res);
          });
          allData.push({ ...prop, totals: catArr });
        });
        setDashboardData(allData);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.dashboard_content}>
          <div className={styles.dashboard_content_parent_object}>
            <div className={styles.dashboard_content_parent_object_container}>
              {/* <div
                className={
                  styles.dashboard_content_parent_object_container_header
                }
              >
                <h2>Expenses</h2>
              </div> */}
              <div
                className={
                  styles.dashboard_content_parent_object_container_objects
                }
              >
                {dashboardData &&
                  dashboardData.map((property) => (
                    <ObjectTotal key={property.id} property={property} />
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

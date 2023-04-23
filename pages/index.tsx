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
import { Categories } from '../constants/Categories';
import { Insurance } from '../types/Insurance';

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

    const insRef = query(
      ref(db, 'insurances/'),
      orderByChild('contract_start_date')
    );

    const allData: Property[] = [];

    onValue(expRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        properties.map((prop) => {
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
      }
    });

    onValue(insRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        properties.map((prop) => {
          let insuranceTotal: { name: string; total: number } = {
            name: Categories.INSURANCES.val,
            total: 0,
          };
          let total = 0;
          Object.keys(data).forEach((id) => {
            const entity = data[id] as Insurance;
            if (entity.insurance_property === prop.id)
              total += parseInt(data[id].yearly_amount);
          });
          insuranceTotal = {
            name: Categories.INSURANCES.label,
            total: total,
          };
          allData.forEach((el, i) => {
            if (prop.id === el.id) {
              allData[i].totals?.push(insuranceTotal);
            }
          });
        });
      }
      setDashboardData(allData);
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

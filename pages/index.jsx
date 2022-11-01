import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import { dashboard_arrow } from '../assets/icons';
import ObjectTotal from '../components/dashboard/ObjectTotal';
import styles from '../styles/Home.module.sass';
import getDashboardTotals from '../service/dashboard/getDashboardTotals';
import { numberDivider } from '../assets/misc/functions';

const Home = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [openedGroup, setOpenedGroup] = useState(0);
  const { selectedYear } = useAppContext();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear]);

  const loadData = () => {
    getDashboardTotals({ selectedYear: selectedYear })
      .then((res) => {
        if (res.data.data) {
          const data = []
            .concat(res.data.data.objects)
            .sort((a, b) => (a.sort_number > b.sort_number ? 1 : -1));
          setDashboardData(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleGroupContainer = (index) => {
    if (openedGroup === index) setOpenedGroup(null);
    else setOpenedGroup(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.dashboard_content}>
          <div className={styles.dashboard_content_parent_object}>
            {dashboardData?.map((object, index) => {
              if (object.subObjects) {
                return (
                  <div
                    className={styles.dashboard_content_parent_object_container}
                  >
                    <div
                      className={
                        styles.dashboard_content_parent_object_container_header
                      }
                      onClick={() => toggleGroupContainer(index)}
                    >
                      <h2>{object.name}</h2>
                      <span className={styles.headerTotal}>
                        {numberDivider(object.total.toFixed(2))} €
                      </span>
                      <span
                        className={
                          styles.headerArrow +
                          ' ' +
                          (openedGroup === index
                            ? styles.headerArrow_open
                            : styles.headerArrow_close)
                        }
                      >
                        {dashboard_arrow}
                      </span>
                    </div>
                    <div
                      className={
                        styles.dashboard_content_parent_object_container_objects +
                        ' ' +
                        (openedGroup === index
                          ? styles.dashboard_content_parent_object_container_objects_open
                          : '')
                      }
                    >
                      {object.subObjects.map((object) => (
                        <ObjectTotal key={object.id} object={object} />
                      ))}
                    </div>
                    <hr />
                  </div>
                );
              }
            })}

            <div className={styles.dashboard_content_parent_object_container}>
              <div
                className={
                  styles.dashboard_content_parent_object_container_header
                }
                onClick={() => toggleGroupContainer('other_expenses')}
              >
                <h2>Other Expenses</h2>
                <span
                  className={
                    styles.headerArrow +
                    ' ' +
                    (openedGroup === 'other_expenses'
                      ? styles.headerArrow_open
                      : styles.headerArrow_close)
                  }
                >
                  {dashboard_arrow}
                </span>
              </div>
              <div
                className={
                  styles.dashboard_content_parent_object_container_objects +
                  ' ' +
                  (openedGroup === 'other_expenses'
                    ? styles.dashboard_content_parent_object_container_objects_open
                    : '')
                }
              >
                {dashboardData?.map((object) => {
                  if (object.isHouse && !object.subObjects) {
                    return <ObjectTotal key={object.id} object={object} />;
                  }
                })}
                {dashboardData?.map((object) => {
                  if (!object.isHouse && !object.subObjects) {
                    return <ObjectTotal key={object.id} object={object} />;
                  }
                })}
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

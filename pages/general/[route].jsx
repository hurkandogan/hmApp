import styles from '../../styles/House.module.sass';
import { useAppContext } from '../../context/index';
import { useEffect, useState } from 'react';
import { house_filled } from '../../assets/icons';

const GeneralExpenses = () => {
  const { selectedYear, setSelectedYear } = useAppContext();
  const [yearValues, setYearValues] = useState([]);
  const [selectedTab, setSelectedTab] = useState([]);

  useEffect(() => {
    setYearValues([]);
    for (let i = selectedYear; i >= 2019; i--) {
      setYearValues((prevState) => [...prevState, i]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className={styles.container_inner_header}>
          <div className={styles.header_svg}>{house_filled}</div>
          <div className={styles.header_col}>
            <p>
              Oil Level: <i>last updated at today</i>
            </p>
            <p>
              Electric: 999,99<i>last updated at today</i>
            </p>
            <p>Total invoice count: 9999</p>
          </div>
          <div className={styles.header_col}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.tab_container}>
            <div className={styles.tab_title_container}>
              <div
                onClick={() => handleSelectedTab('renovation_expenses')}
                className={styles.tab_title}
              >
                Renovation Expenses
              </div>
              <div
                onClick={() => handleSelectedTab('side_costs')}
                className={styles.tab_title}
              >
                Side Costs
              </div>
              <div
                onClick={() => handleSelectedTab('expenses')}
                className={styles.tab_title}
              >
                Expenses
              </div>
              <div
                onClick={() => handleSelectedTab('insurances')}
                className={styles.tab_title}
              >
                Insurances
              </div>
            </div>
            <div className={styles.tab_content}>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Firma</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>99.99.9999</td>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                    <td>Test</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralExpenses;

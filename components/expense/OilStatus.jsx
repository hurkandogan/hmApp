import { useState, useEffect } from 'react';
import { useAppContext } from '../../context';
import moment from 'moment';
import globalStyles from '../../styles/Global.module.sass';
import styles from '../../styles/expense/OilStatus.module.sass';
import { unpaid_icon } from '../../assets/icons';
import saveOilStatus from '../../service/oilStatus/saveOilStatus';
import getOilStatus from '../../service/oilStatus/getOilStatus';
import deleteOilStatus from '../../service/oilStatus/deleteOilStatus';

const INITIAL_STATE = {
  status: 0,
  type: '',
  date: '',
  pricePerUnit: 0,
  object: '',
  deliveryTotal: 0,
};

const OilStatus = (props) => {
  const { objects } = useAppContext();
  const { selectedObject } = props;
  const [oilDeliveries, setOilDeliveries] = useState([]);
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);
  const [newEntry, setNewEntry] = useState(INITIAL_STATE);

  useEffect(() => {
    loadOilStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddEntryForm]);

  const addEntry = () => setShowAddEntryForm(true);

  const loadOilStatus = () => {
    getOilStatus({ object: selectedObject })
      .then((res) => setOilDeliveries(res.data.data))
      .catch((err) => console.log(err));
  };
  const submitDeleteOilStatus = (id) => {
    deleteOilStatus({ id: id })
      .then((res) => loadOilStatus())
      .catch((err) => console.log(err));
  };
  const submitAddEntry = () => {
    saveOilStatus(newEntry)
      .then((res) => setShowAddEntryForm(false))
      .catch((err) => console.log(err));
    setNewEntry(INITIAL_STATE);
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewEntry((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <div className={styles.container}>
      {showAddEntryForm ? (
        <div className={styles.addEntryContainer}>
          <span
            className={styles.backBtn}
            onClick={() => setShowAddEntryForm(false)}
          >
            {'<'}Back
          </span>

          <div className={styles.formContainer}>
            <div className={styles.formGroupContainer}>
              <label htmlFor="date" className={globalStyles.inputLabel}>
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className={globalStyles.inputField}
                value={newEntry.date}
                onChange={changeHandler}
              />
            </div>
            <div className={styles.formGroupContainer}>
              <label htmlFor="status" className={globalStyles.inputLabel}>
                Status:
              </label>
              <input
                type="text"
                id="status"
                name="status"
                value={newEntry.status}
                onChange={changeHandler}
                className={globalStyles.inputField}
              />
            </div>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.formGroupContainer}>
              <label htmlFor="property" className={globalStyles.inputLabel}>
                Property:
              </label>
              <select
                id="property"
                name="object"
                value={newEntry.object}
                onChange={changeHandler}
                className={globalStyles.inputField}
              >
                <option value={''} disabled>
                  Choose an option
                </option>
                {objects.map((obj) => {
                  if (obj.hasOilTank) {
                    return (
                      <option key={obj.id} value={obj.id}>
                        {obj.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>

            <div className={styles.formGroupContainer}>
              <label htmlFor="entry_type" className={globalStyles.inputLabel}>
                Entry Type:
              </label>
              <select
                type="text"
                id="entry_type"
                name="type"
                value={newEntry.type}
                onChange={changeHandler}
                className={globalStyles.inputField}
              >
                <option value={''} disabled>
                  Choose an option
                </option>
                <option value={'buy'}>Oil Buy</option>
                <option value={'read'}>Oil Status Read</option>
              </select>
            </div>
          </div>

          {newEntry.type === 'buy' && (
            <div className={styles.formContainer}>
              <div className={styles.formGroupContainer}>
                <label
                  htmlFor="delivery_total"
                  className={globalStyles.inputLabel}
                >
                  Delivery Total:
                </label>
                <input
                  type="text"
                  id="delivery_total"
                  name="deliveryTotal"
                  value={newEntry.deliveryTotal}
                  onChange={changeHandler}
                  className={globalStyles.inputField}
                />
              </div>
              <div className={styles.formGroupContainer}>
                <label
                  htmlFor="price_per_unit"
                  className={globalStyles.inputLabel}
                >
                  Price per Unit:
                </label>
                <input
                  type="text"
                  id="price_per_unit"
                  name="pricePerUnit"
                  value={newEntry.pricePerUnit}
                  onChange={changeHandler}
                  className={globalStyles.inputField}
                />
              </div>
            </div>
          )}
          <div className={styles.formContainer}>
            <div className={styles.formGroupContainer}>
              <button
                className={globalStyles.primaryButton}
                onClick={submitAddEntry}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <span className={styles.addButton} onClick={addEntry}>
            + Add New
          </span>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Bought Liters</th>
                <th>Unit Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {oilDeliveries.map((oilUnit, i) => {
                return (
                  <tr key={i} className={i % 2 === 0 ? styles.oddLine : ''}>
                    <td>{moment(oilUnit.date).format('DD.MM.YYYY')}</td>
                    <td>{oilUnit.status} Lt.</td>
                    <td>
                      {oilUnit.deliveryTotal > 0 ? oilUnit.deliveryTotal : ''}
                    </td>
                    <td>
                      {oilUnit.pricePerUnit > 0
                        ? oilUnit.pricePerUnit + ' €'
                        : ''}
                    </td>
                    <td
                      className={styles.deleteBtn}
                      onClick={() => submitDeleteOilStatus(oilUnit.id)}
                    >
                      {unpaid_icon}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OilStatus;

import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import saveInsurance from '../service/insurances/saveInsurance';
import styles from '../styles/InsertExpense.module.sass';
import globalStyles from '../styles/Global.module.sass';

const InsertInsurance = () => {
  const INITIAL_STATE = {
    insurance_name: '',
    insurance_vendor: '',
    insurance_number: '',
    insurance_object: '-',
    yearly_amount: '',
    contract_start_date: '',
    contract_end_date: '',
    contract_renewal: '',
    payment_type: '-',
    insurance_paper_link: '',
    monthly_amount: '',
    description: '',
  };

  const { objects, loading, setLoading } = useAppContext();

  const [insurance, setInsurance] = useState(INITIAL_STATE);

  const changeHandler = (e) => {
    const { type, checked, name, value } = e.target;
    if (type === 'checkbox') {
      setInsurance({ ...insurance, [name]: checked ? 1 : 0 });
    } else {
      setInsurance({ ...insurance, [name]: value });
    }
  };

  const amountFieldChangeHandler = (e) => {
    const { name, value } = e.target;
    const dottedValue = value.replace(/,/g, '.');
    setInsurance({
      ...insurance,
      [name]: dottedValue,
    });
  };

  const formSubmit = () => {
    setLoading(true);
    saveInsurance(insurance)
      .then((res) => {
        if (res.status === 200) {
          setInsurance(INITIAL_STATE);
        }
        // TODO: Add notification!
      })
      .catch((err) => console.log(err));
    // TODO: Add notification!
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Insert Insurance</h1>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="insurance_name">Insurance Name</label>
          <input
            type="text"
            id="insurance_name"
            name="insurance_name"
            value={insurance.insurance_name}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="insurance_vendor">Vendor</label>
          <input
            type="text"
            id="insurance_vendor"
            name="insurance_vendor"
            value={insurance.insurance_vendor}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="insurance_number">Insurance Nr.</label>
          <input
            type="text"
            id="insurance_number"
            name="insurance_number"
            value={insurance.insurance_number}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="insurance_object">Object</label>
          <select
            id="insurance_object"
            name="insurance_object"
            value={insurance.insurance_object}
            onChange={changeHandler}
          >
            <option value="-" disabled>
              Please Select an Object
            </option>
            {objects.map((obj) => {
              return (
                <option key={obj.id} value={obj.id}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="yearly_amount">Monthly Amount</label>
          <input
            type="text"
            id="monthly_amount"
            name="monthly_amount"
            value={insurance.monthly_amount}
            onChange={amountFieldChangeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="yearly_amount">Yearly Amount</label>
          <input
            type="text"
            id="yearly_amount"
            name="yearly_amount"
            value={insurance.yearly_amount}
            onChange={amountFieldChangeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="contract_start_date">Start Date</label>
          <input
            type="date"
            id="contract_start_date"
            name="contract_start_date"
            value={insurance.contract_start_date}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="contract_end_date">End Date</label>
          <input
            type="date"
            id="contract_end_date"
            name="contract_end_date"
            value={insurance.contract_end_date}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="contract_renewal">Renewal Date</label>
          <input
            type="date"
            id="contract_renewal"
            name="contract_renewal"
            value={insurance.contract_renewal}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="payment_type">Payment Method</label>
          <select
            type="text"
            id="payment_type"
            name="payment_type"
            value={insurance.payment_type}
            onChange={amountFieldChangeHandler}
          >
            <option value={'-'} disabled={true}>
              Please select a type
            </option>
            <option value={'auto'}>Auto</option>
            <option value={'bank_transfer'}>Bank Transfer</option>
          </select>
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="expenseDesc">Description</label>
          <input
            type="text"
            id="expenseDesc"
            name="description"
            autoComplete="off"
            value={insurance.description}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <label htmlFor="insurance_paper_link">Insurance Paper Link</label>
          <input
            type="text"
            id="insurance_paper_link"
            name="insurance_paper_link"
            autoComplete="off"
            value={insurance.insurance_paper_link}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <button
          className={globalStyles.primaryButton}
          onClick={formSubmit}
          disabled={loading}
        >
          {loading && (
            <div className={globalStyles.spinner} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          Submit
        </button>
      </div>
    </div>
  );
};

export default InsertInsurance;

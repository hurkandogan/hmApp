import { useState, useEffect } from 'react';
import { useAppContext } from '../../context';
import styles from '../../styles/modules/Form.module.sass';
import globalStyles from '../../styles/Global.module.sass';
import saveInsurance from '../../service/insurances/saveInsurance';

// Components
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button';

const InsertInsurance = () => {
  const INITIAL_STATE = {
    insurance_name: '',
    insurance_vendor: '',
    insurance_number: '',
    insurance_object: '',
    yearly_amount: '',
    contract_start_date: '',
    contract_end_date: '',
    contract_renewal: '',
    payment_type: '',
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
          <TextField
            type="text"
            id="insurance_name"
            name="insurance_name"
            value={insurance.insurance_name}
            onChange={changeHandler}
            label={'Insurance Name'}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="insurance_vendor"
            name="insurance_vendor"
            value={insurance.insurance_vendor}
            onChange={changeHandler}
            label={'Vendor'}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="insurance_number"
            name="insurance_number"
            value={insurance.insurance_number}
            onChange={changeHandler}
            label="Insurance Nr."
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <FormControl>
            <InputLabel id="insurance_object">Choose a property</InputLabel>
            <Select
              id="insurance_object"
              name="insurance_object"
              value={insurance.insurance_object}
              label={'Choose a property'}
              onChange={changeHandler}
            >
              {objects.map((obj) => (
                <MenuItem key={obj.id} value={obj.id}>
                  {obj.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="monthly_amount"
            name="monthly_amount"
            value={insurance.monthly_amount}
            onChange={amountFieldChangeHandler}
            label="Monthly Amount"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="yearly_amount"
            name="yearly_amount"
            value={insurance.yearly_amount}
            onChange={amountFieldChangeHandler}
            label="Yearly Amount"
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="date"
            id="contract_start_date"
            name="contract_start_date"
            value={insurance.contract_start_date}
            onChange={changeHandler}
            label="Contract Start Date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="date"
            id="contract_end_date"
            name="contract_end_date"
            value={insurance.contract_end_date}
            onChange={changeHandler}
            label="Contract End Date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="date"
            id="contract_renewal"
            name="contract_renewal"
            value={insurance.contract_renewal}
            onChange={changeHandler}
            label="Contact Renewal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <FormControl>
            <InputLabel id="insurance_object">
              Choose a payment method
            </InputLabel>
            <Select
              type="text"
              id="payment_type"
              name="payment_type"
              value={insurance.payment_type}
              onChange={changeHandler}
              label="Choose a payment method"
            >
              <MenuItem value={'auto'}>Automatic</MenuItem>
              <MenuItem value={'bank_transfer'}>Bank Transfer</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="insurance_paper_link"
            name="insurance_paper_link"
            autoComplete="off"
            value={insurance.insurance_paper_link}
            onChange={changeHandler}
            label="Insurance Link"
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="expenseDesc"
            name="description"
            autoComplete="off"
            value={insurance.description}
            onChange={changeHandler}
            label="Description"
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <Button variant="contained" onClick={formSubmit} disabled={loading}>
          {loading ? (
            <div className={globalStyles.spinner} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            ''
          )}
          Submit
        </Button>
      </div>
    </div>
  );
};

export default InsertInsurance;

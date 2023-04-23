// Auth
import { getAuth } from 'firebase/auth';
// Styles
import styles from '../../styles/modules/Form.module.sass';
import globalStyles from '../../styles/Global.module.sass';
// Redux
import { useAppSelector } from '../../redux/hooks';
// Components
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import useForm from '../../hooks/useForm';

const InsertInsurance = () => {
  const auth = getAuth();
  const {
    formData,
    inputChangeHandler,
    selectBoxChangeHandler,
    handleSubmit,
    loading,
  } = useForm();
  const properties = useAppSelector((state) => state.properties.value.all);

  return (
    <div className={styles.container}>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="insurance_name"
            name="insurance_name"
            value={formData.insurance_name}
            onChange={inputChangeHandler}
            label={'Insurance Name'}
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="insurance_vendor"
            name="insurance_vendor"
            value={formData.insurance_vendor}
            onChange={inputChangeHandler}
            label={'Vendor'}
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="insurance_number"
            name="insurance_number"
            value={formData.insurance_number}
            onChange={inputChangeHandler}
            label="Insurance Nr."
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <FormControl>
            <InputLabel id="insurance_property" variant={'filled'}>
              Choose a property
            </InputLabel>
            <Select
              id="insurance_property"
              name="insurance_property"
              value={formData.insurance_property as string}
              label={'Choose a property'}
              onChange={selectBoxChangeHandler}
              size="medium"
              disabled={loading}
              variant="filled"
            >
              {properties.map((obj) => (
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
            value={formData.monthly_amount}
            onChange={inputChangeHandler}
            label="Monthly Amount"
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="yearly_amount"
            name="yearly_amount"
            value={formData.yearly_amount}
            onChange={inputChangeHandler}
            label="Yearly Amount"
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="date"
            id="contract_start_date"
            name="contract_start_date"
            value={formData.contract_start_date}
            onChange={inputChangeHandler}
            label="Contract Start Date"
            InputLabelProps={{
              shrink: true,
            }}
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="date"
            id="contract_end_date"
            name="contract_end_date"
            value={formData.contract_end_date}
            onChange={inputChangeHandler}
            label="Contract End Date"
            InputLabelProps={{
              shrink: true,
            }}
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="date"
            id="contract_renewal"
            name="contract_renewal"
            value={formData.contract_renewal}
            onChange={inputChangeHandler}
            label="Contact Renewal"
            InputLabelProps={{
              shrink: true,
            }}
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <div className={styles.formGroupContainer_inner}>
          <FormControl>
            <InputLabel id="insurance_object" variant={'filled'}>
              Choose a payment method
            </InputLabel>
            <Select
              type="text"
              id="payment_type"
              name="payment_type"
              value={formData.payment_type as string}
              onChange={selectBoxChangeHandler}
              size="medium"
              disabled={loading}
              variant="filled"
              notched={true}
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
            value={formData.insurance_paper_link}
            onChange={inputChangeHandler}
            label="Insurance Link"
            size="medium"
            disabled={loading}
            variant="filled"
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
            value={formData.description}
            onChange={inputChangeHandler}
            label="Description"
            size="medium"
            disabled={loading}
            variant="filled"
          />
        </div>
        <div className={styles.formGroupContainer_inner}>
          <TextField
            type="text"
            id="user"
            name="user"
            value={auth.currentUser?.displayName}
            size="small"
            disabled={true}
          />
        </div>
      </div>
      <div className={styles.formGroupContainer}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          style={{ background: '#1976d2' }}
        >
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

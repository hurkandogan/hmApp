import { FC } from 'react';
import styles from '../../styles/atoms/Checkbox.module.sass';

type Props = {
  checked: boolean;
  onChange(): void;
  name: string;
  id: string;
  label: string;
};

const Checkbox: FC<Props> = (props) => {
  const { label, name, id, checked, onChange } = props;
  return (
    <>
      <label className={styles.container}>
        <p>{label}</p>
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={checked}
          onChange={onChange}
          className={styles.checkbox}
        />
      </label>
    </>
  );
};

export default Checkbox;

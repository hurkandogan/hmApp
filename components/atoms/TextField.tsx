import { FC } from 'react';
import styles from '../../styles/atoms/TextField.module.sass';

type Props = {
  type: string;
  onChange?(): void;
  onBlur?(): void;
  value: string;
  placeholder?: string;
  name: string;
  id: string;
  className: string;
  label: string;
  autoComplete?: 'on' | 'off';
};

const TextField: FC<Props> = (props) => {
  const {
    type,
    onChange,
    onBlur,
    value,
    placeholder,
    name,
    id,
    className,
    label,
    autoComplete,
  } = props;
  return (
    <>
      <div className={styles.container}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          className={`${styles.input} ${className}`}
          autoComplete={autoComplete}
        />
      </div>
    </>
  );
};

export default TextField;

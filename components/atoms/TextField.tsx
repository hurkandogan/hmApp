import { FC } from 'react';
import styles from '../../styles/atoms/TextField.module.sass';

type Props = {
  type: string;
  size?: 'small' | 'regular';
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
    size,
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
          className={`${styles.input} ${
            size === 'small' ? styles.input_sm : styles.input_lg
          } ${className}`}
          autoComplete={autoComplete}
        />
      </div>
    </>
  );
};

export default TextField;

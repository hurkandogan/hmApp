import { FC } from 'react';
import styles from '../../styles/atoms/Button.module.sass';

interface Props {
  text: string;
  onClick(): void;
  className: string;
  disabled: boolean;
  type: 'primary' | 'secondary' | 'sidebar';
}

const Button: FC<Props> = (props) => {
  const { text, onClick, className, disabled, type } = props;
  return (
    <button
      onClick={onClick}
      className={`${type === 'primary' && styles.primaryButton} ${
        type === 'secondary' && styles.secondaryButton
      } ${type === 'sidebar' && styles.sidebarButton}
       ${className}`}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;

import { FC, useState } from 'react';
import styles from '../../styles/atoms/SelectBox.module.sass';

type Props = {
  name: string;
  id?: string;
  placeholder?: string;
  onChange(val: string, name: string): void;
  options: any[];
  label: string;
};

const SelectBox: FC<Props> = (props) => {
  const { name, id, placeholder, onChange, options, label } = props;
  const [value, setValue] = useState<string>('Select an option');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (): void => setIsOpen(!isOpen);

  return (
    <>
      <div className={styles.container} onClick={toggle}>
        <label>{label}</label>
        <div className={styles.header}>{value}</div>
        {isOpen && (
          <div className={styles.listContainer}>
            <ul className={styles.list}>
              {options.map((object) => (
                <li
                  key={object.id}
                  className={styles.listItem}
                  onClick={() => {
                    setValue(object.name);
                    onChange(object.id, name);
                  }}
                >
                  {object.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectBox;

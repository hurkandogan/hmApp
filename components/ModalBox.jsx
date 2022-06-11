import styles from '../styles/ModalBox.module.sass';
import { close_icon } from '../assets/icons';
const ModalBox = (props) => {
  const { children, active, headline, status, close } = props;
  if (active) {
    return (
      <div className={styles.container}>
        <div className={styles.container_inner_wrapper}>
          <div className={styles.header}>
            <h1>{headline}</h1>
            <span onClick={close}>{close_icon}</span>
          </div>
          <div className={styles.content}>
            <p>{children}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ModalBox;

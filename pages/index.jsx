import styles from '../styles/Home.module.sass';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <div className={styles.container_inner_title}>
          <h1>Property Name!</h1>
        </div>
        Burada sadece totaller olacak! Anasayfa burasi olacak!
      </div>
    </div>
  );
};

export default Home;

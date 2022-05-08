import { useState, useEffect } from 'react';
import styles from '../styles/Sidebar.module.sass';
import globalStyles from '../styles/Global.module.sass';
import getObjects from '../service/objects/getObjects';
import { useAppContext } from '../context/index';
import { house, expense } from '../assets/icons';
import Link from 'next/link';

const Sidebar = () => {
  const { objects, setObjects, setSelectedObject } = useAppContext();
  useEffect(() => {
    getObjects().then((res) => {
      console.log(res.data.objects);
      setObjects(res.data.objects);
    });
  }, []);

  const handleMenuClick = (object) => setSelectedObject(object);

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <img src="https://picsum.photos/50/50" />
        <p>
          Hürkan <br />
          Dogan
        </p>
      </div>
      <hr />
      <ul>
        <small>Insert:</small>
        <hr className={styles.sidebarMenuSeperator} />
        <li>
          <Link href="/insert_expense">
            <button className={globalStyles.sidebarButton}>
              {house} Insert Expense
            </button>
          </Link>
        </li>

        <small>Houses:</small>
        <hr className={styles.sidebarMenuSeperator} />
        {objects.map((object) => {
          if (object.isHouse && object.isMenu)
            return (
              <li key={object.id}>
                <Link href={'/expense/' + object.route}>
                  <button className={globalStyles.sidebarButton}>
                    {house} {object.name}
                  </button>
                </Link>
              </li>
            );
        })}
        <small>General Expenses:</small>
        <hr className={styles.sidebarMenuSeperator} />
        {objects.map((object) => {
          if (!object.isHouse && object.isMenu)
            return (
              <li key={object.id} onClick={() => handleMenuClick(object)}>
                <Link href={'/expense/' + object.route}>
                  <button className={globalStyles.sidebarButton}>
                    {expense} {object.name}
                  </button>
                </Link>
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

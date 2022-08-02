import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import getCategories from '../service/categories/getCategories';
import styles from '../styles/Sidebar.module.sass';
import globalStyles from '../styles/Global.module.sass';
import getObjects from '../service/objects/getObjects';
import { useAppContext } from '../context/index';
import { house, expense } from '../assets/icons';
import Link from 'next/link';

const Sidebar = () => {
  const { data: session } = useSession();
  const {
    setObjects,
    sidebarObjects,
    setSidebarObjects,
    setSelectedObject,
    setCategories,
  } = useAppContext();

  useEffect(() => {
    getObjects()
      .then((res) => {
        const { data } = res.data;
        if (data) setSidebarObjects(data);
        const allObjects = [];
        for (const object of data) {
          if (object.sub_objects && object.sub_objects.length > 0) {
            for (const sub_object of object.sub_objects)
              allObjects.push(sub_object);
          } else {
            allObjects.push(object);
          }
        }
        setObjects(allObjects);
      })
      .catch((err) => console.log(err));
    getCategories()
      .then((res) => {
        if (res.data.data) setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMenuClick = (object) => {
    setSelectedObject(object);
  };
  return (
    <div className={styles.container}>
      <div className={styles.user_info}>
        <div>
          <p className={styles.brand}>hugOS</p>
          <small>0.1.3 (BETA)</small>
          <a
            href="https://github.com/hurkandogan/hmapp/blob/develop/CHANGELOG.md"
            target="_blank"
            rel="noreferrer"
          >
            Change Log
          </a>
          <p>{session?.user.name ? session?.user.name : session?.user.email}</p>
        </div>
      </div>
      <ul>
        <small>Insert:</small>
        <hr className={styles.sidebarMenuSeperator} />
        <li>
          <Link href="/insert_expense" passHref>
            <button className={globalStyles.sidebarButton}>
              {house} Insert Expense
            </button>
          </Link>
        </li>

        {sidebarObjects.map((object) => {
          if (object.sub_objects) {
            return (
              <div>
                <small>{object.name}</small>
                <hr className={styles.sidebarMenuSeperator} />
                {object.sub_objects.map((sub_object) => {
                  return (
                    <li
                      key={sub_object.id}
                      onClick={() => handleMenuClick(sub_object)}
                    >
                      <Link href={'/expense/' + sub_object.route}>
                        <button className={globalStyles.sidebarButton}>
                          {house} {sub_object.name}
                        </button>
                      </Link>
                    </li>
                  );
                })}
              </div>
            );
          }
        })}
        <small>Houses:</small>
        <hr className={styles.sidebarMenuSeperator} />
        {sidebarObjects.map((object) => {
          if (object.isHouse && object.isMenu) {
            return (
              <li key={object.id} onClick={() => handleMenuClick(object)}>
                <Link href={'/expense/' + object.route}>
                  <button className={globalStyles.sidebarButton}>
                    {house} {object.name}
                  </button>
                </Link>
              </li>
            );
          }
        })}
        <small>General Expenses:</small>
        <hr className={styles.sidebarMenuSeperator} />
        {sidebarObjects.map((object) => {
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

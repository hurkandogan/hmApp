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
  const { objects, setObjects, setSelectedObject, setCategories } =
    useAppContext();

  useEffect(() => {
    getObjects()
      .then((res) => {
        if (res.data.data) setObjects(res.data.data);
      })
      .catch((err) => console.log(err));
    getCategories()
      .then((res) => {
        if (res.data.data) setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMenuClick = (object) => setSelectedObject(object);
  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <img src="https://picsum.photos/50/50" />
        <p>{session?.user.name ? session?.user.name : session?.user.email}</p>
      </div>
      <hr />
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

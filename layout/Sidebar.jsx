import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import getCategories from '../service/categories/getCategories';
import styles from '../styles/Sidebar.module.sass';
import globalStyles from '../styles/Global.module.sass';
import getObjects from '../service/objects/getObjects';
import { useAppContext } from '../context/index';
import {
  house,
  expense,
  dashboard_arrow,
  list_icon,
  dashboard_icon,
  column_icon,
} from '../assets/icons';
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

  const [openedGroup, setOpenedGroup] = useState([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMenuClick = (object) => {
    setSelectedObject(object);
  };

  const handleClapMenu = (id) => {
    console.log(id);
    if (openedGroup.includes(id)) {
      setOpenedGroup((prevState) => prevState.filter((el) => el !== id));
    } else {
      setOpenedGroup((prevState) => [...prevState, id]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.user_info}>
        <div>
          <p className={styles.brand}>hugOS</p>
          <span>0.1.4 (BETA)</span>
          <a
            href="https://github.com/hurkandogan/hmapp/blob/develop/CHANGELOG.md"
            target="_blank"
            rel="noreferrer"
          >
            Change Log
          </a>
          <p>{session?.user.name ? session?.user.name : session?.user.email}</p>
          <hr className={styles.sidebarMenuSeperator} />
        </div>
      </div>
      <ul>
        <div className={styles.sidebar_menu_header}>
          <Link href="/" passHref>
            <span className={styles.sidebar_menu_header_text}>
              <span className={styles.sidebar_menu_header_house_icon}>
                {dashboard_icon}
              </span>
              Dashboard
            </span>
          </Link>
        </div>
        <hr className={styles.sidebarMenuSeperator} />
        <div
          className={styles.sidebar_menu_header}
          onClick={() => handleClapMenu('general')}
        >
          <span className={styles.sidebar_menu_header_text}>
            <span className={styles.sidebar_menu_header_house_icon}>
              {list_icon}
            </span>
            General
          </span>
          <span
            className={
              openedGroup.includes('general')
                ? styles.menu_open
                : styles.menu_closed
            }
          >
            <span className={styles.sidebar_menu_header_arrow}>
              {dashboard_arrow}
            </span>
          </span>
        </div>
        <hr className={styles.sidebarMenuSeperator} />
        <div
          className={
            styles.sidebar_menu_objects +
            ' ' +
            (openedGroup.includes('general')
              ? styles.sidebar_menu_objects_open
              : '')
          }
        >
          <li>
            <Link href="/insert_expense" passHref>
              <button className={globalStyles.sidebarButton}>
                Add Expense
              </button>
            </Link>
          </li>
          <li>
            <Link href="/insert_insurance" passHref>
              <button className={globalStyles.sidebarButton}>
                Add Insurance
              </button>
            </Link>
          </li>
          <li>
            <Link href="/filtered_table/all_expenses" passHref>
              <button className={globalStyles.sidebarButton}>Expenses</button>
            </Link>
          </li>
          <li>
            <Link href="/filtered_table/insurances" passHref>
              <button className={globalStyles.sidebarButton}>Insurances</button>
            </Link>
          </li>
        </div>

        {sidebarObjects.map((object) => {
          if (object.sub_objects) {
            return (
              <div>
                <div
                  className={styles.sidebar_menu_header}
                  onClick={() => handleClapMenu(object.id)}
                >
                  <span className={styles.sidebar_menu_header_text}>
                    <span className={styles.sidebar_menu_header_house_icon}>
                      {house}
                    </span>
                    {object.name}
                  </span>
                  <span
                    className={
                      openedGroup.includes(object.id)
                        ? styles.menu_open
                        : styles.menu_closed
                    }
                  >
                    <span className={styles.sidebar_menu_header_arrow}>
                      {dashboard_arrow}
                    </span>
                  </span>
                </div>

                <hr className={styles.sidebarMenuSeperator} />
                <div
                  className={
                    styles.sidebar_menu_objects +
                    ' ' +
                    (openedGroup.includes(object.id)
                      ? styles.sidebar_menu_objects_open
                      : '')
                  }
                >
                  {object.sub_objects.map((sub_object) => {
                    return (
                      <li
                        key={sub_object.id}
                        onClick={() => handleMenuClick(sub_object)}
                      >
                        <Link href={'/expense/' + sub_object.route} passHref>
                          <button className={globalStyles.sidebarButton}>
                            {sub_object.name}
                          </button>
                        </Link>
                      </li>
                    );
                  })}
                </div>
              </div>
            );
          }
        })}
        <div
          className={styles.sidebar_menu_header}
          onClick={() => handleClapMenu('other')}
        >
          <span className={styles.sidebar_menu_header_text}>
            <span className={styles.sidebar_menu_header_house_icon}>
              {column_icon}
            </span>
            Other Expenses:
          </span>
          <span
            className={
              openedGroup.includes('other')
                ? styles.menu_open
                : styles.menu_closed
            }
          >
            <span className={styles.sidebar_menu_header_arrow}>
              {dashboard_arrow}
            </span>
          </span>
        </div>
        <hr className={styles.sidebarMenuSeperator} />
        <div
          className={
            styles.sidebar_menu_objects +
            ' ' +
            (openedGroup.includes('other')
              ? styles.sidebar_menu_objects_open
              : '')
          }
        >
          {sidebarObjects.map((object) => {
            if (object.isMenu && !object.parent_object) {
              return (
                <li key={object.id} onClick={() => handleMenuClick(object)}>
                  <Link href={'/expense/' + object.route} passHref>
                    <button className={globalStyles.sidebarButton}>
                      {object.name}
                    </button>
                  </Link>
                </li>
              );
            }
          })}
        </div>
        <div
          className={styles.sidebar_menu_header}
          onClick={() => handleClapMenu('rügen')}
        >
          <span className={styles.sidebar_menu_header_text}>
            <span className={styles.sidebar_menu_header_house_icon}>
              {house}
            </span>
            Rügen:
          </span>
          <span
            className={
              openedGroup.includes('rügen')
                ? styles.menu_open
                : styles.menu_closed
            }
          >
            <span className={styles.sidebar_menu_header_arrow}>
              {dashboard_arrow}
            </span>
          </span>
        </div>
        <hr className={styles.sidebarMenuSeperator} />
        <div
          className={
            styles.sidebar_menu_objects +
            ' ' +
            (openedGroup.includes('rügen')
              ? styles.sidebar_menu_objects_open
              : '')
          }
        >
          <li>
            <a
              className={styles.external_link}
              href="https://www.dropbox.com/s/hqwnt82adia3p2t/R%C3%BCgen%202021.xlsx?dl=0"
              target="_blank"
              rel="noreferrer"
            >
              <button className={globalStyles.sidebarButton}>Rügen 2021</button>
            </a>
          </li>

          <li>
            <a
              className={styles.external_link}
              href="https://www.dropbox.com/s/rynhpfo6tetvp4u/R%C3%BCgen%202022.xlsx?dl=0"
              target="_blank"
              rel="noreferrer"
            >
              <button className={globalStyles.sidebarButton}>Rügen 2022</button>
            </a>
          </li>

          <li>
            <a
              className={styles.external_link}
              href="https://www.dropbox.com/s/x5nd5nl46ka7hbs/r%C3%BCgen%202023.xlsx?dl=0"
              target="_blank"
              rel="noreferrer"
            >
              <button className={globalStyles.sidebarButton}>Rügen 2023</button>
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;

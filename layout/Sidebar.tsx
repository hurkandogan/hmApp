import { FC, useState } from 'react';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Sidebar.module.sass';
import globalStyles from '../styles/Global.module.sass';
import {
  house,
  dashboard_arrow,
  list_icon,
  dashboard_icon,
  column_icon,
} from '../assets/icons';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setFormType } from '../redux/offCanvasHandler.slice';
import { useAppContext } from '../context';
import { Property } from '../types/Property';

const Sidebar: FC = () => {
  const auth = getAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentRoute = router.asPath;
  const properties = useAppSelector((state) => state.properties.value.grouped);

  const [openedGroup, setOpenedGroup] = useState<string[]>([]);

  const { setSelectedObject } = useAppContext();

  const handleMenuClick = (object: Property) => {
    setSelectedObject(object);
  };

  const handleClapMenu = (id: string) => {
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
          <span>hm - 0.2.2A</span>
          <a
            href="https://github.com/hurkandogan/hmapp/blob/develop/CHANGELOG.md"
            target="_blank"
            rel="noreferrer"
          >
            Change Log
          </a>
          <hr className={styles.sidebarMenuSeperator} />
          <p className={styles.brand}>
            {auth.currentUser?.displayName ? auth.currentUser?.displayName : ''}
          </p>
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
            Add
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
            <button
              onClick={() => dispatch(setFormType('new_expense'))}
              className={`${globalStyles.sidebarButton} ${
                router.asPath === '/forms/insert_expense' && globalStyles.active
              }`}
            >
              Add Expense
            </button>
          </li>
          <li>
            <button
              onClick={() => dispatch(setFormType('new_insurance'))}
              className={`${globalStyles.sidebarButton} ${
                currentRoute === '/forms/insert_insurance' &&
                globalStyles.active
              }`}
            >
              Add Insurance
            </button>
          </li>
          {/* <li>
            <Link href="/filtered_table/expenses" passHref>
              <button
                className={`${globalStyles.sidebarButton} ${
                  currentRoute === '/filtered_table/expenses' &&
                  globalStyles.active
                }`}
              >
                Expenses
              </button>
            </Link>
          </li>
          <li>
            <Link href="/filtered_table/insurances" passHref>
              <button
                className={`${globalStyles.sidebarButton} ${
                  currentRoute === '/filtered_table/insurances' &&
                  globalStyles.active
                }`}
              >
                Insurances
              </button>
            </Link>
          </li> */}
        </div>

        {properties.map((el) => {
          if (el.sub_property) {
            return (
              <div key={el.id}>
                <div
                  className={styles.sidebar_menu_header}
                  onClick={() => handleClapMenu(el.id)}
                >
                  <span className={styles.sidebar_menu_header_text}>
                    <span className={styles.sidebar_menu_header_house_icon}>
                      {house}
                    </span>
                    {el.name}
                  </span>
                  <span
                    className={
                      openedGroup.includes(el.id)
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
                    (openedGroup.includes(el.id)
                      ? styles.sidebar_menu_objects_open
                      : '')
                  }
                >
                  {el.sub_property.map((sub: Property) => {
                    return (
                      <li key={sub.id} onClick={() => handleMenuClick(sub)}>
                        <Link href={'/expense/' + sub.id} passHref>
                          <button className={globalStyles.sidebarButton}>
                            {sub.name}
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
          {properties.map((el) => {
            if (!el.sub_property) {
              return (
                <li key={el.id} onClick={() => handleMenuClick(el)}>
                  <Link href={'/expense/' + el.id} passHref>
                    <button className={globalStyles.sidebarButton}>
                      {el.name}
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

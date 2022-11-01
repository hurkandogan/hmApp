import styles from '../../styles/filtered_table/filter_container.module.sass';
import Filters from './Filters';

const FilterContainer = (props) => {
  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.placeHolder}
          onClick={() => props.setFilterOpen(false)}
        ></div>
        <div
          className={`${styles.offCanvasSidebarContainer} ${
            props.isOpen ? '' : styles.isOpen
          }`}
        >
          <Filters />
        </div>
      </div>
    </>
  );
};

export default FilterContainer;

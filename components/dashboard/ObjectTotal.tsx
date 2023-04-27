import Link from 'next/link';
import styles from '../../styles/dashboard/ObjectTotal.module.sass';
import { Property } from '../../types/Property';
import { FC, useEffect, useState } from 'react';

interface Props {
  property: Property;
}

const ObjectTotal: FC<Props> = (props) => {
  const { property } = props;
  const [propertyTotal, setPropertyTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    property.totals?.map((el) => (total += el.total));
    setPropertyTotal(total);
  }, [property]);

  return (
    <div className={styles.container}>
      <div className={styles.container_inner}>
        <Link href={'/expense/' + property?.id} passHref>
          <div className={styles.header}>
            <span>{property.name}</span>{' '}
            <span>{propertyTotal.toLocaleString()} €</span>
          </div>
        </Link>
        <div className={styles.container_inner_content}>
          {property.totals?.map((el, index) => {
            if (el.name !== 'Insurances') {
              return (
                <div
                  key={index}
                  className={styles.container_inner_content_item}
                >
                  <div className={styles.container_inner_content_item_title}>
                    {el.name}
                  </div>
                  <div className={styles.container_inner_content_item_value}>
                    {el.total.toLocaleString()} €
                  </div>
                </div>
              );
            } else if (el.name === 'Insurances') {
              return (
                property.hasInsurances && (
                  <div
                    key={index}
                    className={styles.container_inner_content_item}
                  >
                    <div className={styles.container_inner_content_item_title}>
                      {el.name}
                    </div>
                    <div className={styles.container_inner_content_item_value}>
                      {el.total.toLocaleString()} €
                    </div>
                  </div>
                )
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ObjectTotal;

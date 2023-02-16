import styles from './OrderDetails.module.css';
import { useContext } from 'react';
import { NumberOfOrderContext } from '../../context/Context';
const classNames = require('classnames');


const OrderDetails = () => {
  const number = useContext(NumberOfOrderContext);
  return (
    <div className={styles.orderCard}>
      <p
        className={classNames(
          'text text_type_digits-medium',
          styles.title,
          'mb-8',
        )}
      >
        {number}
      </p>
      <p
        className={classNames(
          'text text_type_main-default',
          styles.subtitle,
          'mb-15',
        )}
      >
        идентификатор заказа
      </p>
      <div className={classNames(styles.image, 'mb-15')}></div>
      <p
        className={classNames(
          'text text_type_main-small',
          'mb-2',
          styles.startText,
        )}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={classNames(
          'text text_type_main-small text_color_inactive',
          'mb-30',
          styles.startText,
        )}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;

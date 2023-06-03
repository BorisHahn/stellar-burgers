import styles from './OrderDetails.module.css';
import { useAppSelector } from '../../utils/hooks/ReduxTypedHook';
import { FC } from 'react';

const classNames = require('classnames');

const OrderDetails:FC = () => {
  const { order } = useAppSelector((state) => state.ingredients);

  return (
    <div className={styles.orderCard}>
      <p
        className={classNames(
          'text text_type_digits-medium',
          styles.title,
          'mb-8',
        )}
        data-test={"order-number"}
      >
        {order?.order?.number}
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

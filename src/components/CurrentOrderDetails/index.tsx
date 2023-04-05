import styles from './CurrentOrderDetails.module.css';
import classNames from 'classnames';
import { FC, useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '../../utils/hooks/ReduxTypedHook';
import { IOrderItem } from '../../types/ordersTypes';
import { useParams } from 'react-router-dom';
const CurrentOrderDetails: FC = () => {
  const { orderDetails, orders } = useAppSelector((state) => state.orders);
  const [order, setOrder] = useState<IOrderItem | null>(null);
  const params = useParams();

  const getCurrentOrder = () => {
    if (orderDetails != null) {
      setOrder(orderDetails);
    } else {
      const currentOrder = orders.filter(
        (order) => order.number === params.number,
      );
      setOrder(currentOrder[0]);
    }
  };

  const getStatus = useCallback(
    (status: string | undefined): string => {
      if (status === 'created') {
        return 'Создан';
      } else if (status === 'pending') {
        return 'Готовится';
      } else {
        return 'Выполнен';
      }
    },
    [order?.status],
  );

  useEffect(() => {
    getCurrentOrder();
  }, [orderDetails, params]);

  return (
    <div className={styles.wrapper}>
      <p
        className={classNames(
          'text text_type_digits-default',
          styles.id,
          'mb-10',
        )}
      >
        #0{order?.number}
      </p>
      <div className={styles.info}>
        <p className={classNames('text text_type_main-medium', styles.name)}>
          Наименование бургера
        </p>
        <p
          className={classNames(
            'text text_type_main-small',
            order?.status === 'done' && styles.status,
          )}
        >
          {getStatus(order?.status)}
        </p>
      </div>
      <p className={classNames('text text_type_main-medium', styles.compound, 'mb-6')}>
          Состав:
        </p>
    </div>
  );
};

export default CurrentOrderDetails;

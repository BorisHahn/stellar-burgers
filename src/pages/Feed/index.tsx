import styles from './Feed.module.css';
import { orders } from '../../utils/const';
import OrderCard from '../../components/OrdersCard';
import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../utils/hooks/ReduxTypedHook';
import { connect, disconnect } from '../../redux/actions/wsActions';
import { ALL_ORDERS_URL } from '../../utils/const';
import classNames from 'classnames';
const Feed: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect(ALL_ORDERS_URL));
    return () => {
      dispatch(disconnect());
    };
  },[]);

  const allOrders = orders.orders.map((card, index) => {
    return <OrderCard key={index} item={card} />;
  });

  const doneOrders = orders.orders
    .filter((order) => order.status === 'done')
    .map((item, index) => {
      return (
        <li className={styles.doneItem} key={index}>
          <p className='text text_type_digits-default'>0{item.number}</p>
        </li>
      );
    });
  const inWorkOrders = orders.orders
    .filter((order) => order.status === 'pending')
    .map((item, index) => {
      return (
        <li className={styles.doneItem} key={index}>
          <p className='text text_type_digits-default'>0{item.number}</p>
        </li>
      );
    });
  return (
    <section className={styles.feed}>
      <h2 className={classNames('text text_type_main-large', styles.title)}>
        Лента заказов
      </h2>
      <div className={styles.wrapper}>
        <div className={styles.orders}>{allOrders}</div>
        <div className={styles.stats}>
          <div className={classNames(styles.orderBoard, 'mb-15')}>
            <div className={styles.done}>
              <h3
                className={classNames(
                  'text text_type_main-medium',
                  styles.doneTitle,
                )}
              >
                Готовы:
              </h3>
              <ul className={styles.doneList}>{doneOrders}</ul>
            </div>
            <div className={styles.inWork}>
              <h3
                className={classNames(
                  'text text_type_main-medium',
                  styles.inWorkTitle,
                )}
              >
                В работе:
              </h3>
              <ul className={styles.inWorkList}>{inWorkOrders}</ul>
            </div>
          </div>
          <div className={classNames(styles.completedAllTime, 'mb-15')}>
            <h3
              className={classNames(
                'text text_type_main-medium',
                styles.completedAllTimeTitle,
              )}
            >
              Выполнено за все время:
            </h3>
            <p
              className={classNames(
                styles.count,
                'text text_type_digits-large',
              )}
            >
              {orders.total}
            </p>
          </div>
          <div className={classNames(styles.completedToday)}>
            <h3
              className={classNames(
                'text text_type_main-medium',
                styles.completedToday,
              )}
            >
              Выполнено за сегодня:
            </h3>
            <p
              className={classNames(
                styles.count,
                'text text_type_digits-large',
              )}
            >
              {orders.totalToday}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;

import styles from './Feed.module.css';
import Spinner from 'react-bootstrap/Spinner';
import OrderCard from '../../components/OrdersCard';
import { useLocation } from 'react-router-dom';
import { FC, useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/ReduxTypedHook';
import { connect, disconnect } from '../../redux/actions/wsActions';
import { ALL_ORDERS_URL } from '../../utils/const';
import classNames from 'classnames';
const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loadingStatus } = useAppSelector((state) => state.orders);
  useEffect(() => {
    dispatch(connect(ALL_ORDERS_URL));
    return () => {
      dispatch(disconnect());
    };
  }, []);

  const allOrders = orders?.orders.map((card, index) => {
    return <OrderCard key={index} item={card} />;
  });

  const doneOrders = orders?.orders
    .filter((order) => order.status === 'done')
    .slice(0, 15)
    .map((item, index) => {
      return (
        <li className={styles.doneItem} key={index}>
          <p className='text text_type_digits-default'>0{item.number}</p>
        </li>
      );
    });
  const inWorkOrders = orders?.orders
    .filter((order) => order.status === 'pending')
    .slice(0, 15)
    .map((item, index) => {
      return (
        <li className={styles.doneItem} key={index}>
          <p
            className={classNames(
              'text text_type_digits-default',
              styles.inWorkText,
            )}
          >
            0{item.number}
          </p>
        </li>
      );
    });
  const render = loadingStatus ? (
    <Spinner
      className={styles.spinner}
      as='span'
      animation='border'
      role='status'
      aria-hidden='true'
    />
  ) : (
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
              {orders?.total}
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
              {orders?.totalToday}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
  return <>{render}</>;
};

export default Feed;

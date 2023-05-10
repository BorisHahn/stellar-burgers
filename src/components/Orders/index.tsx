import styles from './Orders.module.css';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation } from 'react-router-dom';
import OrderCard from '../OrdersCard';
import { FC, useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/ReduxTypedHook';
import { connect, disconnect } from '../../redux/actions/wsActions';
import { ORDERS_URL } from '../../utils/const';

const Orders: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const match = location.pathname.startsWith('/profile/orders');
  const { orders, loadingStatus } = useAppSelector((state) => state.orders);
  useEffect(() => {
    if (match) {
      const token = localStorage.getItem('accessToken')?.split(' ')[1];
      dispatch(connect(`${ORDERS_URL}?token=${token}`));
    }
    return () => {
      if (match) {
        dispatch(disconnect());
      }
    };
  }, []);

  const myOrders = orders?.orders.map((card, index) => {
    return <OrderCard key={index} item={card} />;
  });
  return (
    <section className={styles.wrapper}>
      {loadingStatus ? (
        <Spinner
          className={styles.spinner}
          as='span'
          animation='border'
          role='status'
          aria-hidden='true'
        />
      ) : (
        myOrders
      )}
    </section>
  );
};

export default Orders;

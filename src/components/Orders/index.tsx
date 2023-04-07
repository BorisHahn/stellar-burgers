import styles from './Orders.module.css';
import { orders } from '../../utils/const';
import OrderCard from '../OrdersCard';
import { FC } from 'react';

const Orders: FC = () => {
  const myOrders = orders.orders.map((card, index) => {
    return (
      <OrderCard key={index} item={card} />
    )
  })
  return (
    <section className={styles.wrapper}>
      {myOrders}
    </section>
  );
};

export default Orders;

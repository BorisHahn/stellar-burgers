import styles from './NotFound.module.css';
import { FC } from 'react';
const NotFound: FC = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.wrapper}></div>
    </section>
  );
};

export default NotFound;

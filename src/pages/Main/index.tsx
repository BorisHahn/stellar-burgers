import styles from './Main.module.css';
import { FC } from 'react';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';

interface IMainProps {
  handleOpenModal: (card: object) => void;
}

const Main: FC<IMainProps> = ({ handleOpenModal }) => {
  return (
    <section className={styles.main}>
      <BurgerIngredients handleOpenModal={handleOpenModal} />
      <BurgerConstructor />
    </section>
  );
};

export default Main;

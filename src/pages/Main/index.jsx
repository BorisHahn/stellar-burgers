import styles from './Main.module.css';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';

const Main = ({ handleOpenModal }) => {
  return (
    <section className={styles.main}>
      <BurgerIngredients handleOpenModal={handleOpenModal} />
      <BurgerConstructor />
    </section>
  );
};

export default Main;

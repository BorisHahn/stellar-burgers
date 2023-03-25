import styles from './Ingredient.module.css';
import { FC, ReactNode } from 'react';
const classNames = require('classnames');

interface IIngredientPageProps {
  children?: ReactNode;
}

const IngredientPage: FC<IIngredientPageProps> = ({ children }) => {
  return (
    <section className={styles.wrapper}>
      <h1 className={classNames('text text_type_main-medium', styles.text)}>
        Детали ингредиента
      </h1>
      {children}
    </section>
  );
};

export default IngredientPage;

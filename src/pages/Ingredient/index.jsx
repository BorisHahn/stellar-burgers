import styles from './Ingredient.module.css';
const classNames = require('classnames');
const IngredientPage = ({ children }) => {
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

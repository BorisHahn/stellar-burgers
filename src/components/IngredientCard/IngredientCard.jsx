import styles from './IngredientCard.module.css';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/types/ingredientsTypes';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const classNames = require('classnames');

const IngridientCard = ({ card }) => {
  const { name, price, image_large } = card;
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image_large}></img>
      </div>
      <span className={styles.price}>
        <p className='text text_type_main-medium'>{price}</p>
        <CurrencyIcon
          className='constructor__footer_price-icon'
          type='primary'
        />
      </span>
      <p className={classNames('text text_type_main-default', styles.name)}>
        {name}
      </p>
    </div>
  );
};

IngridientCard.propTypes = {
  card: ingredientsPropTypes.isRequired,
};

export default IngridientCard;

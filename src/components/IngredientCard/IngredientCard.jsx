import styles from './IngredientCard.module.css';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/types/ingredientsTypes';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
const classNames = require('classnames');

const IngridientCard = ({ card, handleOpen }) => {
  const { name, price, image_large } = card;

  const { constructorElements } = useSelector((state) => state.ingredients);
  const counter = constructorElements.filter(
    (item) => item._id === card._id,
  ).length;

  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: card,
  });

  const onClick = () => {
    handleOpen(card);
  };

  return (
    <div className={styles.card} onClick={onClick} ref={dragRef}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={image_large} alt={name}></img>
      </div>
      <span
        className={classNames(
          styles.counter,
          counter > 0 && styles.counterVisible,
        )}
      >
        <Counter count={counter} size='default' extraClass='m-1' />
      </span>
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
  handleOpen: PropTypes.func,
};

export default IngridientCard;

import styles from './IngredientCard.module.css';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/types/ingredientsTypes';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useMemo, useState, useRef } from 'react';
const classNames = require('classnames');

const IngridientCard = ({ card, handleOpen }) => {
  const [inOrder, setInOrder] = useState(false);

  const { constructorElements } = useSelector((state) => state.ingredients);
  let counter = constructorElements.filter(
    (item) => item._id === card._id,
  ).length;
  
  // const addCount = useMemo(() => {
  //   constructorElements.forEach((item) => {
  //     if (item === card) {
  //       if (item.type === 'bun') {
  //         counter = counter + 2;
  //       } else {
  //         counter = counter + 1;
  //       }
  //     }
  //   });
  // }, [constructorElements]);

  const { name, price, image_large } = card;
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
      {/* <Counter count={counter} size='default' extraClass='m-1' /> */}
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

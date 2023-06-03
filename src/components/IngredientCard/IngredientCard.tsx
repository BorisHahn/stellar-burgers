import styles from './IngredientCard.module.css';
import { FC } from 'react';
import { TIngredientCard } from '../../types/ingredientsTypes';
import { useLocation, Link } from 'react-router-dom';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useAppSelector } from '../../utils/hooks/ReduxTypedHook';
const classNames = require('classnames');

interface IIngridientCardProps {
  card: TIngredientCard;
  handleOpen: (card: TIngredientCard) => void;
}

const IngridientCard: FC<IIngridientCardProps> = ({ card, handleOpen }) => {
  const location = useLocation();

  const { name, price, image_large } = card;

  const { constructorElements } = useAppSelector((state) => state.ingredients);
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
    <Link
      key={card._id}
      to={`/ingredients/${card._id}`}
      state={{ background: location }}
      className={styles.link}
      data-test={name}
    >
      <div className={styles.card} onClick={onClick} ref={dragRef}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={image_large} alt={name}></img>
        </div>
        <span
          className={classNames(
            styles.counter,
            counter > 0 && styles.counterVisible,
          )}
          data-test={'counter'}
        >
          <Counter count={counter} size='default' extraClass='m-1' />
        </span>
        <span className={styles.price}>
          <p className='text text_type_main-medium'>{price}</p>
          <CurrencyIcon type='primary' />
        </span>
        <p className={classNames('text text_type_main-default', styles.name)}>
          {name}
        </p>
      </div>
    </Link>
  );
};

export default IngridientCard;

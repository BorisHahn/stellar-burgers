import style from './FillingCard.module.css';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/types/ingredientsTypes';
import { useDrag, useDrop } from 'react-dnd';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { removeConstructorElements } from '../../redux/slices/ingredientsSlice';
const classNames = require('classnames');

const FillingCard = ({ item, index }) => {
  const { constructorElements } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: 'filling',
    hover(item, monitor) {},
  });

  const [, dragRef] = useDrag({
    type: 'filling',
    item: { item, index },
  });

  return (
    <div
      className={classNames(style.card, 'mb-4 mr-2')}
      draggable={true}
      ref={dragRef}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() =>
          dispatch(removeConstructorElements(constructorElements.indexOf(item)))
        }
      />
    </div>
  );
};

FillingCard.propTypes = {
  item: ingredientsPropTypes.isRequired,
  index: PropTypes.number,
};

export default FillingCard;

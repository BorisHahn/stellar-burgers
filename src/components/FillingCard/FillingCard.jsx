import style from './FillingCard.module.css';
import { useRef } from 'react';
import { bun } from '../../utils/const';
import { useDrag, useDrop } from 'react-dnd';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeConstructorElements,
  replaceConstructorElements,
} from '../../redux/slices/ingredientsSlice';
const classNames = require('classnames');

const FillingCard = ({ item, index }) => {
  const ref = useRef(null);
  const { constructorElements } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  const [{ handlerId }, drop] = useDrop({
    accept: 'filling',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(replaceConstructorElements({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'filling',
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  if (item.type !== bun) drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();

  return (
    <div
      className={classNames(style.card, 'mb-4 mr-2')}
      draggable={true}
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
      data-handler-id={handlerId}
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

export default FillingCard;

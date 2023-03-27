import style from './FillingCard.module.css';
import { useRef, FC } from 'react';
import { bun } from '../../utils/const';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { TIngredientCard } from '../../types/ingredientsTypes';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/ReduxTypedHook';
import {
  removeConstructorElements,
  replaceConstructorElements,
} from '../../redux/slices/ingredientsSlice';
const classNames = require('classnames');

interface IFillingCardProps {
  item: TIngredientCard;
  index: number;
}

const FillingCard: FC<IFillingCardProps> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { constructorElements } = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();

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
      const dragIndex = (item as TIngredientCard).index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(replaceConstructorElements({ dragIndex, hoverIndex }));
      (item as TIngredientCard).index = hoverIndex;
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

  return (
    <div
      className={classNames(style.card, 'mb-4 mr-2')}
      draggable={true}
      ref={ref}
      style={{ opacity }}
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

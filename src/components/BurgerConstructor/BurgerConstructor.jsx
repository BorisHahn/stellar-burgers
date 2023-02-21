import style from './BurgerConstructor.module.css';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  addConstructorElements,
  makeAnOrder,
} from '../../redux/slices/ingredientsSlice';
import FillingCard from '../FillingCard/FillingCard';
const classNames = require('classnames');

const BurgerConstructor = ({ handleOpenOrderModal }) => {
  const { constructorElements } = useSelector((state) => state.ingredients);

  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(card) {
      dispatch(addConstructorElements(card));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleOpenCard = () => {
    const order = constructorElements.map((item) => item._id);
    dispatch(
      makeAnOrder({
        ingredients: [...order],
      }),
    ).then(() => handleOpenOrderModal());
  };

  const totalPrice = () => {
    return constructorElements
      .filter((item) => item != null)
      .reduce((acc, item) => {
        return acc + item.price;
      }, 0);
  };

  return (
    <section className={style.constructor}>
      <div
        className={classNames(
          'pl-4 mt-25 mb-10',
          style.wrapper,
          isHover ? style.wrapperHide : '',
        )}
        style={{ minHeight: '664px' }}
        ref={dropTarget}
      >
        {constructorElements.length > 0 ? (
          <>
            {constructorElements
              .filter((item, index) => item != null && index === 0)
              .map((item, index) => {
                return (
                  <div
                    className={classNames(style.card, style.top)}
                    key={index}
                  >
                    <ConstructorElement
                      className='constructor__card_top'
                      type='top'
                      isLocked={true}
                      text={item.name + ' (верх)'}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </div>
                );
              })}
            <div className={classNames(style.cards, 'mb-4 mt-4')}>
              {constructorElements
                .filter((item) => item != null && item.type !== 'bun')
                .map((item, index) => {
                  return (
                    <FillingCard
                      item={item}
                      key={nanoid()}
                      index={constructorElements.indexOf(item)}
                    />
                  );
                })}
            </div>
            {constructorElements
              .filter(
                (item, index, arr) => item != null && index === arr.length - 1,
              )
              .map((item, index) => {
                return (
                  <div
                    className={classNames(style.card, style.bottom)}
                    key={index}
                  >
                    <ConstructorElement
                      className='constructor__card_top'
                      type='bottom'
                      isLocked={true}
                      text={item.name + ' (низ)'}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </div>
                );
              })}
          </>
        ) : (
          <p className={classNames(style.plug, 'text text_type_main-large')}>
            Давайте соберем бургер! Начнем с булки!
          </p>
        )}
      </div>

      <div className={classNames(style.footer, 'mr-4')}>
        <span className={style.price}>
          <p className='text text_type_main-medium'>{totalPrice()}</p>
          <CurrencyIcon
            className='constructor__footer_price-icon'
            type='primary'
          />
        </span>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={handleOpenCard}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  handleOpenOrderModal: PropTypes.func,
  makeAnOrder: PropTypes.func,
  setOrder: PropTypes.func,
};

export default BurgerConstructor;

import style from './BurgerConstructor.module.css';
import { useContext, useEffect } from 'react';
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  addConstructorElements,
  removeConstructorElements,
  makeAnOrder,
} from '../../redux/slices/ingredientsSlice';
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
    handleOpenOrderModal();
    dispatch(makeAnOrder());
  };

  // useEffect(() => {
  //   createOrder();
  // }, [allIngredients]);

  // const createOrder = () => {
  //   let copyIngredients = Object.assign([]);
  //   if (allIngredients.length === 0) return;
  //   const buns = allIngredients.filter((ingr) => ingr.type == 'bun');
  //   copyIngredients.unshift(buns[1]);
  //   copyIngredients.push(buns[1]);
  //   const filtred = allIngredients.filter((ingr) => ingr.type !== 'bun');
  //   copyIngredients.splice(1, 0, ...filtred);
  //   setOrder([...copyIngredients]);
  // };

  const totalPrice = () => {
    return constructorElements
      .filter((item) => item != null)
      .reduce((acc, item) => {
        return acc + item.price;
      }, 0);
  };

  return (
    <section className='constructor'>
      <div
        className={classNames('pl-4 mt-25 mb-10', style.wrapper, isHover ? style.wrapperHide : '')}
        style={{ minHeight: '664px' }}
        ref={dropTarget}
      >
        {constructorElements
          .filter((item, index) => item != null && index === 0)
          .map((item, index) => {
            return (
              <div className={classNames(style.card, style.top)} key={index}>
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
                <div
                  className={classNames(style.card, 'mb-4 mr-2')}
                  key={index}
                >
                  <DragIcon type='primary' />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() =>
                      dispatch(
                        removeConstructorElements(
                          constructorElements.indexOf(item),
                        ),
                      )
                    }
                  />
                </div>
              );
            })}
        </div>
        {constructorElements
          .filter(
            (item, index, arr) => item != null && index === arr.length - 1,
          )
          .map((item, index) => {
            return (
              <div className={classNames(style.card, style.bottom)} key={index}>
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

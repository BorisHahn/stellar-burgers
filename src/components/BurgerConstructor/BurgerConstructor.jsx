import style from './BurgerConstructor.module.css';
import { useMemo, useState, useContext, useEffect } from 'react';
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import bunImage from '../../utils/const';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/types/ingredientsTypes';
import { Context, OrderContext } from '../../context/Context';
const classNames = require('classnames');

const BurgerConstructor = ({ handleOpenOrderModal, setOrder, makeAnOrder }) => {
  const ingredients = useContext(Context);
  const order = useContext(OrderContext);
  const handleOpenCard = () => {
    handleOpenOrderModal();
    makeAnOrder();
  };

  useEffect(() => {
    createOrder();
  }, [ingredients]);

  const createOrder = () => {
    let copyIngredients = Object.assign([]);
    if (ingredients.length === 0) return;
    const buns = ingredients.filter((ingr) => ingr.type == 'bun');
    copyIngredients.unshift(buns[1]);
    copyIngredients.push(buns[1]);
    const filtred = ingredients.filter((ingr) => ingr.type !== 'bun');
    copyIngredients.splice(1, 0, ...filtred);
    setOrder([...copyIngredients]);
  };

  const renderOrder = order
    .filter((item) => item != null)
    .map((item, index) => {
      if (index === 0) {
        return (
          <div className={classNames(style.card)} key={index}>
            <ConstructorElement
              className='constructor__card_top'
              type='top'
              isLocked={true}
              text={item.name + '(верх)'}
              price={item.price}
              thumbnail={bunImage}
            />
          </div>
        );
      } else if (index === order.length - 1) {
        return (
          <div className={classNames(style.card)} key={index}>
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={item.name + '(низ)'}
              price={item.price}
              thumbnail={bunImage}
            />
          </div>
        );
      } else {
        return (
          <div className={classNames(style.card, 'mb-4 mr-2')} key={index}>
            <DragIcon type='primary' />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        );
      }
    });

  const totalPrice = () => {
    return order
      .filter((item) => item != null)
      .reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <section className='constructor'>
      <div className='ml-4 mt-25 mb-10'>
        
        {renderOrder}</div>
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
};

export default BurgerConstructor;

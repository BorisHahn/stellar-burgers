import './BurgerConstructor.css';
import {
  DragIcon,
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import bunImage from '../../utils/const';
const classNames = require('classnames');

const BurgerConstructor = ({ ingredients }) => {
  const ingredientsCards = ingredients.map((item, index) => {
    const { name, price, image } = item;
    return (
      <div className={classNames('constructor__card', 'mb-4 mr-2')} key={index}>
        <DragIcon type='primary' />
        <ConstructorElement text={name} price={price} thumbnail={image} />
      </div>
    );
  });
  return (
    <section className='constructor'>
      <div className='ml-4 mt-25 mb-10'>
        <div className={classNames('constructor__card', 'mb-4 mr-4')}>
          <ConstructorElement
            className='constructor__card_top'
            type='top'
            isLocked={true}
            text='Краторная булка N-200i (верх)'
            price={200}
            thumbnail={bunImage}
          />
        </div>
        <div className={classNames('constructor__cards', 'mb-4 mt-4')}>
          {ingredientsCards}
        </div>
        <div className={classNames('constructor__card', 'mb-4 mr-4')}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text='Краторная булка N-200i (низ)'
            price={200}
            thumbnail={bunImage}
          />
        </div>
      </div>
      <div className={classNames('constructor__footer', 'mr-4')}>
        <span className='constructor__footer_price'>
          <p className='text text_type_digits-medium'>610</p>
          <CurrencyIcon className="constructor__footer_price-icon" type='primary' />
        </span>
        <Button htmlType='button' type='primary' size='medium'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;

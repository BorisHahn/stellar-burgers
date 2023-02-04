import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import './BurgerIngridients.css';
const classNames = require('classnames');

const BurgerIngridients = () => {
  const [current, setCurrent] = useState('Булки');
  return (
    <section className='ingridients'>
      <h1
        className={classNames(
          'text text_type_main-large',
          'ingridients__header',
        )}
      >
        Соберите бургер
      </h1>
      <nav className={classNames('mb-10', 'ingridients__nav')}>
        <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
    </section>
  );
};

export default BurgerIngridients;

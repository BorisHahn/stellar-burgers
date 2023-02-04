import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import './BurgerIngridients.css';
import IngridientCard from '../IngridientCard/IngridientCard';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/types/ingridientsTypes';
const classNames = require('classnames');

const BurgerIngridients = ({ ingredients }) => {
  const [current, setCurrent] = useState('Булки');

  function filterByType(array, type) {
    return array.filter((e) => e.type === type);
  }
  const arrayOfBuns = filterByType(ingredients, 'bun');
  const arrayOfSauce = filterByType(ingredients, 'sauce');
  const arrayOfMain = filterByType(ingredients, 'main');

  function getCards(array) {
    const newArray = array.map((item) => {
      return (
        <>
          <IngridientCard key={item._id} card={item} />
        </>
      );
    });
    return newArray;
  }

  const cardOfBuns = getCards(arrayOfBuns);
  const cardOfSauce = getCards(arrayOfSauce);
  const cardOfMain = getCards(arrayOfMain);

  return (
    <section className='burger-ingridients'>
      <h1
        className={classNames(
          'text text_type_main-large',
          'burger-ingridients__title',
        )}
      >
        Соберите бургер
      </h1>
      <nav className={classNames('burger-ingridients__nav')}>
        <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value='Начинки'
          active={current === 'Начинки'}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </nav>
      <div className={classNames('burger-ingridients__menu', 'mt-10')}>
        <h2
          className={classNames(
            'text text_type_main-medium',
            'burger-ingridients__menu-title',
          )}
        >
          Булки
        </h2>
        <div
          className={classNames(
            'burger-ingridients__menu-buns',
            'pl-4 pt-6 pb-10',
          )}
        >
          {cardOfBuns}
        </div>
        <h2
          className={classNames(
            'text text_type_main-medium',
            'burger-ingridients__menu-title',
          )}
        >
          Соусы
        </h2>
        <div
          className={classNames(
            'burger-ingridients__menu-sauce',
            'ml-4 mt-6 mb-10',
          )}
        >
          {cardOfSauce}
        </div>
        <h2
          className={classNames(
            'text text_type_main-medium',
            'burger-ingridients__menu-title',
          )}
        >
          Начинки
        </h2>
        <div
          className={classNames(
            'burger-ingridients__menu-main',
            'ml-4 mt-6 mb-10',
          )}
        >
          {cardOfMain}
        </div>
      </div>
    </section>
  );
};

BurgerIngridients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
};

export default BurgerIngridients;

import style from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/types/ingredientsTypes';
import { tab } from '@testing-library/user-event/dist/tab';
const classNames = require('classnames');

const BurgerIngredients = ({ ingredients, handleOpenModal }) => {
  const [current, setCurrent] = useState('Булки');
  const refBun = useRef();
  const refSauce = useRef();
  const refMain = useRef();

  const handleOpenCard = (card) => {
    handleOpenModal(card)
  }

  function handleScroleTo(ref) {
    ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function filterByType(array, type) {
    return array.filter((e) => e.type === type);
  }
  const arrayOfBuns = filterByType(ingredients, 'bun');
  const arrayOfSauce = filterByType(ingredients, 'sauce');
  const arrayOfMain = filterByType(ingredients, 'main');

  function getCards(array) {
    const newArray = array.map((item) => {
      return <IngredientCard key={item._id} card={item} handleOpen={handleOpenCard}/>;
    });
    return newArray;
  }

  const cardOfBuns = getCards(arrayOfBuns);
  const cardOfSauce = getCards(arrayOfSauce);
  const cardOfMain = getCards(arrayOfMain);

  return (
    <section className='burger-ingridients'>
      <h1 className={classNames('text text_type_main-large', style.title)}>
        Соберите бургер
      </h1>
      <nav className={classNames(style.navigation)}>
        <Tab
          value='Булки'
          active={current === 'Булки'}
          onClick={() => {
            handleScroleTo(refBun);
            setCurrent('Булки');
          }}
        >
          Булки
        </Tab>
        <Tab
          value='Соусы'
          active={current === 'Соусы'}
          onClick={() => {
            handleScroleTo(refSauce);
            setCurrent('Соусы');
          }}
        >
          Соусы
        </Tab>
        <Tab
          value='Начинки'
          active={current === 'Начинки'}
          onClick={() => {
            handleScroleTo(refMain);
            setCurrent('Начинки');
          }}
        >
          Начинки
        </Tab>
      </nav>
      <div className={classNames(style.menu, 'mt-10')}>
        <h2
          ref={refBun}
          className={classNames(
            'text text_type_main-medium',
            'burger-ingridients__menu-title',
          )}
        >
          Булки
        </h2>
        <div className={classNames(style.buns, 'pl-4 pt-6 pb-10')}>
          {cardOfBuns}
        </div>
        <h2
          ref={refSauce}
          className={classNames(
            'text text_type_main-medium',
            'burger-ingridients__menu-title',
          )}
        >
          Соусы
        </h2>
        <div className={classNames(style.sauce, 'ml-4 mt-6 mb-10')}>
          {cardOfSauce}
        </div>
        <h2
          ref={refMain}
          className={classNames(
            'text text_type_main-medium',
            'burger-ingridients__menu-title',
          )}
        >
          Начинки
        </h2>
        <div className={classNames(style.main, 'ml-4 mt-6 mb-10')}>
          {cardOfMain}
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
};

export default BurgerIngredients;

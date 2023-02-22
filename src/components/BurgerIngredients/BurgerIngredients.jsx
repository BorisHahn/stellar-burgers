import style from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import IngredientCard from '../IngredientCard/IngredientCard';
import { bun, sauce, main } from '../../utils/const';
import PropTypes from 'prop-types';
import IntersectionWrapper from '../IntersectionWrapper/IntersectionWrapper';
const classNames = require('classnames');

const BurgerIngredients = ({ handleOpenModal }) => {
  const refBun = useRef();
  const refSauce = useRef();
  const refMain = useRef();
  const refIndegrients = useRef();
  const { allIngredients } = useSelector((state) => state.ingredients);
  const [inViewBun, setInViewBun] = useState(true);
  const [inViewSauce, setInViewSauce] = useState(false);
  const [inViewMain, setInViewMain] = useState(false);

  const handleOpenCard = (card) => {
    handleOpenModal(card);
  };

  function handleScroleTo(ref) {
    ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function filterByType(array, type) {
    return array.filter((e) => e.type === type);
  }
  const arrayOfBuns = useMemo(
    () => filterByType(allIngredients, bun),
    [allIngredients, bun],
  );
  const arrayOfSauce = useMemo(
    () => filterByType(allIngredients, sauce),
    [allIngredients, sauce],
  );
  const arrayOfMain = useMemo(
    () => filterByType(allIngredients, main),
    [allIngredients, main],
  );

  function getCards(array) {
    const newArray = array.map((item) => {
      return (
        <IngredientCard
          key={item._id}
          card={item}
          handleOpen={handleOpenCard}
        />
      );
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
          active={inViewBun}
          onClick={() => {
            handleScroleTo(refBun);
          }}
        >
          Булки
        </Tab>
        <Tab
          value='Соусы'
          active={inViewSauce}
          onClick={() => {
            handleScroleTo(refSauce);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value='Начинки'
          active={inViewMain}
          onClick={() => {
            handleScroleTo(refMain);
          }}
        >
          Начинки
        </Tab>
      </nav>
      <div ref={refIndegrients} className={classNames(style.menu, 'mt-10')}>
        <IntersectionWrapper name='A' onChange={setInViewBun} threshold={0.8}>
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
        </IntersectionWrapper>

        <h2
          ref={refSauce}
          className={classNames(
            'text text_type_main-medium',
            'burger-ingridients__menu-title',
          )}
        >
          Соусы
        </h2>
        <IntersectionWrapper name='B' onChange={setInViewSauce} threshold={0.7}>
          <div className={classNames(style.sauce, 'ml-4 mt-6 mb-10')}>
            {cardOfSauce}
          </div>
        </IntersectionWrapper>
        <h2
          ref={refMain}
          className={classNames(
            'text text_type_main-medium',
            'burger-ingridients__menu-title',
          )}
        >
          Начинки
        </h2>
        <IntersectionWrapper name='C' onChange={setInViewMain} threshold={0.2}>
          <div className={classNames(style.main, 'ml-4 mt-6 mb-10')}>
            {cardOfMain}
          </div>
        </IntersectionWrapper>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  handleOpenModal: PropTypes.func,
};

export default BurgerIngredients;

import React from 'react';
import style from './App.module.css';
import { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Portal from '../Portal/Portal';

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState('');

  console.log(ingredients)
  const getIngredients = () => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
      })
      .then((res) => {
        setIngredients([...res.data]);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const handleOpenModal = (item) => {
    setCurrentIngredient(item);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={style.page}>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngredients
          ingredients={ingredients}
          handleOpenModal={handleOpenModal}
        />
        <BurgerConstructor ingredients={ingredients} />
      </main>
      <Portal
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        title='Детали ингредиента'
      >
        <IngredientDetails item={currentIngredient} />
      </Portal>
    </div>
  );
};

export default App;

import React from 'react';
import style from './App.module.css';
import { useState, useEffect, useMemo } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orderModalIsOpen, setOrderModalIsOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState('');

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

  useEffect(() => {
    window.addEventListener('keyup', handleCloseByEsc);
    return () =>
      window.removeEventListener('keyup', handleCloseByEsc);
  }, [orderModalIsOpen, modalIsOpen]);

  const handleOpenModal = (item) => {
    setCurrentIngredient(item);
    setModalIsOpen(true);
  };

  const handleOpenOrderModal = () => {
    setOrderModalIsOpen(true);
  };

  const handleCloseByEsc = (e) => {
    if (e.code === 'Escape') {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setOrderModalIsOpen(false);
  };

  return (
    <div className={style.page}>
      <AppHeader />
      <main className={style.main}>
        <BurgerIngredients
          ingredients={ingredients}
          handleOpenModal={handleOpenModal}
        />
        <BurgerConstructor
          ingredients={ingredients}
          handleOpenOrderModal={handleOpenOrderModal}
        />
      </main>
      <Modal
        modalIsOpen={modalIsOpen}
        onClose={handleCloseModal}
        title='Детали ингредиента'
      >
        <IngredientDetails item={currentIngredient} />
      </Modal>
      <Modal
        modalIsOpen={orderModalIsOpen}
        onClose={handleCloseModal}
      >
        <OrderDetails />
      </Modal>
    </div>
  );
};

export default App;

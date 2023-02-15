import React from 'react';
import style from './App.module.css';
import { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import {
  Context,
  OrderContext,
  NumberOfOrderContext,
} from '../../context/Context';

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orderModalIsOpen, setOrderModalIsOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [order, setOrder] = useState([]);
  const [numberOfOrder, setNumberOfOrder] = useState(null);

  useEffect(() => {
    getIngredients();
  }, []);

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

  const makeAnOrder = () => {
    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: order.map((item) => item._id) }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
      })
      .then((res) => {
        setNumberOfOrder(res.order.number);
      })
      .catch((e) => console.error(e));
  };

  const handleOpenModal = (item) => {
    setCurrentIngredient(item);
    setModalIsOpen(true);
  };

  const handleOpenOrderModal = () => {
    setOrderModalIsOpen(true);
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
        <Context.Provider value={ingredients}>
          <OrderContext.Provider value={order}>
            <BurgerConstructor
              handleOpenOrderModal={handleOpenOrderModal}
              setOrder={setOrder}
              makeAnOrder={makeAnOrder}
            />
          </OrderContext.Provider>
        </Context.Provider>
      </main>
      <Modal
        modalIsOpen={modalIsOpen}
        onClose={handleCloseModal}
        title='Детали ингредиента'
      >
        <IngredientDetails item={currentIngredient} />
      </Modal>
      <NumberOfOrderContext.Provider value={numberOfOrder}>
        <Modal modalIsOpen={orderModalIsOpen} onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      </NumberOfOrderContext.Provider>
    </div>
  );
};

export default App;

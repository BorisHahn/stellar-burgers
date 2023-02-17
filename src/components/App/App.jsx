import React from 'react';
import style from './App.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import {
  getIngredients,
  addCurrentIngredient,
} from '../../redux/slices/ingredientsSlice';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orderModalIsOpen, setOrderModalIsOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [numberOfOrder, setNumberOfOrder] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  // const makeAnOrder = () => {
  //   api
  //     .makeAnOrder({ ingredients: order.map((item) => item._id) })
  //     .then((res) => {
  //       setNumberOfOrder(res.order.number);
  //     })
  //     .catch((e) => console.error(e));
  // };

  const handleOpenModal = (item) => {
    dispatch(addCurrentIngredient(item));
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
      <DndProvider backend={HTML5Backend}>
        <main className={style.main}>
          <BurgerIngredients handleOpenModal={handleOpenModal} />
          <BurgerConstructor
            handleOpenOrderModal={handleOpenOrderModal}
            setOrder={setOrder}
          />
        </main>
      </DndProvider>
      <Modal
        modalIsOpen={modalIsOpen}
        onClose={handleCloseModal}
        title='Детали ингредиента'
      >
        <IngredientDetails />
      </Modal>

      <Modal modalIsOpen={orderModalIsOpen} onClose={handleCloseModal}>
        <OrderDetails />
      </Modal>
    </div>
  );
};

export default App;

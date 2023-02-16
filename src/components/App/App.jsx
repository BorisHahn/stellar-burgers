import React from 'react';
import style from './App.module.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import getIngredients from '../../redux/slices/ingredientsSlice';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orderModalIsOpen, setOrderModalIsOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});
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
        <BurgerIngredients handleOpenModal={handleOpenModal} />
        <BurgerConstructor
          handleOpenOrderModal={handleOpenOrderModal}
          setOrder={setOrder}
        />
      </main>
      <Modal
        modalIsOpen={modalIsOpen}
        onClose={handleCloseModal}
        title='Детали ингредиента'
      >
        <IngredientDetails item={currentIngredient} />
      </Modal>

      <Modal modalIsOpen={orderModalIsOpen} onClose={handleCloseModal}>
        <OrderDetails />
      </Modal>
    </div>
  );
};

export default App;

import style from './App.module.css';
import { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import api from '../../utils/Api';
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
    api
      .getIngredients()
      .then((res) => {
        setIngredients([...res.data]);
      })
      .catch((e) => console.error(e));
  };

  const makeAnOrder = () => {
    api
      .makeAnOrder({ ingredients: order.map((item) => item._id) })
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
        <Context.Provider value={ingredients}>
          <BurgerIngredients handleOpenModal={handleOpenModal} />
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

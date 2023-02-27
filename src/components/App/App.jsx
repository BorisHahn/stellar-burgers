import React from 'react';
import style from './App.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Main from '../../pages/Main';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { useSelector } from 'react-redux';
import {
  getIngredients,
  addCurrentIngredient,
  cleanOrderAndCurrent,
} from '../../redux/slices/ingredientsSlice';

const App = () => {
  const { ingredientDetails } = useSelector((state) => state.ingredients);
  const { order } = useSelector((state) => state.ingredients);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const handleOpenModal = (item) => {
    dispatch(addCurrentIngredient(item));
  };

  const handleCloseModal = () => {
    dispatch(cleanOrderAndCurrent());
  };

  return (
    <div className={style.page}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={style.main}>
          <Routes>
            <Route
              path='/'
              element={<Main handleOpenModal={handleOpenModal} />}
            />
          </Routes>
        </main>
      </DndProvider>

      <Modal
        onClose={handleCloseModal}
        isOpen={ingredientDetails}
        title='Детали ингредиента'
      >
        <IngredientDetails />
      </Modal>

      <Modal onClose={handleCloseModal} isOpen={order}>
        <OrderDetails />
      </Modal>
    </div>
  );
};

export default App;

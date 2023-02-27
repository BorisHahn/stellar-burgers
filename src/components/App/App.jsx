import style from './App.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Main from '../../pages/Main';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import ForgotPassword from '../../pages/Forgot-password';
import ResetPassword from '../../pages/Reset-password';
import Profile from '../../pages/Profile';
import Ingredient from '../../pages/Ingredient';
import NotFound from '../../pages/NotFound';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
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
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='profile' element={<Profile />} />
            <Route path='ingredients/:id' element={<Ingredient />} />
            <Route path='*' element={<NotFound />} />
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

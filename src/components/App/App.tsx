import style from './App.module.css';
import { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks/ReduxTypedHook';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Main from '../../pages/Main';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import ForgotPassword from '../../pages/Forgot-password';
import ResetPassword from '../../pages/Reset-password';
import Profile from '../../pages/Profile';
import NotFound from '../../pages/NotFound';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import IngredientPage from '../../pages/Ingredient';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentOrderDetails from '../CurrentOrderDetails';
import Feed from '../../pages/Feed';
import {
  getIngredients,
  addCurrentIngredient,
  cleanCurrent,
  cleanOrder,
} from '../../redux/slices/ingredientsSlice';
import {
  getProfileInfo,
  updateAccessToken,
  setLoadingStatus,
  setError,
} from '../../redux/slices/regAndAuthSlice';
function App() {
  const { order } = useAppSelector((state) => state.ingredients);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  let background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
    tokenCheck();
  }, []);

  const handleOpenModal = (item: object) => {
    dispatch(addCurrentIngredient(item));
  };

  const handleCloseCurrentModal = () => {
    dispatch(cleanCurrent());
    navigate(-1);
  };

  const handleCloseOrderModal = () => {
    dispatch(cleanOrder());
  };

  const tokenCheck = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(getProfileInfo())
        .unwrap()
        .catch((err) => {
          dispatch(updateAccessToken())
            .then((res) => dispatch(getProfileInfo()))
            .finally(() => {
              dispatch(setLoadingStatus());
              setTimeout(() => dispatch(setError()), 3000);
            });
        });
    }
  };

  return (
    <div className={style.page}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={style.main}>
          <Routes location={background || location}>
            <Route
              path='/'
              element={<Main handleOpenModal={handleOpenModal} />}
            />
            <Route
              path='profile'
              element={<ProtectedRoute children={<Profile />} />}
            />
            <Route
              path='profile/orders'
              element={<ProtectedRoute children={<Profile />} />}
            />
            <Route
              path='profile/orders/:number'
              element={
                <ProtectedRoute
                  children={<CurrentOrderDetails />}
                  background={background}
                />
              }
            />
            <Route path='feed' element={<Feed />} />
            <Route
              path='feed/:number'
              element={<ProtectedRoute children={<CurrentOrderDetails />} />}
            />

            <Route
              path='ingredients/:id'
              element={
                <IngredientPage>
                  <IngredientDetails />
                </IngredientPage>
              }
            />
            <Route
              path='login'
              element={<ProtectedRoute children={<Login />} anonymous={true} />}
            />
            <Route
              path='register'
              element={
                <ProtectedRoute children={<Register />} anonymous={true} />
              }
            />
            <Route
              path='forgot-password'
              element={
                <ProtectedRoute
                  children={<ForgotPassword />}
                  anonymous={true}
                />
              }
            />
            <Route
              path='reset-password'
              element={
                <ProtectedRoute children={<ResetPassword />} anonymous={true} />
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </DndProvider>

      {location.state != null && (
        <Routes>
          <Route
            path='profile/orders/:number'
            element={
              <Modal onClose={handleCloseCurrentModal}>
                <CurrentOrderDetails />
              </Modal>
            }
          />
          <Route
            path='feed/:number'
            element={
              <Modal onClose={handleCloseCurrentModal}>
                <CurrentOrderDetails />
              </Modal>
            }
          />
          <Route
            path='ingredients/:id'
            element={
              <Modal
                onClose={handleCloseCurrentModal}
                title='Детали ингредиента'
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {order && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;

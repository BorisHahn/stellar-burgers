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
import { IOrderPayload } from '../../types/ingredientsTypes';
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
  const [info, setInfo] = useState<IOrderPayload | object>({});

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const backgroundLocation =
    location.state && location.state.backgroundLocation;

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
          <Routes location={backgroundLocation || location}>
            <Route
              path='/'
              element={<Main handleOpenModal={handleOpenModal} />}
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

            <Route
              path='profile'
              element={<ProtectedRoute children={<Profile />} />}
            />

            <Route
              path='ingredients/:id'
              element={
                <IngredientPage>
                  <IngredientDetails />
                </IngredientPage>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </DndProvider>

      {backgroundLocation && (
        <Routes>
          <Route
            path='ingredients/:id'
            element={
              <Modal
                onClose={handleCloseCurrentModal}
                objectInStore={info}
                title='Детали ингредиента'
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      <Modal onClose={handleCloseOrderModal} objectInStore={order}>
        <OrderDetails />
      </Modal>
    </div>
  );
}

export default App;

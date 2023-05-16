import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import regAndAuthSlice from './slices/regAndAuthSlice';
import ordersSlice from './slices/ordersSlice';
import { socketMiddleware, IWSAction } from '../utils/middleware/wsMiddleware';
import {
  connect as OrdersWsConnect,
  disconnect as OrdersWsDisconnect,
  wsOpen as OrdersWsOpen,
  wsClose as OrdersWsClose,
  wsMessage as OrdersWsMessage,
  wsError as OrdersWsError,
} from '../redux/actions/wsActions';

const wsOrderActions: IWSAction = {
  wsConnect: OrdersWsConnect,
  wsDisconnect: OrdersWsDisconnect,
  onOpen: OrdersWsOpen,
  onClose: OrdersWsClose,
  onError: OrdersWsError,
  onMessage: OrdersWsMessage,
};

const ordersMiddleware = socketMiddleware(wsOrderActions);

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  accessProcedure: regAndAuthSlice,
  orders: ordersSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(ordersMiddleware),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

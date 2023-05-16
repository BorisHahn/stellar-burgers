import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface IWSAction {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
}

export const socketMiddleware = (wsAction: IWSAction): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsDisconnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsAction;

      if (wsConnect?.match(action)) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError('Ошибка сокета'));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...orders } = parsedData;
          dispatch(onMessage(orders));
        };

        socket.onclose = () => {
          dispatch(onClose());
        };

        if (wsSendMessage && wsSendMessage.match(action)) {
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect.match(action)) {
          socket.close();
        }
      }
      next(action);
    };
  };
};


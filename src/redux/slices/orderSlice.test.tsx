import ordersReduser, { initialState, getOrder } from './ordersSlice';
import { IOrderItem } from '../../types/ordersTypes';
import { wsOpen, wsClose, wsError, wsMessage } from '../actions/wsActions';
describe('orderSilce', () => {
  it('should handle success getOrder', () => {
    const getOrderResponce: { success: boolean; orders: IOrderItem[] } = {
      success: true,
      orders: [
        {
          ingredients: ['test'],
          _id: 'test',
          status: 'done',
          number: 5555,
          createdAt: 'test',
          updatedAt: 'test',
          name: 'test',
        },
      ],
    };
    const state = {
      ...initialState,
      orders: null,
    };
    const action = { type: getOrder.fulfilled.type, payload: getOrderResponce };
    const result = ordersReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      currentOrder: getOrderResponce,
    });
  });
  it('handle wsOpen action', () => {
    expect(ordersReduser(initialState, wsOpen)).toEqual({
      ...initialState,
      loadingStatus: true,
    });
  });
  it('handle wsClose action', () => {
    expect(ordersReduser(initialState, wsClose)).toEqual(initialState);
  });
  it('handle wsError action', () => {
    const wsErrorResponse: string = 'Error';
    const res = ordersReduser(initialState, wsError(wsErrorResponse));
    expect(res).toEqual({
      ...initialState,
      loadingStatus: false,
      connectionError: wsErrorResponse,
    });
  });
  it('handle wsMessage action', () => {
    const wsMessageResponce: {
      success: boolean;
      orders: IOrderItem[];
      total: number;
      totalToday: number;
    } = {
      success: true,
      orders: [
        {
          ingredients: ['test'],
          _id: 'test',
          status: 'done',
          number: 5555,
          createdAt: 'test',
          updatedAt: 'test',
          name: 'test',
        },
      ],
      total: 5555,
      totalToday: 10,
    };
    const res = ordersReduser(initialState, wsMessage(wsMessageResponce));
    expect(res).toEqual({
      ...initialState,
      loadingStatus: false,
      orders: wsMessageResponce,
    });
  });
});

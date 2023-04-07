const bunImage = 'https://code.s3.yandex.net/react/code/bun-02.png';
const BASE_URL = 'https://norma.nomoreparties.space/api';
export const emailRegExp = '[A-z0-9_.-]{1,}@[A-z0-9_.-]{1,}[.][A-z]{2,6}';
const loadingStatus = 'loading';
const idleStatus = 'idle';
const failedStatus = 'failed';
const bun = 'bun';
const sauce = 'sauce';
const main = 'main';
const orders = {
  success: true,
  orders: [
    {
      ingredients: [
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c6',
      ],
      _id: '',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T20:11:01.403Z',
      updatedAt: '2021-06-23T20:11:01.406Z',
    },
    {
      ingredients: [
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733d1',
        '60d3b41abdacab0026a733c6',
      ],
      _id: '',
      status: 'done',
      number: 34536,
      createdAt: '2021-06-23T20:13:23.654Z',
      updatedAt: '2021-06-23T20:13:23.657Z',
    },
  ],
  total: 2,
  totalToday: 2,
};

export {
  bunImage,
  BASE_URL,
  loadingStatus,
  idleStatus,
  failedStatus,
  bun,
  sauce,
  main,
  orders,
};

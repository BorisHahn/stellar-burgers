import style from './BurgerConstructor.module.css';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  useAppSelector,
  useAppDispatch,
} from '../../utils/hooks/ReduxTypedHook';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import Spinner from 'react-bootstrap/Spinner';
import { bun } from '../../utils/const';
import {
  addConstructorElements,
  makeAnOrder,
  setLoadingStatus,
} from '../../redux/slices/ingredientsSlice';
import {
  updateAccessToken,
  setIsLogin,
} from '../../redux/slices/regAndAuthSlice';
import FillingCard from '../FillingCard/FillingCard';
import { TIngredientCard } from '../../types/ingredientsTypes';
const classNames = require('classnames');

const BurgerConstructor: FC = () => {
  const { constructorElements, loadingStatus } = useAppSelector(
    (state) => state.ingredients,
  );

  const { isLogin } = useAppSelector((state) => state.accessProcedure);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(card: TIngredientCard) {
      dispatch(addConstructorElements({ ...card, dragId: uuidv4() }));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleOpenCard = () => {
    if (!isLogin) {
      navigate('/login');
    } else if (constructorElements.length === 0) {
      return;
    } else {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const order = constructorElements.map((item) => item._id);
        dispatch(
          makeAnOrder({
            ingredients: [...order],
          }),
        )
          .unwrap()
          .catch((err) => {
            dispatch(updateAccessToken())
              .then((res) =>
                dispatch(
                  makeAnOrder({
                    ingredients: [...order],
                  }),
                ),
              )
              .finally(() => {
                dispatch(setLoadingStatus(loadingStatus));
              });
          });
      } else {
        dispatch(setIsLogin());
        navigate('/login');
      }
    }
  };

  const totalPrice = useMemo<number>(() => {
    return constructorElements
      .filter((item) => item != null)
      .reduce((acc, item) => {
        return acc + item.price;
      }, 0);
  }, [constructorElements]);

  return (
    <section className={classNames(style.constructor)}>
      <div
        className={classNames(
          'pl-4 mt-25 mb-10',
          style.wrapper,
          isHover ? style.wrapperHide : '',
        )}
        style={{ minHeight: '664px' }}
        ref={dropTarget}
      >
        {constructorElements.length > 0 ? (
          <>
            {constructorElements
              .filter((item, index) => item != null && index === 0)
              .map((item, index) => {
                return (
                  <div
                    className={classNames(style.card, style.top)}
                    key={index}
                  >
                    <ConstructorElement
                      type='top'
                      isLocked={true}
                      text={item.name + ' (верх)'}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </div>
                );
              })}
            <div className={classNames(style.cards, 'mt-4')}>
              {constructorElements
                .filter((item) => item != null && item.type !== bun)
                .map((item, index) => {
                  return (
                    <FillingCard
                      item={item}
                      key={item.dragId}
                      index={constructorElements.indexOf(item)}
                    />
                  );
                })}
            </div>
            {constructorElements
              .filter(
                (item, index, arr) => item != null && index === arr.length - 1,
              )
              .map((item, index) => {
                return (
                  <div
                    className={classNames(style.card, style.bottom)}
                    key={index}
                  >
                    <ConstructorElement
                      type='bottom'
                      isLocked={true}
                      text={item.name + ' (низ)'}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </div>
                );
              })}
          </>
        ) : (
          <p className={classNames(style.plug, 'text text_type_main-large')}>
            Давайте соберем бургер! Начнем с булки!
          </p>
        )}
      </div>

      <div className={classNames(style.footer, 'mr-4')}>
        <span className={style.price}>
          <p className='text text_type_main-medium'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </span>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={handleOpenCard}
        >
          {loadingStatus ? (
            <>
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />{' '}
              Оформление...
            </>
          ) : (
            'Оформить заказ'
          )}
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;

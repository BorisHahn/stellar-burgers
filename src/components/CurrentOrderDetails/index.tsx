import styles from './CurrentOrderDetails.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { FC, useState, useEffect, useCallback } from 'react';
import {
  useAppSelector,
  useAppDispatch,
} from '../../utils/hooks/ReduxTypedHook';
import { IOrderItem } from '../../types/ordersTypes';
import { useParams } from 'react-router-dom';
import { TIngredientCard } from '../../types/ingredientsTypes';
import IngredientIcon from '../IngredientIcon';
import { addCurrentOrderIngredients } from '../../redux/slices/ordersSlice';

const CurrentOrderDetails: FC = () => {
  const { orderDetails, orders, currentOrderIngredients } = useAppSelector(
    (state) => state.orders,
  );
  const { allIngredients } = useAppSelector((state) => state.ingredients);
  const [order, setOrder] = useState<IOrderItem | null>(null);
  const params = useParams();
  const dispatch = useAppDispatch();

  const getCurrentOrder = () => {
    if (orderDetails != null) {
      setOrder(orderDetails);
    } else {
      const currentOrder = orders.filter(
        (order) => order.number === params.number,
      );
      setOrder(currentOrder[0]);
    }
  };

  const getStatus = useCallback(
    (status: string | undefined): string => {
      if (status === 'created') {
        return 'Создан';
      } else if (status === 'pending') {
        return 'Готовится';
      } else {
        return 'Выполнен';
      }
    },
    [order?.status],
  );

  const getIngredients = (ingredients: string[] | undefined) => {
    if (ingredients != undefined) {
      let ingredient: TIngredientCard[] = [];
      ingredients.forEach((item) => {
        const f = allIngredients.find((ingr) => ingr._id === item);
        if (f != null) {
          ingredient.push(f);
        }
      });
      return ingredient;
    }
  };

  const getAllIndexes = (
    arr: string[] | undefined,
    val: string,
  ): number | undefined => {
    if (arr != undefined) {
      let indexes = [],
        i = -1;
      while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
      }
      return indexes.length;
    }
  };

  const totalPrice = (
    count: number | undefined,
    price: number,
  ): number | undefined => {
    if (count != undefined) {
      return count * price;
    }
  };

  const orderItems = currentOrderIngredients?.map((item, index) => {
    return (
      <li className={styles.ingrItem} key={index}>
        <div className={styles.nameAndIcon}>
          <IngredientIcon src={item.image_mobile} srcSet={item.image_mobile} />
          <p
            className={classNames(
              'className="text text_type_main-default',
              styles.name,
            )}
          >
            {item.name}
          </p>
        </div>
        <div className={classNames(styles.priceBlock, 'mb-10')}>
          <p
            className={classNames(
              'text text_type_digits-default',
              styles.count,'mr-2'
            )}
          >
            {getAllIndexes(order?.ingredients, item._id) +
              ' ' +
              'x ' +
              totalPrice(
                getAllIndexes(order?.ingredients, item._id),
                item.price,
              )}
          </p>
          <CurrencyIcon type='primary' />
        </div>
      </li>
    );
  });

  useEffect(() => {
    dispatch(addCurrentOrderIngredients(getIngredients(order?.ingredients)));
  }, [order]);

  useEffect(() => {
    getCurrentOrder();
  }, []);

  return (
    <div className={styles.wrapper}>
      <p
        className={classNames(
          'text text_type_digits-default',
          styles.id,
          'mb-10',
        )}
      >
        #0{order?.number}
      </p>
      <div className={styles.info}>
        <p className={classNames('text text_type_main-medium', styles.name)}>
          Наименование бургера
        </p>
        <p
          className={classNames(
            'text text_type_main-small',
            order?.status === 'done' && styles.status,
          )}
        >
          {getStatus(order?.status)}
        </p>
      </div>
      <p
        className={classNames(
          'text text_type_main-medium',
          styles.compound,
          'mb-6',
        )}
      >
        Состав:
      </p>
      <ul className={styles.ingrList}>{orderItems}</ul>
    </div>
  );
};

export default CurrentOrderDetails;

import styles from './CurrentOrderDetails.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { FC, useState, useEffect, useCallback } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  useAppSelector,
  useAppDispatch,
} from '../../utils/hooks/ReduxTypedHook';
import { IOrderItem } from '../../types/ordersTypes';
import { useParams } from 'react-router-dom';
import { TIngredientCard } from '../../types/ingredientsTypes';
import IngredientIcon from '../IngredientIcon';
import { getOrder } from '../../redux/slices/ordersSlice';

const CurrentOrderDetails: FC = () => {
  const { orders, currentOrder } = useAppSelector((state) => state.orders);
  const { allIngredients } = useAppSelector((state) => state.ingredients);
  const [order, setOrder] = useState<IOrderItem | null>(null);
  const [orderArray, setOrderArray] = useState<any>([]);
  const params = useParams();
  const dispatch = useAppDispatch();
  console.log(params);
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
        const equals = (element: any): boolean => element?._id === f?._id;
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

  const orderItems = orderArray?.map((item: any, index: number) => {
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
              styles.count,
              'mr-2',
            )}
          >
            {getAllIndexes(currentOrder?.orders[0].ingredients, item._id) +
              ' ' +
              'x ' +
              totalPrice(
                getAllIndexes(currentOrder?.orders[0].ingredients, item._id),
                item.price,
              )}
          </p>
          <CurrencyIcon type='primary' />
        </div>
      </li>
    );
  });

  useEffect(() => {
    // dispatch(getOrder(params.number!))
    dispatch(getOrder('3277'));
  }, []);
  useEffect(() => {
    setOrderArray(getIngredients(currentOrder?.orders[0].ingredients));
  }, [currentOrder]);

  return (
    <div className={styles.wrapper}>
      <p
        className={classNames(
          'text text_type_digits-default',
          styles.id,
          'mb-10',
        )}
      >
        #0{currentOrder?.orders[0].number}
      </p>
      <div className={styles.info}>
        <p className={classNames('text text_type_main-medium', styles.name)}>
          {currentOrder?.orders[0].name}
        </p>
        <p
          className={classNames(
            'text text_type_main-small',
            currentOrder?.orders[0].status === 'done' && styles.status,
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
      <FormattedDate date={new Date(currentOrder?.orders[0].createdAt!)} />
    </div>
  );
};

export default CurrentOrderDetails;

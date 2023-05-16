import styles from './OrdersCard.module.css';
import { FC, useCallback, useEffect, useState, useMemo } from 'react';
import { useAppSelector } from '../../utils/hooks/ReduxTypedHook';
import { IOrderCardProps } from '../../types/ordersTypes';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientCard } from '../../types/ingredientsTypes';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import IngredientIcon from '../IngredientIcon';
const classNames = require('classnames');

const OrderCard: FC<IOrderCardProps> = ({ item }) => {
  const location = useLocation();
  const { allIngredients } = useAppSelector((state) => state.ingredients);
  const [orderIngredients, addOrderIngredients] = useState<TIngredientCard[]>();

  const getStatus = useCallback(
    (status: string): string => {
      if (status === 'created') {
        return 'Создан';
      } else if (status === 'pending') {
        return 'Готовится';
      } else {
        return 'Выполнен';
      }
    },
    [item.status],
  );

  const getIngredients = (ingredients: string[]) => {
    let ingredient: TIngredientCard[] = [];
    ingredients.forEach((item) => {
      const f = allIngredients.find((ingr) => ingr._id === item);
      if (f != null) {
        ingredient.push(f);
      }
    });
    return ingredient;
  };

  const ingredientImages = orderIngredients?.slice(0, 6).map((item, index) => {
    if (index != 5) {
      return (
        <IngredientIcon
          key={index}
          src={item.image_mobile}
          srcSet={item.image_mobile}
          overflow={!index ? orderIngredients?.length - 6 : 0}
          extraClass={styles.items_picture}
        />
      );
    } else {
      return (
        <IngredientIcon
          key={index}
          src={item.image_mobile}
          srcSet={item.image_mobile}
          extraClass={styles.items_picture}
        />
      );
    }
  });

  const totalPrice = useMemo<number | undefined>(() => {
    if (orderIngredients) {
      return orderIngredients.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
    }
  }, [orderIngredients]);

  useEffect(() => {
    addOrderIngredients(getIngredients(item.ingredients));
  }, [item.ingredients]);

  return (
    <Link
      to={`${location.pathname}/${item.number}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div className={styles.card}>
        <div className={styles.idAndTime}>
          <p className={classNames('text text_type_digits-default', styles.id)}>
            #0{item.number}
          </p>
          <p
            className={classNames(
              'text text_type_main-default text_color_inactive',
              styles.time,
            )}
          >
            <FormattedDate date={new Date(item.createdAt)} />
          </p>
        </div>
        <div className={styles.info}>
          <p className={classNames('text text_type_main-medium', styles.name)}>
            {item.name}
          </p>
          <p
            className={classNames(
              'text text_type_main-small',
              item.status === 'done' && styles.status,
            )}
          >
            {location.pathname === '/profile/orders' && getStatus(item.status)}
          </p>
        </div>
        <div className={styles.componentsAndPrice}>
          <div className={styles.ingredietnts}>{ingredientImages}</div>
          <span
            className={classNames('text text_type_main-medium', styles.price)}
          >
            {totalPrice}
            <CurrencyIcon type='primary' />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;

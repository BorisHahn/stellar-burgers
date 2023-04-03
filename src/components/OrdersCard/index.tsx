import styles from './OrdersCard.module.css';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../utils/hooks/ReduxTypedHook';
import { IOrderCardProps } from '../../types/ordersTypes';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientCard } from '../../types/ingredientsTypes';
const classNames = require('classnames');

const OrderCard: FC<IOrderCardProps> = ({ item }) => {
  const { allIngredients } = useAppSelector((state) => state.ingredients);
  const [orderIngredients, addOrderIngredients] = useState<TIngredientCard[]>();

  const getStatus = useCallback(
    (status: string): string => {
      if (status === 'created') {
        return 'Создан';
      } else if (status === 'pending') {
        return 'Готовится';
      } else {
        return 'Готов';
      }
    },
    [item.status],
  );
  let array;

  const getIngredients = (ingredients: string[]) => {
    let ingredient: TIngredientCard[] = [];
    ingredients.forEach((item) => {
      const f = allIngredients.find((ingr) => ingr._id === item);
      console.log(f, item, allIngredients);
      if (f != null) {
        ingredient.push(f);
      }
    });
    return ingredient;
  };

  console.log(orderIngredients);
  useEffect(() => {
    addOrderIngredients(getIngredients(item.ingredients));
  }, [item.ingredients]);

  return (
    <div className={styles.card}>
      <div className={styles.idAndTime}>
        <p className={classNames('text text_type_main-default', styles.id)}>
          #{item.number}
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
          Наименование бургера
        </p>
        <p
          className={classNames(
            'text text_type_main-small',
            item.status === 'done' && styles.status,
          )}
        >
          {getStatus(item.status)}
        </p>
      </div>
      <div className={styles.componentsAndPrice}>
        <p className={styles.name}></p>
        <p className={styles.status}></p>
      </div>
    </div>
  );
};

export default OrderCard;

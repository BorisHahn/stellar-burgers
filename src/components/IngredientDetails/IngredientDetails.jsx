import styles from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const classNames = require('classnames');

const IngredientDetails = () => {
  const [card, setCard] = useState({});
  const params = useParams();

  const { ingredientDetails, allIngredients } = useSelector(
    (state) => state.ingredients,
  );

  const getCurrentCard = () => {
    if (ingredientDetails != null) {
      setCard(ingredientDetails);
    } else {
      const card = allIngredients.filter((card) => card._id === params.id);
      setCard(card[0]);
    }
  };

  useEffect(() => {
    getCurrentCard();
  }, [ingredientDetails, params]);

  return (
    <div className={styles.infoCard}>
      <div className={classNames(styles.imageWrapper, 'mb-4')}>
        <img
          className={styles.image}
          src={card?.image_large}
          alt={card?.name}
        ></img>
      </div>
      <p
        className={classNames(
          'text text_type_main-default ',
          styles.name,
          'mb-8',
        )}
      >
        {card?.name}
      </p>
      <table className={classNames(styles.table, 'mb-15')}>
        <tbody>
          <tr>
            <th>
              <p className='text text_type_main-small text_color_inactive'>
                Калории,ккал
              </p>
            </th>
            <th>
              <p className='text text_type_main-small text_color_inactive'>
                Белки, г
              </p>
            </th>
            <th>
              <p className='text text_type_main-small text_color_inactive'>
                Жиры, г
              </p>
            </th>
            <th>
              <p className='text text_type_main-small text_color_inactive'>
                Углеводы, г
              </p>
            </th>
          </tr>
          <tr>
            <td>
              <p
                className={classNames(
                  'text text_type_main-default text_color_inactive',
                  styles.value,
                )}
              >
                {card?.calories}
              </p>
            </td>
            <td>
              <p
                className={classNames(
                  'text text_type_main-default text_color_inactive',
                  styles.value,
                )}
              >
                {card?.proteins}
              </p>
            </td>
            <td>
              <p
                className={classNames(
                  'text text_type_main-default text_color_inactive',
                  styles.value,
                )}
              >
                {card?.fat}
              </p>
            </td>
            <td>
              <p
                className={classNames(
                  'text text_type_main-default text_color_inactive',
                  styles.value,
                )}
              >
                {card?.carbohydrates}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IngredientDetails;

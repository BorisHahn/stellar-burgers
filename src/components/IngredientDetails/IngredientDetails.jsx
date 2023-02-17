import styles from './IngredientDetails.module.css';
import ingredientsPropTypes from '../../utils/types/ingredientsTypes';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
const classNames = require('classnames');

const IngredientDetails = () => {
  const { ingredientDetails } = useSelector((state) => state.ingredients);
  return (
    <div className={styles.infoCard}>
      <div className={classNames(styles.imageWrapper, 'mb-4')}>
        <img
          className={styles.image}
          src={ingredientDetails.image_large}
          alt={ingredientDetails.name}
        ></img>
      </div>
      <p
        className={classNames(
          'text text_type_main-default ',
          styles.name,
          'mb-8',
        )}
      >
        {ingredientDetails.name}
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
                {ingredientDetails.calories}
              </p>
            </td>
            <td>
              <p
                className={classNames(
                  'text text_type_main-default text_color_inactive',
                  styles.value,
                )}
              >
                {ingredientDetails.proteins}
              </p>
            </td>
            <td>
              <p
                className={classNames(
                  'text text_type_main-default text_color_inactive',
                  styles.value,
                )}
              >
                {ingredientDetails.fat}
              </p>
            </td>
            <td>
              <p
                className={classNames(
                  'text text_type_main-default text_color_inactive',
                  styles.value,
                )}
              >
                {ingredientDetails.carbohydrates}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IngredientDetails;

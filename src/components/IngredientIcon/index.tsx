import { FC } from 'react';
import styles from './IngredientIcon.module.css';
import classNames from 'classnames';
import { IngredientIconProps } from '../../types/ingredientsTypes';

const IngredientIcon: FC<IngredientIconProps> = ({
  srcSet,
  src,
  alt = 'ingredient',
  overflow = 0,
  extraClass,
}) => {
  return (
    <div className={classNames(styles.container, extraClass)}>
      <div>
        <picture className={styles.picture}>
          <source srcSet={srcSet} />
          <img src={src} alt={alt} className={styles.image} />
        </picture>
        {overflow > 0 && (
          <div
            className={classNames(
              styles.container,
              styles.picture,
              styles.overflow,
            )}
          >
            <div
              className={classNames(
                styles.picture,
                'text text_type_main-small',
              )}
            >
              +{overflow}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientIcon;

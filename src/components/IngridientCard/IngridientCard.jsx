import './IngridientCard.css';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const classNames = require('classnames');

const IngridientCard = ({ card }) => {
  const { name, price, image_large } = card;
  return (
    <div className='card'>
      <div className='card__image-wrapper'>
        <img className='card__image' src={image_large}></img>
      </div>
      <span className='constructor__footer_price'>
        <p className='text text_type_main-medium'>{price}</p>
        <CurrencyIcon
          className='constructor__footer_price-icon'
          type='primary'
        />
      </span>
      <p className={classNames('text text_type_main-default', 'card__name')} >{name}</p>
    </div>
  );
};

export default IngridientCard;

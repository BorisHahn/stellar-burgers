import './AppHeader.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
const classNames = require('classnames');

const AppHeader = () => {
  return (
    <header className='header'>
      <ul className='header__nav-list'>
        <li className='header__nav-item'>
          <BurgerIcon type='primary' />
          <p className='text text_type_main-default'>Конструктор</p>
        </li>
        <li className='header__nav-item'>
          <ListIcon type='secondary' />
          <p className='text text_type_main-default text_color_inactive'>
            Лента заказов
          </p>
        </li>
      </ul>
      <span className='header__logo'>
        <Logo />
      </span>
      <div
        className={classNames('pl-5 pr-5 pb-4 pt-4', 'header__personal-area')}
      >
        <ProfileIcon type='secondary' />
        <p className='text text_type_main-default text_color_inactive'>
          Личный кабинет
        </p>
      </div>
    </header>
  );
};

export default AppHeader;

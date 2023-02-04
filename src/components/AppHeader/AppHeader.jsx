import './AppHeader.css';
import { NavLink } from 'react-router-dom';
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
      <div className='header__nav'>
        <nav className='header__nav-list'>
          <NavLink to='/' className='header__nav-item'>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default text_color_active'>Конструктор</p>
              </>
            )}
          </NavLink>
          <NavLink to='orders' className='header__nav-item'>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default text_color_inactive'>
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </nav>
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
      </div>
    </header>
  );
};

export default AppHeader;

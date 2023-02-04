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
                <p
                  className={classNames(
                    isActive
                      ? 'text text_type_main-default header__nav-item_const'
                      : 'text text_type_main-default text_color_inactive',
                  )}
                >
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink to='orders' className='header__nav-item'>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p
                  className={classNames(
                    isActive
                      ? 'text text_type_main-default header__nav-item_const'
                      : 'text text_type_main-default text_color_inactive',
                  )}
                >
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </nav>
        <span className='header__logo'>
          <Logo />
        </span>
        <NavLink to='profile' className='header__personal-area'>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p
                className={classNames(
                  isActive
                    ? 'text text_type_main-default header__nav-item_const'
                    : 'text text_type_main-default text_color_inactive',
                )}
              >
                Личный кабинет
              </p>
            </>
          )}
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;

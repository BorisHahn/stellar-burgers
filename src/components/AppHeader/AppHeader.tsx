import style from './AppHeader.module.css';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
const classNames = require('classnames');

const AppHeader: FC = () => {
  return (
    <header className={style.header}>
      <div className={style.nav}>
        <nav className={style.list}>
          <NavLink to='/' className={style.item}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p
                  className={classNames(
                    isActive
                      ? `text text_type_main-default ${style.text}`
                      : 'text text_type_main-default text_color_inactive',
                  )}
                >
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink to='feed' className={style.item}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p
                  className={classNames(
                    isActive
                      ? `text text_type_main-default ${style.text}`
                      : 'text text_type_main-default text_color_inactive',
                  )}
                >
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </nav>
        <span className={style.logo}>
          <Logo />
        </span>
        <NavLink to='profile' className={style.profile}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p
                className={classNames(
                  isActive
                    ? `text text_type_main-default ${style.text} `
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

import styles from './Profile.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { emailRegExp } from '../../utils/const';
import { useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
const Profile = () => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const inputRef = useRef(null);
  const location = useLocation();

  return (
    <section className={styles.profile}>
      <nav className={styles.navigation}>
        <NavLink
          to={'/profile'}
          className={classNames(
            styles.link,
            location.pathname === '/profile'
              ? ['text text_type_main-medium', styles.linkActive]
              : 'text text_type_main-medium text_color_inactive',
          )}
        >
          Профиль
        </NavLink>
        <NavLink
          to={'/profile/orders'}
          className={classNames(
            styles.link,
            location.pathname === '/profile/order'
              ? ['text text_type_main-medium', styles.linkActive]
              : 'text text_type_main-medium text_color_inactive',
          )}
        >
          История заказов
        </NavLink>
        <NavLink
          className={classNames(
            styles.link,
            location.pathname === '/logout'
              ? ['text text_type_main-medium', styles.linkActive]
              : 'text text_type_main-medium text_color_inactive',
          )}
        >
          Выход
        </NavLink>
        <p className={classNames('text text_type_main-default text_color_inactive', styles.caption)}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <form>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
          name={'name'}
          error={false}
          ref={inputRef}
          minLength={2}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          extraClass='mb-6'
          required
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          error={false}
          ref={inputRef}
          pattern={emailRegExp}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          extraClass='mb-6'
          required
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
          name={'password'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          extraClass='mb-6'
          minLength={8}
          required
        />
      </form>
    </section>
  );
};

export default Profile;

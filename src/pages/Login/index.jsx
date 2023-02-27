import styles from './Login.module.css';
import classNames from 'classnames';
import { emailRegExp } from '../../utils/const';
import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
const Login = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const inputRef = useRef(null);
  return (
    <section className={classNames(styles.login)}>
      <h2 className={classNames(styles.title, 'text text_type_main-medium')}>
        Вход
      </h2>
      <Input
        type={'email'}
        placeholder={'E-mail'}
        onChange={(e) => setEmailValue(e.target.value)}
        value={emailValue}
        name={'email'}
        error={false}
        ref={inputRef}
        pattern={emailRegExp}
        errorText={'Ошибка'}
        size={'default'}
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
        icon={'ShowIcon'}
        extraClass='mb-6'
        minLength={8}
        required
      />
      <Button htmlType='button' type='primary' size='large' extraClass='mb-20'>
        Войти
      </Button>
      <p
        className={classNames(
          'text text_type_main-default text_color_inactive',
          styles.register,
        )}
      >
        Вы — новый пользователь?{' '}
        <NavLink to={'/register'} className={styles.link}>
          Зарегестрироваться
        </NavLink>
      </p>
      <p className='text text_type_main-default text_color_inactive'>
        Забыли пароль?{' '}
        <NavLink to={'/forgot-password'} className={styles.link}>
          Восстановить пароль
        </NavLink>
      </p>
    </section>
  );
};
export default Login;

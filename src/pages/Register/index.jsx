import styles from './Register.module.css';
import classNames from 'classnames';
import { emailRegExp } from '../../utils/const';
import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
const Register = () => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const inputRef = useRef(null);
  return (
    <section className={styles.register}>
      <h2 className={classNames(styles.title, 'text text_type_main-medium')}>
        Регистрация
      </h2>
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
        extraClass='mb-6'
        required
      />
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
        Зарегистрироваться
      </Button>
      <p
        className={classNames(
          'text text_type_main-default text_color_inactive',
          styles.enter,
        )}
      >
        Уже зарегестрированы?{' '}
        <NavLink to={'/login'} className={styles.link}>
          Войти
        </NavLink>
      </p>
    </section>
  );
};

export default Register;

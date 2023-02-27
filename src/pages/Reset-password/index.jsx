import styles from './Reset-password.module.css';
import classNames from 'classnames';
import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
const ResetPassword = () => {
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');
  const inputRef = useRef(null);
  return (
    <section className={styles.resetPassword}>
      <h2 className={classNames(styles.title, 'text text_type_main-medium')}>
        Восстановление пароля
      </h2>
      <Input
        type={'password'}
        placeholder={'Введите новый пароль'}
        onChange={(e) => setNewPasswordValue(e.target.value)}
        value={newPasswordValue}
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
      <Input
        type={'password'}
        placeholder={'Введите код из письма'}
        onChange={(e) => setRepeatPasswordValue(e.target.value)}
        value={repeatPasswordValue}
        name={'password'}
        error={false}
        ref={inputRef}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='mb-6'
        minLength={8}
        required
      />
      <Button htmlType='button' type='primary' size='large' extraClass='mb-20'>
        Сохранить
      </Button>
      <p
        className={classNames(
          'text text_type_main-default text_color_inactive',
          styles.enter,
        )}
      >
        Вспомнили пароль?{' '}
        <NavLink to={'/login'} className={styles.link}>
          Войти
        </NavLink>
      </p>
    </section>
  );
};

export default ResetPassword;

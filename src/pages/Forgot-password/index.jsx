import styles from './Forgot-password.module.css';
import classNames from 'classnames';
import { emailRegExp } from '../../utils/const';
import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState('');
  const inputRef = useRef(null);
  return (
    <section className={styles.forgotPassword}>
      <h2 className={classNames(styles.title, 'text text_type_main-medium')}>
        Восстановление пароля
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
      <Button htmlType='button' type='primary' size='large' extraClass='mb-20'>
        Восстановить
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

export default ForgotPassword;

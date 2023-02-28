import styles from './Forgot-password.module.css';
import classNames from 'classnames';
import Spinner from 'react-bootstrap/Spinner';
import { emailRegExp } from '../../utils/const';
import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  async function resetPassword(data) {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://norma.nomoreparties.space/api/password-reset',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: `${data}` }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        navigate('/reset-password');
        setEmailValue('');
        setIsLoading(false);
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  }

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
      <Button
        htmlType='button'
        type='primary'
        size='large'
        extraClass='mb-20'
        onClick={() => resetPassword(emailValue)}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />{' '}
            Ожидание...
          </>
        ) : (
          'Восстановить'
        )}
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

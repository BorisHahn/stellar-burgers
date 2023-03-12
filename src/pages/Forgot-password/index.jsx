import styles from './Forgot-password.module.css';
import classNames from 'classnames';
import Spinner from 'react-bootstrap/Spinner';
import useFormAndValidation from '../../utils/hooks/ValidationHook';
import { emailRegExp } from '../../utils/const';
import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const { values, handleChangeValid, errors, isValid } = useFormAndValidation();
  async function resetPassword(data) {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoading(false);
        navigate('/reset-password', { state: '/forgot-password' });
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetPassword(values);
  }

  return (
    <section className={styles.forgotPassword}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={classNames(styles.title, 'text text_type_main-medium')}>
          Восстановление пароля
        </h2>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleChangeValid}
          value={values.email || ''}
          name={'email'}
          error={errors.email ? true : false}
          ref={inputRef}
          pattern={emailRegExp}
          errorText={errors.email}
          size={'default'}
          extraClass='mb-6'
          autoComplete='off'
          required
        />
        <Button
          htmlType='submit'
          type='primary'
          size='large'
          extraClass='mb-20'
          disabled={!isValid || isLoading}
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
      </form>
    </section>
  );
};

export default ForgotPassword;

import styles from './Forgot-password.module.css';
import classNames from 'classnames';
import Spinner from 'react-bootstrap/Spinner';
import useFormAndValidation from '../../utils/hooks/ValidationHook';
import { emailRegExp } from '../../utils/const';
import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  forgotPassword,
  setLoadingStatus,
  setError,
} from '../../redux/slices/regAndAuthSlice';
import { useDispatch, useSelector } from 'react-redux';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
const ForgotPassword = () => {
  const { error, loadingStatus } = useSelector(
    (state) => state.accessProcedure,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { values, handleChangeValid, errors, isValid } = useFormAndValidation();

  const resetPassword = (data) => {
    dispatch(forgotPassword(data))
      .then((res) => {
        if (res.payload.success === true) {
          navigate('/reset-password', { state: '/forgot-password' });
        } else {
          console.error(res.payload.message);
        }
      })
      .finally(() => {
        dispatch(setLoadingStatus());
        setTimeout(() => dispatch(setError()), 3000);
      });
  };

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
          disabled={!isValid || loadingStatus}
        >
          {loadingStatus ? (
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
        <p className={styles.error}>{error}</p>
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

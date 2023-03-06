import styles from './Reset-password.module.css';
import classNames from 'classnames';
import { NavLink, useNavigate } from 'react-router-dom';
import useFormAndValidation from '../../utils/hooks/ValidationHook';
import Spinner from 'react-bootstrap/Spinner';
import {
  resetPassword,
  setLoadingStatus,
  setError,
} from '../../redux/slices/regAndAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChangeValid, errors, isValid } = useFormAndValidation();
  const { error, loadingStatus } = useSelector(
    (state) => state.accessProcedure,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(values))
      .then((res) => {
        if (res.payload.success === true) {
          navigate('/login');
        } else {
          console.error(res.payload.message);
        }
      })
      .finally(() => {
        dispatch(setLoadingStatus());
        setTimeout(() => dispatch(setError()), 3000);
      });
  };

  return (
    <section className={styles.resetPassword}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={classNames(styles.title, 'text text_type_main-medium')}>
          Восстановление пароля
        </h2>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={handleChangeValid}
          value={values.password || ''}
          name={'password'}
          error={errors.password ? true : false}
          errorText={errors.password}
          size={'default'}
          icon={'ShowIcon'}
          extraClass='mb-6'
          minLength={8}
          autoComplete='new-password'
          required
        />
        <PasswordInput
          placeholder={'Введите код из письма'}
          onChange={handleChangeValid}
          value={values.token || ''}
          name={'token'}
          error={errors.token ? true : false}
          errorText={errors.token}
          size={'default'}
          icon={'ShowIcon'}
          extraClass='mb-6'
          minLength={8}
          autoComplete='token-from-email'
          required
        />
        <Button
          htmlType='submit'
          type='primary'
          size='large'
          extraClass='mb-20'
          disabled={!isValid}
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
              Сохранение...
            </>
          ) : (
            'Сохранить'
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

export default ResetPassword;
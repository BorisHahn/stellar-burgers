import styles from './Register.module.css';
import classNames from 'classnames';
import { emailRegExp } from '../../utils/const';
import Spinner from 'react-bootstrap/Spinner';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import useFormAndValidation from '../../utils/hooks/ValidationHook';
import {
  signUp,
  setLoadingStatus,
  setError,
} from '../../redux/slices/regAndAuthSlice';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { error, loadingStatus } = useSelector(
    (state) => state.accessProcedure,
  );
  const { values, handleChangeValid, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signUp(values))
      .then((res) => {
        if (res.payload != null && res.payload.success === true) {
          navigate('/login');
        } else {
          console.log(res.payload.message);
        }
      })
      .finally(() => {
        dispatch(setLoadingStatus());
        setTimeout(() => dispatch(setError()), 3000);
      });
  }

  return (
    <section className={styles.register}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={classNames(styles.title, 'text text_type_main-medium')}>
          Регистрация
        </h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChangeValid}
          value={values.name || ''}
          name={'name'}
          error={errors.name ? true : false}
          ref={inputRef}
          minLength={2}
          errorText={errors.name}
          size={'default'}
          extraClass='mb-6'
          autoComplete='off'
          required
        />
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
        <PasswordInput
          placeholder={'Пароль'}
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
        <Button
          type='primary'
          size='large'
          extraClass='mb-20'
          htmlType='submit'
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
            'Зарегистрироваться'
          )}
        </Button>
        <p className={styles.error}>{error}</p>
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
      </form>
    </section>
  );
};

export default Register;

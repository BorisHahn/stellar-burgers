import styles from './Login.module.css';
import classNames from 'classnames';
import { emailRegExp } from '../../utils/const';
import { useRef, FC, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import useFormAndValidation from '../../utils/hooks/ValidationHook';
import Spinner from 'react-bootstrap/Spinner';
import {
  useAppSelector,
  useAppDispatch,
} from '../../utils/hooks/ReduxTypedHook';
import {
  signIn,
  setLoadingStatus,
  setError,
} from '../../redux/slices/regAndAuthSlice';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { error, loadingStatus } = useAppSelector(
    (state) => state.accessProcedure,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const { values, handleChangeValid, errors, isValid } = useFormAndValidation();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(signIn(values)).finally(() => {
      dispatch(setLoadingStatus());
      setTimeout(() => dispatch(setError()), 3000);
    });
  }

  return (
    <section className={classNames(styles.login)}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={classNames(styles.title, 'text text_type_main-medium')}>
          Вход
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
        <PasswordInput
          placeholder={'Пароль'}
          onChange={handleChangeValid}
          value={values.password || ''}
          name={'password'}
          //@ts-ignore
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
              Входим...
            </>
          ) : (
            'Войти'
          )}
        </Button>
        <p className={styles.error}></p>
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
      </form>
    </section>
  );
};
export default Login;

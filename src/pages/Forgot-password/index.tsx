import styles from './Forgot-password.module.css';
import classNames from 'classnames';
import Spinner from 'react-bootstrap/Spinner';
import useFormAndValidation from '../../utils/hooks/ValidationHook';
import { emailRegExp } from '../../utils/const';
import { useRef, FormEvent, FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IValues } from '../../utils/hooks/ValidationHook';
import {
  forgotPassword,
  setLoadingStatus,
  setError,
} from '../../redux/slices/regAndAuthSlice';
import {
  useAppSelector,
  useAppDispatch,
} from '../../utils/hooks/ReduxTypedHook';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
const ForgotPassword: FC = () => {
  const { error, loadingStatus } = useAppSelector(
    (state) => state.accessProcedure,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { values, handleChangeValid, errors, isValid } = useFormAndValidation();

  const resetPassword = (data: IValues) => {
    dispatch(forgotPassword(data))
      .then((res: any) => {
        if (res.payload.success) {
          navigate('/reset-password', { state: '/forgot-password' });
        }
      })
      .finally(() => {
        dispatch(setLoadingStatus());
        setTimeout(() => dispatch(setError()), 3000);
      });
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
        <p className={styles.error}>{error?.message}</p>
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

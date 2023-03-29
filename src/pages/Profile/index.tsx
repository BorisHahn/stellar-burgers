import styles from './Profile.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import Spinner from 'react-bootstrap/Spinner';
import { emailRegExp } from '../../utils/const';
import { useState, FormEvent, SyntheticEvent, FC } from 'react';
import {
  useAppSelector,
  useAppDispatch,
} from '../../utils/hooks/ReduxTypedHook';
import { NavLink, useLocation } from 'react-router-dom';
import {
  signOut,
  changeProfileInfo,
  updateAccessToken,
  setLoadingStatus,
  setError,
} from '../../redux/slices/regAndAuthSlice';
const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { loadingStatus, userInfo } = useAppSelector(
    (state) => state.accessProcedure,
  );
  const { name, email } = userInfo;
  const [nameValue, setNameValue] = useState<string>(name);
  const [emailValue, setEmailValue] = useState<string>(email);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const location = useLocation();
  const handleLogout = () => {
    dispatch(signOut());
  };

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(
        changeProfileInfo({
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        }),
      )
        .unwrap()
        .catch((err) => {
          dispatch(updateAccessToken())
            .then((res) =>
              dispatch(
                changeProfileInfo({
                  name: nameValue,
                  email: emailValue,
                  password: passwordValue,
                }),
              ),
            )
            .finally(() => {
              dispatch(setLoadingStatus());
              setTimeout(() => dispatch(setError()), 3000);
              setPasswordValue('');
            });
        })
        .finally(() => setPasswordValue(''));
    } else {
      dispatch(signOut());
    }
  };

  const resetProfileValues = (e: SyntheticEvent) => {
    e.preventDefault();
    setNameValue(name);
    setEmailValue(email);
    setPasswordValue('');
  };

  const saveBtnClass =
    (nameValue !== name || emailValue !== email || passwordValue !== '') &&
    `${styles.view}`;

  return (
    <section className={styles.profile}>
      <nav className={styles.navigation}>
        <NavLink
          to={'/profile'}
          className={classNames(
            styles.link,
            location.pathname === '/profile'
              ? ['text text_type_main-medium', styles.linkActive]
              : 'text text_type_main-medium text_color_inactive',
          )}
        >
          Профиль
        </NavLink>
        <NavLink
          to={'/profile/orders'}
          className={classNames(
            styles.link,
            location.pathname === '/profile/order'
              ? ['text text_type_main-medium', styles.linkActive]
              : 'text text_type_main-medium text_color_inactive',
          )}
        >
          История заказов
        </NavLink>
        <NavLink
          to={'#'}
          className={classNames(
            styles.link,
            location.pathname === '/logout'
              ? ['text text_type_main-medium', styles.linkActive]
              : 'text text_type_main-medium text_color_inactive',
          )}
          type='button'
          onClick={handleLogout}
        >
          Выход
        </NavLink>
        <p
          className={classNames(
            'text text_type_main-default text_color_inactive',
            styles.caption,
          )}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <form onSubmit={handleChange}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
          name={'name'}
          error={false}
          minLength={2}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          extraClass='mb-6'
          autoComplete='off'
          required
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          error={false}
          pattern={emailRegExp}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          extraClass='mb-6'
          autoComplete='off'
          required
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          extraClass='mb-6'
          minLength={8}
          autoComplete='off'
        />
        <span className={classNames(styles.buttonBar, saveBtnClass)}>
          <Button
            htmlType='button'
            type='secondary'
            size='large'
            onClick={resetProfileValues}
          >
            Отмена
          </Button>
          <Button htmlType='submit' type='primary' size='large'>
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
        </span>
      </form>
    </section>
  );
};

export default Profile;

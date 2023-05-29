import accessProcedureReduser, {
  signIn,
  initialState,
} from './regAndAuthSlice';
import { ISignInAndUpResponse } from '../../types/regAndAuthTypes';
describe('regAndAuthSlice', () => {
  it('should return the initial state', () => {
    expect(accessProcedureReduser(undefined, { type: '' })).toEqual(
      initialState,
    );
  });

  it('should handle success signIn', () => {
    const signInResponse: ISignInAndUpResponse = {
      success: true,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      user: {
        email: 'test777@yandex.ru',
        name: 'Test',
      },
    };
    const state = {
      ...initialState,
      userInfo: { name: '', email: '' },
      isLogin: false,
      error: {},
      accessToken: null,
      refreshToken: null,
    };
    const action = { type: signIn.fulfilled.type, payload: signInResponse };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      userInfo: signInResponse.user,
      accessToken: signInResponse.accessToken,
      refreshToken: signInResponse.refreshToken,
      isLogin: true,
      error: null,
    });
  });
});

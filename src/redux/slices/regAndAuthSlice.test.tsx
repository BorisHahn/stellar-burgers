import accessProcedureReduser, {
  signIn,
  signUp,
  signOut,
  getProfileInfo,
  changeProfileInfo,
  forgotPassword,
  resetPassword,
  updateAccessToken,
  initialState,
  setLoadingStatus,
  setError,
  setIsLogin,
} from './regAndAuthSlice';
import { ISignInAndUpResponse } from '../../types/regAndAuthTypes';
describe('regAndAuthSlice', () => {
  it('should return the initial state', () => {
    expect(accessProcedureReduser(undefined, { type: '' })).toEqual(
      initialState,
    );
  });

  it('should handle pending signIn', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const action = { type: signIn.pending.type };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: true,
    });
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
      accessToken: null,
      refreshToken: null,
      loadingStatus: true,
    };
    const action = { type: signIn.fulfilled.type, payload: signInResponse };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      userInfo: signInResponse.user,
      accessToken: signInResponse.accessToken,
      refreshToken: signInResponse.refreshToken,
      loadingStatus: false,
      isLogin: true,
    });
  });
  it('should handle failed signIn', () => {
    const state = {
      ...initialState,
      error: false,
    };
    const action = { type: signIn.rejected.type };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      error: true,
      loadingStatus: false,
    });
  });
  it('should handle pending signUp', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const action = { type: signUp.pending.type };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: true,
    });
  });
  it('should handle success signUp', () => {
    const signUpResponse: ISignInAndUpResponse = {
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
      accessToken: null,
      refreshToken: null,
      loadingStatus: true,
    };
    const action = { type: signUp.fulfilled.type, payload: signUpResponse };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
    });
  });
  it('should handle failed signUp', () => {
    const state = {
      ...initialState,
      error: false,
    };
    const action = { type: signUp.rejected.type };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      error: true,
      loadingStatus: false,
    });
  });
  it('should handle pending getProfileInfo', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const action = { type: getProfileInfo.pending.type };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: true,
    });
  });
  it('should handle success getProfileInfo', () => {
    const getProfileInfoResponse: {
      success: boolean;
      user: { email: string; name: string };
    } = {
      success: true,
      user: {
        email: 'kek@yandex.ru',
        name: 'Kek1',
      },
    };
    const state = {
      ...initialState,
      userInfo: { name: '', email: '' },
      isLogin: false,
      loadingStatus: true,
    };
    const action = {
      type: getProfileInfo.fulfilled.type,
      payload: getProfileInfoResponse,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      userInfo: getProfileInfoResponse.user,
      isLogin: true,
    });
  });
  it('should handle failed getProfileInfo', () => {
    const state = {
      ...initialState,
      error: false,
      loadingStatus: true,
    };
    const action = {
      type: getProfileInfo.rejected.type,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      error: true,
    });
  });
  it('should handle pending signOut', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const action = { type: signOut.pending.type };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: true,
    });
  });
  it('should handle success signOut', () => {
    const signOutResponse: { success: boolean; message: string } = {
      success: true,
      message: 'Successful logout',
    };
    const state = {
      ...initialState,
      loadingStatus: true,
      isLogin: true,
    };
    const action = { type: signOut.fulfilled.type, payload: signOutResponse };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      isLogin: false,
    });
  });
  it('should handle failed signOut', () => {
    const state = {
      ...initialState,
      error: false,
      loadingStatus: true,
    };
    const action = {
      type: signOut.rejected.type,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      error: true,
    });
  });
  it('should handle pending changeProfileInfo', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const action = { type: changeProfileInfo.pending.type };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: true,
    });
  });
  it('should handle success changeProfileInfo', () => {
    const changeProfileIngoResponse: {
      success: boolean;
      user: { email: string; name: string };
    } = {
      success: true,
      user: {
        email: 'kek@yandex.ru',
        name: 'Kek1',
      },
    };
    const state = {
      ...initialState,
      userInfo: {
        email: 'kek@yandex.ru',
        name: 'Kek11111',
      },
      loadingStatus: true,
    };
    const action = {
      type: changeProfileInfo.fulfilled.type,
      payload: changeProfileIngoResponse,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      userInfo: changeProfileIngoResponse.user,
    });
  });
  it('should handle failed changeProfileInfo', () => {
    const state = {
      ...initialState,
      error: false,
    };
    const action = {
      type: changeProfileInfo.rejected.type,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,

      error: true,
    });
  });
  it('should handle pending forgotPassword', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const action = { type: forgotPassword.pending.type };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: true,
    });
  });
  it('should handle success forgotPassword', () => {
    const forgotPasswordResponse: {
      success: boolean;
      message: string;
    } = {
      success: true,
      message: 'Reset email sent',
    };
    const state = {
      ...initialState,
      loadingStatus: true,
    };
    const action = {
      type: forgotPassword.fulfilled.type,
      payload: forgotPasswordResponse,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
    });
  });
  it('should handle failed forgotPassword', () => {
    const state = {
      ...initialState,
      error: false,
    };
    const action = {
      type: forgotPassword.rejected.type,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,

      error: true,
    });
  });
  it('should handle pending resetPassword', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const action = { type: resetPassword.pending.type };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: true,
    });
  });
  it('should handle success resetPassword', () => {
    const resetPasswordResponse: {
      success: boolean;
      message: string;
    } = {
      success: true,
      message: 'Reset email sent',
    };
    const state = {
      ...initialState,
      loadingStatus: true,
    };
    const action = {
      type: resetPassword.fulfilled.type,
      payload: resetPasswordResponse,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
    });
  });
  it('should handle failed resetPassword', () => {
    const state = {
      ...initialState,
      error: false,
    };
    const action = {
      type: resetPassword.rejected.type,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      error: true,
    });
  });
  it('should handle pending forgotPassword', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const action = { type: forgotPassword.pending.type };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: true,
    });
  });
  it('should handle success forgotPassword', () => {
    const forgotPasswordResponse: {
      success: boolean;
      message: string;
    } = {
      success: true,
      message: 'Reset email sent',
    };
    const state = {
      ...initialState,
      loadingStatus: true,
    };
    const action = {
      type: forgotPassword.fulfilled.type,
      payload: forgotPasswordResponse,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      error: false,
    });
  });
  it('should handle failed forgotPassword', () => {
    const state = {
      ...initialState,
      error: false,
    };
    const action = {
      type: forgotPassword.rejected.type,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      error: true,
    });
  });
  it('should handle pending updateAccessToken', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const action = { type: updateAccessToken.pending.type };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: true,
    });
  });
  it('should handle success updateAccessToken', () => {
    const updateAccessTokenResponse: {
      success: boolean;
      accessToken: string;
      refreshToken: string;
    } = {
      success: true,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    const state = {
      ...initialState,
      loadingStatus: true,
      accessToken: null,
      refreshToken: null,
    };
    const action = {
      type: updateAccessToken.fulfilled.type,
      payload: updateAccessTokenResponse,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      accessToken: updateAccessTokenResponse.accessToken,
      refreshToken: updateAccessTokenResponse.refreshToken,
    });
  });
  it('should handle failed updateAccessToken', () => {
    const state = {
      ...initialState,
      error: false,
    };
    const action = {
      type: updateAccessToken.rejected.type,
    };
    const result = accessProcedureReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      error: true,
    });
  });
  it('should handle setLoadingStatus', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const result = accessProcedureReduser(state, setLoadingStatus());
    expect(result).toEqual(initialState);
  });
  it('should handle setError', () => {
    const state = {
      ...initialState,
      error: false,
    };
    const result = accessProcedureReduser(state, setError());
    expect(result).toEqual(initialState);
  });
  it('should handle setIsLogin', () => {
    const state = {
      ...initialState,
      isLogin: false,
    };
    const result = accessProcedureReduser(state, setIsLogin());
    expect(result).toEqual(initialState);
  });
});

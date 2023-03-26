interface IUserInfo {
  name: string;
  email: string;
}
export interface IUserInfoState {
  userInfo: IUserInfo;
  isLogin: boolean;
  error: { message?: string } | null;
  loadingStatus: boolean;
}

export interface IChangeProfileInfoPayload {
  name: string;
  email: string;
  password: string;
}

export interface IResetPasswordPayload {
  password: string;
  token: string;
}

export type TSignInPayload = Omit<IChangeProfileInfoPayload, 'name'>;

export interface IChangeProfileInfoResponse {
  success: boolean;
  message?: string;
  user: IUserInfo;
  accessToken?: string;
  refreshToken?: string;
}

export interface ISignInAndUpResponse {
  success: boolean;
  message?: string;
  user: IUserInfo;
  accessToken: string;
  refreshToken: string;
}
export type TForgotAndResetPasswordResponse = Omit<
  ISignInAndUpResponse,
  'user' | 'accessToken' | 'refreshToken'
>;

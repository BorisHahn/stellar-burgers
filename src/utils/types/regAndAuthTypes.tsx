interface IUserInfo {
  name: string;
  email: string;
}

export interface IUserInfoState {
  userInfo: IUserInfo;
  isLogin: boolean;
  error: object | null;
  loadingStatus: boolean | null;
}

export interface IChangeProfileInfoPayload {
  name: string;
  email: string;
  password: string;
}

export interface IChangeProfileInfoResponse {
  success: string;
  message?: string;
  user: IUserInfo;
  accessToken?: string;
  refreshToken?: string;
}

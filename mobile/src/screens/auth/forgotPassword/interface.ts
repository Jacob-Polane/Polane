export interface IForgotPasswordState {
  readonly username: string;
  readonly loading: boolean;
  readonly errorMessage: string;
}

export interface IForgotPasswordErrors {
  readonly username?: string;
  readonly otp?: string;
  readonly mobileNumber?: string;
  readonly token?: string;
  readonly newPassword?: string;
  readonly confirmNewPassword?: string;
}

export interface IResponse<TData = any, TError = IErrorInfo> {
  result: TData;
  targetUrl?: string | null;
  success?: boolean;
  error?: TError;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface IErrorInfo {
  code?: number;
  message?: string | null;
  details?: string | null;
  validationErrors?: IValidationErrorInfo[] | null;
}

export interface IValidationErrorInfo {
  message?: string | null;
  members?: string[] | null;
}

export interface ITokenInfo {
  isSuccess: boolean;
  errorMessage: string;
  token: string;
  username: string;
}

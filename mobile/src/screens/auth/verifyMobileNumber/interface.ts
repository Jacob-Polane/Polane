export interface IVerifyMobileNumberState {
  readonly loading: boolean;
  readonly errorMessage: string;
  readonly otp: string;
  readonly mobileNumber: string;
  readonly token: string;
}

export interface IResetPasswordUsingToken {
  username: string;
  token: string;
  newPassword: string;
}

export interface IVerifyMobileNumberErrors {
  readonly mobileNumber?: string;
}

export interface IVerifyOtpState {
  readonly loading: boolean;
  readonly errorMessage: string;
  readonly otp: string;
  readonly operationId: string;
}

export interface IVerifyOtpErrors {
  readonly otp?: string;
}

export interface IResetPasswordVerifyOtp {
  operationId: string;
  pin: string;
  mobileNo: string;
}

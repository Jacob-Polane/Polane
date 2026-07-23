export interface IOtpLoginState {
  readonly operationId: string;
  readonly code: string;
  readonly mobileNo: string;
  readonly loading: boolean;
  readonly imei: string;
  readonly errorMessage: string;
}

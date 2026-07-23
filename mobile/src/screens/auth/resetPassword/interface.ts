export interface IResetPasswordState {
  readonly loading: boolean;
  readonly errorMessage: string;
  readonly token: string;
  readonly newPassword: string;
  readonly confirmNewPassword: string;
  readonly operationId: string;
}

export interface IResetPasswordErrors {
  readonly newPassword?: string;
  readonly confirmNewPassword?: string;
}

export interface IOperationId {
  operationId: string;
}

export interface IResetPasswordUsingToken {
  username: string;
  token: string;
  newPassword: string;
}

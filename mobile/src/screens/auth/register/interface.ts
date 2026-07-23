export interface ISignUpState {
  readonly firstName: string;
  readonly lastName: string;
  readonly userName: string;
  readonly emailAddress: string;
  readonly mobileNumber: string;
  readonly loading: boolean;
  readonly password: string;
  readonly passwordConfirmation: string;
  readonly errorMessage: string;
  readonly success: boolean;
}

export interface ISignUpErrors {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly userName?: string;
  readonly emailAddress?: string;
  readonly mobileNumber?: string;
  readonly password?: string;
  readonly passwordConfirmation?: string;
}

export interface IRegisterUser {
  userName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
  password: string;
  passwordConfirmation: string;
  typeOfAccount: {
    item: string;
    itemValue: number;
  };
}

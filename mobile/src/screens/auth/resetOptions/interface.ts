export interface IResetOptionsState {
  readonly loading: boolean;
  readonly errorMessage: string;
  readonly selectedOption: number;
}

export interface IUserPasswordResetOptions {
  method: number;
  prompt: string;
  maskedIdentifier: string;
}

export interface IResetOptions {
  readonly label: string;
  readonly value: number;
}

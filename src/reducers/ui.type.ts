export enum Modals {
  Null = 'Null',
  SignIn = 'SignIn',
  APISuccess = 'APISuccess'
};

export interface NullParams {
  type: null;
}

export interface SignInParmas {
  type: 'SignIn';
}

export interface APISuccessParams {
  type: 'APISuccess';
  action: 'Create' | 'Update' | 'Delete';
  name: string;
}

export type ModalParams =
  NullParams |
  SignInParmas |
  APISuccessParams
;

export interface UIState {
  modal: ModalParams;
}

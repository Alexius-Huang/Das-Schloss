export enum Modals {
  SignIn,
};

export interface UIState {
  activeModal: Modals | null;
}

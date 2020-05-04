import { ModalParams } from '../redux.reducers/ui.type';

export interface OpenModal {
  type: 'OPEN_MODAL';
  payload: ModalParams;
}

export interface CloseModal {
  type: 'CLOSE_MODAL';
  payload?: undefined;
}

export type UIAction =
  OpenModal  |
  CloseModal
;

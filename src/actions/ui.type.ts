import { Modals } from '../reducers/ui.type';

export interface OpenModal {
  type: 'OPEN_MODAL';
  payload: Modals;
}

export interface CloseModal {
  type: 'CLOSE_MODAL';
  payload?: undefined;
}

export type UIAction =
  OpenModal  |
  CloseModal
;

import { ModalParams } from '../redux.reducers/ui.type';
import * as A from './ui.type';

export function openModal(params: ModalParams): A.OpenModal {
  return {
    type: 'OPEN_MODAL',
    payload: params,
  };
}

export function closeModal(): A.CloseModal {
  return {
    type: 'CLOSE_MODAL'
  };
}

import { Modals } from '../reducers/ui.type';
import * as A from './ui.type';

export function openModal(modal: Modals): A.OpenModal {
  return {
    type: 'OPEN_MODAL',
    payload: modal,
  };
}

export function closeModal(): A.CloseModal {
  return {
    type: 'CLOSE_MODAL'
  };
}

import { RootState } from '../reducers';

export function selectModal(state: RootState) {
  return state.UI.modal;
}

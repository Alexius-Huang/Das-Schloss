import { RootState } from '../redux.reducers';

export function selectModal(state: RootState) {
  return state.UI.modal;
}

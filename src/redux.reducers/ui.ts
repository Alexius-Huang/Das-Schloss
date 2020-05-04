import { UIAction } from '../redux.actions/ui.type';
import * as T from './ui.type';

const defaultState: T.UIState = {
  modal: { type: null },
};

export default function (state = defaultState, action: UIAction): T.UIState {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, modal: action.payload };
    case 'CLOSE_MODAL':
      return { ...state, modal: { type: null } };
    default:
      return state;
  }
}

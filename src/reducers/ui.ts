import { UIAction } from '../actions/ui.type';
import * as T from './ui.type';

const defaultState: T.UIState = {
  activeModal: null,
};

export default function (state = defaultState, action: UIAction): T.UIState {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, activeModal: action.payload };
    case 'CLOSE_MODAL':
      return { ...state, activeModal: null };
    default:
      return state;
  }
}

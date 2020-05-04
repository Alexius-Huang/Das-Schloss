import React from 'react';
import SignInModal from './Modals/SignIn';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectModal } from '../redux.selectors/UI';
import { openModal } from '../redux.actions/ui';
import { Modals } from '../redux.reducers/ui.type';
import '../scss/pages/Index.scss';

const Index: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);

  return (
    <div className="page page__index">
      {modal.type === Modals.SignIn && <SignInModal />}

      <header className="header">
        <h1 className="header__title">Das Schloss</h1>
        <p className="header__content">Start your journey and learn German today.</p>

        <div className="header__button-group">
          <button
            className="button-rect"
            onClick={() => history.push('/lessons')}
          >Try it now!</button>

          <button
            className="button-rect button-rect--light"
            onClick={() => dispatch(openModal({ type: Modals.SignIn }))}
          >
            Sign In
          </button>

          <button disabled={true} className="button-rect button-rect--light">
            Sign Up
          </button>

        </div>
      </header>
    </div>
  );
}

export default Index;

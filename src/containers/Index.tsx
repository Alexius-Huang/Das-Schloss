import React from 'react';
import SignInModal from './Index.SIgnInModal';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { openModal } from '../actions/ui';
import { Modals } from '../reducers/ui.type';
import 'scss/pages/Index.scss';

const Index: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const activeModal = useSelector((state: RootState) => state.UI.activeModal);

  const handleTransitionToLessonsPage = () => {
    history.push('/lessons');
  };

  return (
    <div className="page page__index">
      {activeModal === Modals.SignIn && <SignInModal />}

      <header className="header">
        <h1 className="header__title">Das Schloss</h1>
        <p className="header__content">Start your journey and learn German today.</p>

        <div className="header__button-group">
          <button
            className="button-rect"
            onClick={handleTransitionToLessonsPage}
          >Try it now!</button>

          <button
            className="button-rect button-rect--light"
            onClick={() => dispatch(openModal(Modals.SignIn))}
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

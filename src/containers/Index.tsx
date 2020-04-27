import React from 'react';
import 'scss/pages/Index.scss';
import { useHistory } from 'react-router-dom';

const Index: React.FC = () => {
  const history = useHistory();

  const handleTransitionToLessonsPage = () => {
    history.push('/lessons');
  };

  return (
    <div className="page page__index">
      <header className="header">
        <h1 className="header__title">Das Schloss</h1>
        <p className="header__content">Start your journey and learn German today.</p>

        <div className="header__button-group">
          <button
            className="button-rect button-rect--dark"
            onClick={handleTransitionToLessonsPage}
          >Start Your Journey</button>

          <button disabled={true} className="button-rect button-rect--light">
            Sign In (Currently Unavailable)
          </button>
        </div>
      </header>
    </div>
  );
}

export default Index;

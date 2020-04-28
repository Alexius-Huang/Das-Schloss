import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../reducers';
import { FaGrinAlt, FaFlag, FaCheck } from 'react-icons/fa';
import 'scss/pages/Lessons.scss';

const Lessons: React.FC = () => {
  return (
    <div className="page page__lessons">
      <div className="card-group">
        <h1 className="card-group__title"><FaFlag /> One Step Forward</h1>

        <ul className="card-group__cards">
          <li className="card card--conversation">
            <button className="card__wrapper-button">
              <span className="card__img-wrapper">
                <FaGrinAlt />
              </span>
              <span className="card__title">Wilkommen!</span>
            </button>
          </li>
        </ul>
      </div>

      <div className="card-group">
        <h1 className="card-group__title"><FaCheck /> Fundamentals I</h1>

        <ul className="card-group__cards">
          <li className="card card--grammer">
            <button className="card__wrapper-button">
              <span className="card__img-wrapper">
                <FaGrinAlt />
              </span>
              <span className="card__title">Personalpronomen</span>
            </button>
          </li>
          <li className="card card--grammer">
            <button className="card__wrapper-button">
              <span className="card__img-wrapper">
                <FaGrinAlt />
              </span>
              <span className="card__title">Das Nomen</span>
            </button>
          </li>
          <li className="card card--grammer">
            <button className="card__wrapper-button">
              <span className="card__img-wrapper">
                <FaGrinAlt />
              </span>
              <span className="card__title">Das Verb</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Lessons;

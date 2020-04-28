import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { LessonFetchState } from '../reducers/lessons.type';
import { FaGrinAlt, FaFlag, FaCheck } from 'react-icons/fa';
import 'scss/pages/Lessons.scss';
import { fetchLessonsStart } from '../actions/lessons';

const Lessons: React.FC = () => {
  const dispatch = useDispatch();

  const fetchState = useSelector((state: RootState) => state.Lessons.fetchState);
  const lessons = useSelector((state: RootState) => state.Lessons.sections);
  useEffect(() => {
    if (fetchState === LessonFetchState.INCOMPLETE) {
      dispatch(fetchLessonsStart());
    }
  });

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

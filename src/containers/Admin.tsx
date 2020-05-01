import React, { useEffect } from 'react';
import QS from 'query-string';
import c from 'classnames';
import Card from '../components/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sectionsSelector, lessonFetchStateSelector } from '../selectors/Lessons';
import { fetchLessonsIfNotExist } from '../actions/lessons';
import { Lesson, LessonFetchState } from '../reducers/lessons.type';
import { LessonType } from '../reducers/lessons.type';
import '../scss/pages/Admin.scss';

interface AdminQueryParams {
  lsID?: string;
}

const lessonTypeMap = new Map([
  [LessonType.Conversation, 'conversation'],
  [LessonType.Vocabulary, 'vocabulary'],
  [LessonType.Grammer, 'grammer']
]);

const Admin: React.FC = () => {
  const sections = useSelector(sectionsSelector);
  const fetchState = useSelector(lessonFetchStateSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = history.location;
  const queries: AdminQueryParams = QS.parse(search);
  const lessonSectionID = queries.lsID ? parseInt(queries.lsID) : undefined;

  let lessons: Lesson[] = [];
  if (fetchState === LessonFetchState.COMPLETED && lessonSectionID !== undefined) {
    lessons = sections.find(s => s.id === lessonSectionID)!.lessons;
  }

  useEffect(() => {
    dispatch(fetchLessonsIfNotExist());
  });

  const handleInspectLessonSection = function (id: number) {
    if (lessonSectionID !== id)
      history.push(`/admin?${QS.stringify({ lsID: id })}`);
  };

  return (
    <div className="page page__admin page--960">
      <section className="lesson-sections">
        <h1 className="lesson-sections__header">Lesson Sections</h1>
        <div className="lesson-sections__button-group">
          <button className="button button-rect button-rect--success">
            New Section
          </button>
        </div>
        
        <ul className="lesson-sections__list">
          {
            sections.map(section => (
              <li
                key={section.id}
                className={c(
                  'lesson-section',
                  lessonSectionID === section.id ? 'lesson-section--active' : ''
                )}
              >
                <a
                  href="#"
                  className="lesson-section__link link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleInspectLessonSection(section.id);
                  }}
                >{section.title}</a>
              </li>
            ))
          }
        </ul>
      </section>

      <section className="lessons">
        <h1 className="lessons__header">Lessons</h1>
        <div className="lessons__dashboard">
          {
            lessonSectionID === undefined ? (
              <p className="lessons__default-info">Please Select a Section</p>
            ) : (
              <ul className="lessons__card-list">
                {
                  lessons.map(lesson => (
                    <Card
                      key={lesson.id} id={lesson.id}
                      classnames={`card--${lessonTypeMap.get(lesson.type)}`}
                      title={lesson.title}
                      icon={lesson.icon}
                      // handleClick={(id) => history.push(`/lesson/${id}`)}
                    />
                  ))
                }

                <Card
                  id={NaN}
                  title="New Lesson"
                  icon="plus"
                />
              </ul>
            )
          }
        </div>
      </section>
    </div>
  );
};

export default Admin;

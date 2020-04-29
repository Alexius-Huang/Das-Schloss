import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CardGroup from '../components/CardGroup';
import Card from '../components/Card';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { LessonFetchState, LessonType } from '../reducers/lessons.type';
import { fetchLessonsStart } from '../actions/lessons';
import 'scss/pages/Lessons.scss';

const lessonTypeMap = new Map([
  [LessonType.Conversation, 'conversation'],
  [LessonType.Vocabulary, 'vocabulary'],
  [LessonType.Grammer, 'grammer']
]);

const Lessons: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fetchState = useSelector((state: RootState) => state.Lessons.fetchState);
  const lessons = useSelector((state: RootState) => state.Lessons.sections);
  useEffect(() => {
    if (fetchState === LessonFetchState.INCOMPLETE) {
      dispatch(fetchLessonsStart());
    }
  });

  return (
    <div className="page page__lessons">
      {
        lessons.map(section => (
          <CardGroup
            key={section.id}
            title={section.title}
            icon={section.icon}
          >
            <ul className="card-group__cards">
              {
                section.lessons.map(lesson => (
                  <Card
                    key={lesson.id} id={lesson.id}
                    classnames={`card--${lessonTypeMap.get(lesson.type)}`}
                    title={lesson.title}
                    icon={lesson.icon}
                    handleClick={(id) => history.push(`/lesson/${id}`)}
                  />
                ))
              }
            </ul>
          </CardGroup>
        ))
      }
    </div>
  );
};

export default Lessons;

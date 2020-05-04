import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CardGroup from '../components/CardGroup';
import Card from '../components/Card';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux.reducers';
import { LessonType } from '../redux.reducers/lessons.type';
import { fetchLessonsIfNotExist, selectLesson } from '../redux.actions/lessons';
import '../scss/pages/Lessons.scss';

const lessonTypeMap = new Map([
  [LessonType.Conversation, 'conversation'],
  [LessonType.Vocabulary, 'vocabulary'],
  [LessonType.Grammer, 'grammer']
]);

const Lessons: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sections = useSelector((state: RootState) => state.Lessons.sections);
  useEffect(() => {
    dispatch(fetchLessonsIfNotExist());
  });

  return (
    <div className="page page__lessons page--960">
      {
        sections.map(section => (
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
                    handleClick={(id) => {
                      dispatch(selectLesson(lesson));
                      history.push(`/lesson/${id}`);
                    }}
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

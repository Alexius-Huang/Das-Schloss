import React, { Fragment } from 'react';
import Card from '../../components/Card';
import { Lesson, LessonType } from '../../reducers/lessons.type';

interface LessonsDashboardProps {
  lessons: Lesson[];
}

const lessonTypeMap = new Map([
  [LessonType.Conversation, 'conversation'],
  [LessonType.Vocabulary, 'vocabulary'],
  [LessonType.Grammer, 'grammer']
]);

const LessonsDashboard: React.FC<LessonsDashboardProps> = (props) => {
  const { lessons } = props;

  return (
    <Fragment>
      <h2 className="lessons__header">Section Lessons</h2>
      <div className="lessons__dashboard">
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
      </div>
    </Fragment>
  );
}

export default LessonsDashboard;

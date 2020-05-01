import React, { Fragment } from 'react';
import QS from 'query-string';
import Card from '../../components/Card';
import { useHistory } from 'react-router-dom';
import { Lesson, LessonType } from '../../reducers/lessons.type';
import useQueries, { AdminQueryParams } from '../../hooks/useQueries';

interface LessonsListProps {
  lessons: Lesson[];
}

const lessonTypeMap = new Map([
  [LessonType.Conversation, 'conversation'],
  [LessonType.Vocabulary, 'vocabulary'],
  [LessonType.Grammer, 'grammer']
]);

const LessonsList: React.FC<LessonsListProps> = (props) => {
  const { lessons } = props;
  const history = useHistory();
  const queries: AdminQueryParams = useQueries();
  const { lsID } = queries;

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
                handleClick={(id) => {
                  history.push(`/admin?${QS.stringify({ lsID, lID: lesson.id })}`);
                }}
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

export default LessonsList;

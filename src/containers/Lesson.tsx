import React from 'react';
import Markdown from 'markdown-to-jsx';
import useOnce from '../hooks/useOnce';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonContentReset, fetchLessonContentStart } from '../redux.actions/lessons';
import { useRouteMatch } from 'react-router-dom';
import { selectLessonContentFetchState } from '../redux.selectors/Lessons';
import '../scss/pages/Lesson.scss';

const Dialogue: React.FC<{ translation: string; }> = (props) => {
  return (
    <div className="dialogue">
      <h2>{props.translation}</h2>
      <p>{props.children}</p>
    </div>
  );
};

const overrides = {
  Dialogue: { component: Dialogue },
};

const Lesson: React.FC = () => {
  const dispatch = useDispatch();
  const { instance: lessonContent } = useSelector(selectLessonContentFetchState);
  const match = useRouteMatch<{ id: string }>();
  const lessonId = parseInt(match.params.id, 10);

  useOnce(() => {
    dispatch(fetchLessonContentReset());
    dispatch(fetchLessonContentStart(lessonId));
  });

  return (
    <div className="page page__lesson page--960">
      <h1 className="lesson_header">{lessonContent?.lesson.title ?? 'Loading title of the lesson...'}</h1>

      <div className="lesson__content">
        <Markdown options={{ overrides }}>
          {lessonContent?.content ?? 'Loading...'}
        </Markdown> 
      </div>
    </div>
  );
}

export default Lesson;

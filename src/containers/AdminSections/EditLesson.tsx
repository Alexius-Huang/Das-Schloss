import React, { Fragment, useState, useEffect } from 'react';
import LessonInfo from './EditLesson.Info';
import LessonContent from './EditLesson.Content';
import * as T from '../../redux.reducers/lessons.type';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux.actions/lessons';
import { selectLessonContentFetchState } from '../../redux.selectors/Lessons';
import useOnce from '../../hooks/useOnce';
// import { Noun, Verb } from '../../redux.reducers/vocabulary.type';

interface LessonInfoProps {
  lesson: T.Lesson;
}

const EditLesson: React.FC<LessonInfoProps> = (props) => {
  const { lesson } = props;
  const dispatch = useDispatch();
  const lessonContent = useSelector(selectLessonContentFetchState);
  const [content, setContent] = useState('Loading...');
  // const [nouns, setNouns] = useState<Noun[]>([]);
  // const [verbs, setVerbs] = useState<Verb[]>([]);

  useOnce(() => {
    dispatch(actions.fetchLessonContentReset());
    dispatch(actions.fetchLessonContentStart(lesson.id));
  });

  useEffect(() => {
    const { instance: i } = lessonContent;
    if (i) {
      setContent(i.content);
      // setNouns(i.nouns);
      // setVerbs(i.verbs);
    }
  }, [lessonContent]);

  // console.log(nouns, verbs);

  const handleUpdateLesson = function(params: T.Lesson) {
    dispatch(actions.updateLessonStart({ id: lesson.id, params }));
  };

  const handleUpdateLessonContent = function(params: { content: string }) {
    dispatch(actions.updateLessonContentStart({ lessonId: lesson.id, params }));
  };

  return (
    <Fragment>
      <LessonInfo
        lesson={lesson}
        onSubmit={handleUpdateLesson}
      />

      <LessonContent
        content={content}
        setContent={setContent}
        onSubmit={handleUpdateLessonContent}
      />
    </Fragment>
  );
}

export default EditLesson;

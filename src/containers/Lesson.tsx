import React from 'react';
import Markdown from 'markdown-to-jsx';
import c from 'classnames';
import useOnce from '../hooks/useOnce';
import { Dialogue, Hint, Noun, Verb } from '../components/Lesson';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonContentReset, fetchLessonContentStart } from '../redux.actions/lessons';
import { useRouteMatch } from 'react-router-dom';
import { selectLessonContentFetchState } from '../redux.selectors/Lessons';
import '../scss/pages/Lesson.scss';

const overrides = {
  Dialogue: { component: Dialogue },
  Hint: { component: Hint },
  Noun: { component: Noun },
};

const Lesson: React.FC = () => {
  const dispatch = useDispatch();
  const { instance: lessonContent } = useSelector(selectLessonContentFetchState);
  const match = useRouteMatch<{ id: string }>();
  const lessonId = parseInt(match.params.id, 10);
  const nouns = lessonContent?.nouns ?? [];
  const verbs = lessonContent?.verbs ?? [];
  const hasVocabularies = nouns.length !== 0 || verbs.length !== 0;

  useOnce(() => {
    dispatch(fetchLessonContentReset());
    dispatch(fetchLessonContentStart(lessonId));
  });

  return (
    <div className="page page__lesson page--960">
      <h1 className="lesson__header">{lessonContent?.lesson.title ?? 'Loading title of the lesson...'}</h1>

      <div className="lesson__content">
        <Markdown options={{ overrides }}>
          {lessonContent?.content ?? 'Loading...'}
        </Markdown>
      </div>

      <div className={c('lesson__vocabularies', { hide: !hasVocabularies })}>
        <h2 className="lesson__header">Vocabularies</h2>

        <h3 className={c('lesson_sub-header', { hide: nouns.length === 0 })}>Nouns</h3>
        {
          nouns.map(noun => (
            <Noun
              key={noun.id}
              translation={noun.translation}
              gender={noun.gender}
              plural={noun.plural}
            >{noun.name}</Noun>
          ))
        }

        <h3 className={c('lesson_sub-header', { hide: verbs.length === 0 })}>Verbs</h3>
        {
          verbs.map(verb => (
            <Verb
              key={verb.id}
              translation={verb.translation}
              ipc={verb.ipc}
            >{verb.name}</Verb>
          ))
        }
      </div>
    </div>
  );
}

export default Lesson;

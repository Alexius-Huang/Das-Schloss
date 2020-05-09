import React, { Fragment, useState, useEffect } from 'react';
import Form, { TextField, OptionField, MarkdownField } from '../../components/Form';
import { Lesson, LessonType, NewLesson } from '../../redux.reducers/lessons.type';
import { useDispatch, useSelector } from 'react-redux';
import { updateLessonStart, fetchLessonContentReset, fetchLessonContentStart } from '../../redux.actions/lessons';
import { selectLessonContentFetchState } from '../../redux.selectors/Lessons';
import { Noun, Verb } from '../../redux.reducers/vocabulary.type';
import useOnce from '../../hooks/useOnce';
import 'react-mde/lib/styles/css/react-mde-all.css';

interface LessonInfoProps {
  lesson: Lesson;
}

const LessonInfo: React.FC<LessonInfoProps> = (props) => {
  const { lesson } = props;
  const dispatch = useDispatch();
  const lessonContent = useSelector(selectLessonContentFetchState);
  const [title, setTitle] = useState(lesson.title);
  const [type, setType] = useState(lesson.type);
  const [content, setContent] = useState('Loading...');
  const [nouns, setNouns] = useState<Noun[]>([]);
  const [verbs, setVerbs] = useState<Verb[]>([]);

  useOnce(() => {
    dispatch(fetchLessonContentReset());
    dispatch(fetchLessonContentStart(lesson.id));
  });

  useEffect(() => {
    const { instance: i } = lessonContent;
    if (i) {
      setContent(i.content);
      setNouns(i.nouns);
      setVerbs(i.verbs);
    }
  }, [lessonContent.instance]);

  console.log(nouns, verbs);

  const handleSubmit = function(params: NewLesson) {
    dispatch(updateLessonStart({ id: lesson.id, params }));
  };

  return (
    <Fragment>
      <h2 className="lessons__header">Lesson Info</h2>
      <div className="lessons__lesson-info">
        <Form
          name="update-lesson-info"
          onSubmit={handleSubmit}
          submitButtonOption={{
            content: 'Update Lesson',
            style: 'success'
          }}
        >
          <TextField
            title="Title"
            name="title"
            placeholder="Lesson Title"
            value={title}
            bind={setTitle}
          />

          <OptionField
            title="Type"
            name="type"
            options={[
              { value: LessonType.Conversation, name: 'Conversation' },
              { value: LessonType.Vocabulary, name: 'Vocabulary' },
              { value: LessonType.Grammer, name: 'Grammer' }
            ]}
            value={type}
            bind={setType}
          />

          <h2 className="lessons__edit-lesson-content-header">Edit Lesson Content</h2>
          <div className="lessons__markdown-editor-button-group">
          <button
              className="button button-rect button-rect--sm button-rect--warning"
              onClick={(event) => {
                event.preventDefault();
                setContent(`${content}\n<Dialogue translation=""></Dialogue>`);
              }}
            >Dialogue</button>
            <button
              className="button button-rect button-rect--sm button-rect--warning"
              onClick={(event) => {
                event.preventDefault();
                setContent(`${content}\n<Hint title=""></Hint>`);
              }}
            >Hint</button>
            <button
              className="button button-rect button-rect--sm button-rect--warning"
              onClick={(event) => {
                event.preventDefault();
                setContent(`${content}\n<Noun translation="" gender="m" plural=""></Noun>`);
              }}
            >Noun</button>
          </div>
          
          <MarkdownField
            title="Content"
            name="content"
            value={content}
            bind={setContent}
          />
        </Form>
      </div>
    </Fragment>
  );
}

export default LessonInfo;

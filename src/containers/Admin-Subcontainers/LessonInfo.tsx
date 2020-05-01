import React, { Fragment, useState, useEffect } from 'react';
import Form, { TextField, OptionField } from '../../components/Form';
import { Lesson, LessonType } from '../../reducers/lessons.type';

interface LessonInfoProps {
  lesson: Lesson;
}

const LessonInfo: React.FC<LessonInfoProps> = (props) => {
  const { lesson } = props;
  const [title, setTitle] = useState(lesson.title);
  const [type, setType] = useState(lesson.type);

  useEffect(() => {
    setTitle(lesson.title);
  }, [lesson.title]);

  return (
    <Fragment>
      <h2 className="lessons__header">Lesson Info</h2>
      <div className="lessons__lesson-info">
        <Form
          name="update-lesson-info"
          onSubmit={() => console.log('update-lesson')}
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
            bindState={setTitle}
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
            bindState={setType}
          />
        </Form>
      </div>
    </Fragment>
  );
}

export default LessonInfo;

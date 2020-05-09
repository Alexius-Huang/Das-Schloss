import React, { Fragment, useState } from 'react';
import Form, { TextField, OptionField } from '../../components/Form';
import { Lesson, LessonType, NewLesson } from '../../redux.reducers/lessons.type';

interface LessonInfoProps {
  lesson: Lesson;
  onSubmit(params: NewLesson): void;
}

const LessonInfo: React.FC<LessonInfoProps> = (props) => {
  const { lesson } = props;
  const [title, setTitle] = useState(lesson.title);
  const [type, setType] = useState(lesson.type);

  return (
    <Fragment>
      <h2 className="lessons__header">Lesson Info</h2>
      <div className="lessons__lesson-info">
        <Form
          name="update-lesson-info"
          onSubmit={props.onSubmit}
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
        </Form>
      </div>
    </Fragment>
  );
}

export default LessonInfo;

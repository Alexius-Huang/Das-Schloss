import React, { Fragment, useState } from 'react';
import QS from 'query-string';
import Form, { TextField } from '../../components/Form';
import { NewSection, APIState as CreationState } from '../../redux.reducers/lessons.type';
import { useDispatch, useSelector } from 'react-redux';
import { createLessonSectionStart, createLessonSectionReset } from '../../redux.actions/lessons';
import { RootState } from '../../redux.reducers';
import { useHistory } from 'react-router-dom';

const NewLessonSection: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const { state: s, instance: ci } = useSelector(
    (state: RootState) => state.Lessons.createLessonSection
  );

  if (s === CreationState.STATIC && ci !== null) {
    const { id: lsID } = ci;
    dispatch(createLessonSectionReset());
    history.push(`/admin?${QS.stringify({ lsID })}`);
  }

  const handleSubmit = (params: NewSection) => {
    dispatch(createLessonSectionStart(params));
  };

  return (
    <Fragment>
      <h2 className="lessons__header">New Section</h2>
      <div className="lessons__new-section-form">
        <Form
          name="new-section"
          onSubmit={handleSubmit}
          submitButtonOption={{
            content: 'Create New Lesson Section',
            style: 'success'
          }}
        >
          <TextField
            title="Title"
            name="title"
            placeholder="Section Title"
            value={title}
            bind={setTitle}
          />
        </Form>
      </div>
    </Fragment>
  )
};

export default NewLessonSection;

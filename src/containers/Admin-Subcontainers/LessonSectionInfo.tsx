import React, { Fragment, useState, useEffect } from 'react';
import Form, { TextField } from '../../components/Form';
import { Section } from '../../reducers/lessons.type';

interface LessonSectionInfoProps {
  section: Section;
}

const LessonSectionInfo: React.FC<LessonSectionInfoProps> = (props) => {
  const { section } = props;
  const [title, setTitle] = useState(section.title);

  useEffect(() => {
    setTitle(section.title);
  }, [section.title]);

  return (
    <Fragment>
      <h2 className="lessons__header">Section Info</h2>
      <div className="lessons__section-info">
        <Form
          name="update-section-info"
          onSubmit={() => console.log('update-section')}
          submitButtonOption={{
            content: 'Update Section',
            style: 'success'
          }}
        >
          <TextField
            title="Title"
            name="title"
            placeholder="Section Title"
            value={title}
            bindState={setTitle}
          />
        </Form>
      </div>
    </Fragment>
  );
}

export default LessonSectionInfo;

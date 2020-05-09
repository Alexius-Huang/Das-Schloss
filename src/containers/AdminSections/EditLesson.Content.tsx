import React, { Fragment } from 'react';
import Form, { MarkdownField } from '../../components/Form';
import 'react-mde/lib/styles/css/react-mde-all.css';

interface LessonContentProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onSubmit(params: { content: string }): void;
}

const LessonContent: React.FC<LessonContentProps> = ({ content, setContent, onSubmit }) => {
  return (
    <Fragment>
      <h2 className="lessons__header">Lesson Content</h2>
      <div className="lessons__lesson-content">
        <Form
          name="update-lesson-content"
          onSubmit={onSubmit}
          submitButtonOption={{
            content: 'Update Lesson',
            style: 'success'
          }}
        >
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

export default LessonContent;

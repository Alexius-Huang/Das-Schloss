import React, { useState } from 'react';
import MarkdownEditor from 'react-mde';
import { Converter } from 'showdown';

interface MarkdownFieldProps {
  name: string;
  value: string;
  title?: string;
  onInput?: (value: string) => void;
  bind?: React.Dispatch<React.SetStateAction<string>>;
}

const converter = new Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const MarkdownField: React.FC<MarkdownFieldProps> = (props) => {
  const { name } = props;
  const fieldClass = `text-field--${name}`;
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  return (
    <div className="form__field markdown-field">
      <label htmlFor={fieldClass} className="form__field-label markdown-field__label">{props.title ?? name}</label>
      <textarea
        name={name} id={fieldClass}
        onChange={() => {}}
        className="markdown-field__textarea"
        cols={30}
        rows={10}
        value={props.value}
      ></textarea>

      <MarkdownEditor
        value={props.value}
        onChange={(value) => {
          props.bind?.(value);
          props.onInput?.(value);
        }}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>    
  );
}

export default MarkdownField;

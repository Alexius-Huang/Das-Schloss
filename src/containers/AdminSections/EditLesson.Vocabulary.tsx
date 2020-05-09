import React, { Fragment } from 'react';
// import Form from '../../components/Form';
import { Noun, Verb } from '../../redux.reducers/vocabulary.type';

interface LessonVocabularyProps {
  nouns: Noun[];
  verbs: Verb[];
  onSubmit: () => void;
}

// function renderColumnTitle(columns: string[]) {
//   return (
//     <tr>{columns.map((c, i) => <th key={i}>{c}</th>)}</tr>
//   );
// }

// type Dictionary = {
//   [key: string]: any;
// };

// function renderColumns<T extends Dictionary>(values: T[], properties: (keyof T)[], keyProperty: keyof T) {
//   return values.map(value => (
//     <tr key={value[keyProperty]}>
//       {properties.map(prop => (<td key={`${keyProperty}-${prop}`}>{value[prop]}</td>))}
//     </tr>
//   ));
// }

const LessonVocabulary: React.FC<LessonVocabularyProps> = (props) => {
  return (
    <Fragment>
      <h2 className="lessons__header">TODO: Lesson Vocabulary</h2>
      {/* <div className="lessons__lesson-vocabulary">
        <h3 className="lessons_header">Nouns</h3>
        <table>
          <thead>{renderColumnTitle(['Noun', 'Translation', 'Gender', 'Plural'])}</thead>
          <tbody>{renderColumns(props.nouns, ['name', 'translation', 'gender', 'plural'], 'id')}</tbody>
        </table>

        <h3 className="lessons_header">Verbs</h3>
        <table>
          <thead>{renderColumnTitle(['Verb', 'Translation'])}</thead>
          <tbody>{renderColumns(props.verbs, ['name', 'translation'], 'id')}</tbody>
        </table>
      </div> */}
    </Fragment>
  );
}

export default LessonVocabulary;

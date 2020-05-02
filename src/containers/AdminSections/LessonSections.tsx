import React from 'react';
import QS from 'query-string';
import c from 'classnames';
import useQueries, { AdminQueryParams } from '../../hooks/useQueries';
import { Section } from '../../reducers/lessons.type';
import { useHistory } from 'react-router-dom';

interface LessonSectionsProps {
  sections: Section[];
  onInspectSection: (id: number) => void;
}

const LessonSections: React.FC<LessonSectionsProps> = (props) => {
  const { sections, onInspectSection } = props;
  const history = useHistory();
  const queries: AdminQueryParams = useQueries();
  const lessonSectionID = queries.lsID ? parseInt(queries.lsID) : undefined;

  return (
    <section className="lesson-sections">
      <h1 className="lesson-sections__header">Lesson Sections</h1>
      <div className="lesson-sections__button-group">
        <button
          className="button button-rect button-rect--success"
          onClick={() => history.push(`/admin?${QS.stringify({ lsNew: true })}`)}
        >New Section</button>
      </div>
      
      <ul className="lesson-sections__list">
        {
          sections.map(section => (
            <li
              key={section.id}
              className={c(
                'lesson-section',
                lessonSectionID === section.id ? 'lesson-section--active' : ''
              )}
            >
              <a
                href="#"
                className="lesson-section__link link"
                onClick={(e) => {
                  e.preventDefault();
                  onInspectSection(section.id);
                }}
              >{section.title}</a>
            </li>
          ))
        }
      </ul>
    </section>
  );
};

export default LessonSections;

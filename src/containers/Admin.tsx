import React, { useEffect, Fragment } from 'react';
import QS from 'query-string';
import { LessonSections, LessonsDashboard, LessonSectionInfo } from './Admin-Subcontainers';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sectionsSelector, lessonFetchStateSelector } from '../selectors/Lessons';
import { fetchLessonsIfNotExist } from '../actions/lessons';
import { Lesson, LessonFetchState, Section } from '../reducers/lessons.type';
import useQueries, { AdminQueryParams } from '../hooks/useQueries';
import '../scss/pages/Admin.scss';

const Admin: React.FC = () => {
  const sections = useSelector(sectionsSelector);
  const fetchState = useSelector(lessonFetchStateSelector);
  const fetchedComplete = fetchState === LessonFetchState.COMPLETED;
  const dispatch = useDispatch();
  const history = useHistory();
  const queries: AdminQueryParams = useQueries();
  const lessonSectionID = queries.lsID ? parseInt(queries.lsID) : undefined;
  const targetSection: Section = lessonSectionID === undefined ?
    { id: NaN, title: 'Section Title', icon: 'check', lessons: [] } :
    sections.find(s => s.id === lessonSectionID) as Section;

  let lessons: Lesson[] = [];
  if (fetchedComplete && lessonSectionID !== undefined) {
    lessons = sections.find(s => s.id === lessonSectionID)!.lessons;
  }

  useEffect(() => {
    dispatch(fetchLessonsIfNotExist());
  });

  const handleInspectLessonSection = function (id: number) {
    if (lessonSectionID !== id)
      history.push(`/admin?${QS.stringify({ lsID: id })}`);
  };

  return (
    <div className="page page__admin page--960">
      <LessonSections
        sections={sections}
        onInspectSection={handleInspectLessonSection}
      />

      <section className="lessons">
        <h1 className="lessons__header">Manage Lessons in Section</h1>

        {
          lessonSectionID === undefined || ( ! fetchedComplete) ? (
            <p className="lessons__default-info">Please Select a Section</p>
          ) : (
            <Fragment>
              <LessonSectionInfo section={targetSection} />
              <LessonsDashboard lessons={lessons} />
            </Fragment>
          )
        }
      </section>
    </div>
  );
};

export default Admin;
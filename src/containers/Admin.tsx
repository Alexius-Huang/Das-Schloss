import React, { useEffect, Fragment } from 'react';
import QS from 'query-string';
import APISuccessModal from './Modals/APISuccess';
import * as AdminSection from './AdminSections';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectSections, selectLessonFetchState } from '../redux.selectors/Lessons';
import { fetchLessonsIfNotExist } from '../redux.actions/lessons';
import { Lesson, LessonFetchState, Section, LessonType } from '../redux.reducers/lessons.type';
import useQueries, { AdminQueryParams } from '../hooks/useQueries';
import { selectModal } from '../redux.selectors/UI';
import { Modals } from '../redux.reducers/ui.type';
import '../scss/pages/Admin.scss';

const Admin: React.FC = () => {
  const modal = useSelector(selectModal);
  const sections = useSelector(selectSections);
  const fetchState = useSelector(selectLessonFetchState);
  const fetchedComplete = fetchState === LessonFetchState.COMPLETED;
  const dispatch = useDispatch();
  const history = useHistory();
  const queries: AdminQueryParams = useQueries();
  const lessonSectionID = queries.lsID ? parseInt(queries.lsID) : undefined;
  const lessonID = queries.lID ? parseInt(queries.lID) : undefined;
  const targetSection: Section = lessonSectionID === undefined ?
    { id: NaN, title: 'Section Title', icon: 'check', lessons: [] } :
    sections.find(s => s.id === lessonSectionID) as Section;

  let lessons: Lesson[] = [];
  let targetLesson: Lesson = { id: NaN, type: LessonType.Conversation, title: '-', icon: 'check' /*, content: '-'*/ };
  if (fetchedComplete && lessonSectionID !== undefined) {
    lessons = sections.find(s => s.id === lessonSectionID)!.lessons;

    if (lessonID !== undefined) {
      targetLesson = lessons.find(l => l.id === lessonID) as Lesson;
    }
  }

  useEffect(() => {
    dispatch(fetchLessonsIfNotExist());
  });

  const handleInspectLessonSection = function (id: number) {
    if (lessonSectionID !== id)
      history.push(`/admin?${QS.stringify({ lsID: id })}`);
  };

  let renderLessons: JSX.Element;
  if (queries.lsNew) {
    renderLessons = <AdminSection.NewLessonSection />;
  } else if (lessonSectionID === undefined || ( ! fetchedComplete)) {
    renderLessons = (
      <p className="lessons__default-info">Please Select a Section</p>
    );
  } else if (lessonID !== undefined) {
    renderLessons = <AdminSection.LessonInfo lesson={targetLesson} />;
  } else {
    renderLessons = (
      <Fragment>
        <AdminSection.LessonSectionInfo section={targetSection} />
        <AdminSection.LessonsList lessons={lessons} />
      </Fragment>
    );
  }

  return (
    <div className="page page__admin page--960">
      {modal.type === Modals.APISuccess && <APISuccessModal {...modal} />}

      <AdminSection.LessonSections
        sections={sections}
        onInspectSection={handleInspectLessonSection}
      />

      <section className="lessons">
        <h1 className="lessons__header">Manage Lessons in Section</h1>
        {renderLessons}
      </section>
    </div>
  );
};

export default Admin;

import { NewSection, UpdateSection, UpdateLesson } from "../redux.reducers/lessons.type";

export function fetchAllLessons() {
  return fetch('/lessons')
    .then(res => res.json());
}

export function fetchLessonContent(lessonId: number) {
  return fetch(`/lesson/content/${lessonId}`)
    .then(res => res.json());
}

export function createLessonSection(params: NewSection) {
  return fetch('/lesson-section', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  }).then(res => res.json());
}

export function updateLessonSection(id: number, params: UpdateSection) {
  return fetch(`/lesson-section/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }).then(res => res.json());
}

export function updateLesson(params: UpdateLesson) {
  return fetch(`/lesson/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params.params),
  }).then(res => res.json());
}

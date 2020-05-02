import { NewSection } from "../reducers/lessons.type";

export function fetchAllLessons() {
  return fetch('/lessons')
    .then(res => res.json());
}

export function createLessonSection(params: NewSection) {
  return fetch('/lesson-section', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  }).then(res => res.json());
}

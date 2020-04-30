export function fetchAllLessons() {
  return fetch('/lessons')
    .then(res => res.json());
}

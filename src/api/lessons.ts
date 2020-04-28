const url = 'http://localhost:3001';

export function fetchAllLessons() {
  return fetch(`${url}/sections?_embed=lessons`)
    .then(res => res.json());
}

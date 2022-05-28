import { Movie, Person } from 'types';

export function getImageByPath(path: string) {
  return `https://image.tmdb.org/t/p/w500${path}`;
}

export function isMovie(obj: any): obj is Movie.Movie {
  return 'title' in obj;
}

export function isPerson(obj: any): obj is Person.ActorResponse {
  return 'name' in obj;
}

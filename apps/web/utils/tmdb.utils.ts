import { Movie, Person } from 'types';
import { Filter } from 'types/filter.types';

export function getImageByPath(path: string) {
  return `https://image.tmdb.org/t/p/w500${path}`;
}

export function getFullImageByPath(path: string) {
  return `https://image.tmdb.org/t/p/original${path}`;
}

export function isMovie(obj: any): obj is Movie.Movie {
  return 'title' in obj;
}

export function isPerson(obj: any): obj is Person.PersonResponse {
  return 'name' in obj;
}

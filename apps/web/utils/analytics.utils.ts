const axios = require('axios');
const _ = require("lodash");
import { AxiosResponse } from "axios";
import { Discover, Analytics, WatchList, Person, Credits } from "types";

const baseEndpointForDiscover = (actorId: number, page: number) => `${process.env.NEXT_PUBLIC_TMDB_API_ENDPOINT}/discover/movie?with_cast=${actorId}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}&language=en-US`;
const baseEndpointForCredits = (movieId: string) => `${process.env.NEXT_PUBLIC_TMDB_API_ENDPOINT}/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`;

const getAverageMovieRatingOverTheYearsOfActor = async (actorId: number): Promise<Analytics.AverageRatingOverYears[]> => {
  const response: AxiosResponse<Discover.DiscoverResponse> = await axios.get(baseEndpointForDiscover(actorId, 1));

  let allMovies = await fetchAllPages(actorId, response.data);
  allMovies = allMovies.filter(movie => movie.release_date && movie.vote_average);
  allMovies = allMovies.map(movie => { return { ...movie, release_date_js: new Date(movie.release_date) } });
  let groupedByYears = _.groupBy(allMovies, (movie: Discover.Result) => movie.release_date_js.getFullYear());
  let groupedByRating = _.mapValues(groupedByYears, (movies: Discover.Result[]) => {
    return {
      rating: _.meanBy(movies, 'vote_average'),
    }
  });

  const avereageRatingOverYears = Object.keys(groupedByRating).map(year => {
    return {
      year: parseInt(year),
      rating: groupedByRating[year].rating,
    }
  });

  return avereageRatingOverYears;
};

function fetchAllPages(actorId: number, initialData: Discover.DiscoverResponse): Promise<Discover.Result[]> {
  let endpoints = [];

  for (let i = 1; i <= initialData.total_pages; i++) {
    endpoints.push(baseEndpointForDiscover(actorId, i));
  }

  const allMovies = Promise.all(
    endpoints.map((endpoint) => axios.get(endpoint)))
    .then(
      axios.spread((...allPages: AxiosResponse<Discover.DiscoverResponse>[]) => {
        const resultsArray = [...allPages.map(res => res.data.results)];
        return Array.prototype.concat.apply([], resultsArray);
      })
    );

  return allMovies;
}

const getFavoriteGenres = (watchLists: WatchList.WatchList[]): Analytics.FavoriteGenres[] => {
  let result: Analytics.FavoriteGenres[] = [];

  if (watchLists.length !== 0) {
    const movies = watchLists.map(watchList => watchList.movies).flat().filter(movie => movie?.genres);
    const genres = movies.map(movie => movie?.genres.slice(0, 2)).flat();
    const genresGroupedByName = _.groupBy(genres, (genre: WatchList.Genre) => genre.name);
    result = Object.keys(genresGroupedByName).map(genre => {
      return {
        quantity: Number(genresGroupedByName[genre].length),
        name: genre,
      }
    });
    result = result.sort();
  }
  return result;
}

function fetchAllMovieCasts(movies: (WatchList.Movie | undefined)[]): Promise<Person.ActorResponse[]> {
  let endpoints = [];

  for (let i = 0; i < movies!.length; i++) {
    endpoints.push(baseEndpointForCredits(movies[i]?.movieId!));
  }

  const allCasts = Promise.all(
    endpoints.map((endpoint) => axios.get(endpoint)))
    .then(
      axios.spread((...allPages: AxiosResponse<Credits.Credits>[]) => {
        const resultsArray = [...allPages.map(res => res.data.cast)];
        return Array.prototype.concat.apply([], resultsArray);
      })
    );

  return allCasts;
}

const getFavoriteActors = async (watchLists: WatchList.WatchList[]): Promise<Analytics.FavoriteAcotrs[]> => {
  let result: Analytics.FavoriteAcotrs[] = [];

  if (watchLists.length !== 0) {
    const movies = watchLists.filter(watchList => watchList.movies).map(watchList => { if (watchList.movies) return watchList.movies }).flat();
    if (movies.length !== 0) {

      let allCasts = await fetchAllMovieCasts(movies);

      const groupedByActorId = _.groupBy(allCasts, (cast: Person.ActorResponse) => cast.id);
      let actors = Object.keys(groupedByActorId).map(id => {
        return {
          quantity: Number(groupedByActorId[id].length),
          actor: groupedByActorId[id][0] as Person.ActorResponse,
        }
      }).sort((a, b) => a.quantity - b.quantity);

      result = actors.slice(0, 12);
    }
  }
  return result;
}

export { getAverageMovieRatingOverTheYearsOfActor, getFavoriteGenres, getFavoriteActors };
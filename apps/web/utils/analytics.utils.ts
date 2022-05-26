const axios = require('axios');
const _ = require("lodash");
import { AxiosResponse } from "axios";
import { Discover, Analytics } from "types";

const baseEndpointForDiscover = (actorId: number, page: number) => `${process.env.NEXT_PUBLIC_TMDB_API_ENDPOINT}/discover/movie?with_cast=${actorId}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}&language=en-US`;
const baseEndpointForMovie = (movieId: number) => `${process.env.NEXT_PUBLIC_TMDB_API_ENDPOINT}/movie/${movieId}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`

export async function getAverageMovieRatingOverTheYearsOfActor(actorId: number): Promise<Analytics.AverageRatingOverYears[]> {
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



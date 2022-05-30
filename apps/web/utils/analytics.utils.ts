import groupBy from 'lodash/groupBy';
import meanBy from 'lodash/meanBy';
import mapValues from 'lodash/mapValues';
import compact from 'lodash/compact';
import { Discover, Analytics, WatchList, Credits } from 'types';
import store from 'redux/store';
import { DiscoverEndpoints } from 'redux/endpoints/discover.endpoints';
import { CreditsEndpoints } from 'redux/endpoints/credits.endpoints';

const MAX_FAVORITE_ACTORS = 12;
const MAX_MOST_IMPORTANT_GENRES = 2;

const getAverageMovieRatingOverTheYearsOfActor = async (
  personId: number,
): Promise<Analytics.AverageRatingOverYears[]> => {
  let avereageRatingOverYears: Analytics.AverageRatingOverYears[] = [];
  const response = await store.dispatch(
    DiscoverEndpoints.endpoints.getMoviesOfActor.initiate({
      personId,
      page: 1,
    }),
  );

  if (response.isError || response.data?.results.length === 0)
    return avereageRatingOverYears;

  let allMovies = await fetchAllPages(personId, response.data!);
  allMovies = compact(allMovies);
  allMovies = allMovies.filter(
    (movie) => movie.release_date && movie.vote_average,
  );
  allMovies = allMovies.map((movie) => {
    return { ...movie, release_date_js: new Date(movie.release_date) };
  });
  let groupedByYears = groupBy(allMovies, (movie: Discover.Result) =>
    movie.release_date_js.getFullYear(),
  );
  let groupedByRating = mapValues(
    groupedByYears,
    (movies: Discover.Result[]) => {
      return {
        rating: meanBy(movies, 'vote_average'),
      };
    },
  );

  avereageRatingOverYears = Object.keys(groupedByRating).map((year) => {
    return {
      year: parseInt(year),
      rating: groupedByRating[year].rating,
    };
  });

  return avereageRatingOverYears;
};

function fetchAllPages(
  personId: number,
  initialData: Discover.DiscoverResponse,
): Promise<Discover.Result[]> {
  let endpoints = [];

  for (let i = 1; i <= initialData.total_pages; i++) {
    endpoints.push({ personId, page: i });
  }

  const allMovies = Promise.all(
    endpoints.map((endpoint) =>
      store.dispatch(
        DiscoverEndpoints.endpoints.getMoviesOfActor.initiate(endpoint),
      ),
    ),
  )
    .then((result) => {
      return result.map((res) => res.data?.results!);
    })
    .then((result) => {
      return result?.flat();
    });

  return allMovies;
}

const getFavoriteGenres = (
  watchLists: WatchList.WatchList[],
): Analytics.FavoriteGenres[] => {
  let result: Analytics.FavoriteGenres[] = [];

  if (watchLists.length !== 0) {
    const movies = watchLists
      .map((watchList) => watchList.movies)
      .flat()
      .filter((movie) => movie?.genres);
    const genres = movies
      .map((movie) => movie?.genres.slice(0, MAX_MOST_IMPORTANT_GENRES))
      .flat();
    const genresGroupedByName = groupBy(
      genres,
      (genre: WatchList.Genre) => genre.name,
    );
    result = Object.keys(genresGroupedByName).map((genre) => {
      return {
        quantity: Number(genresGroupedByName[genre].length),
        name: genre,
      };
    });
    result = result.sort();
  }
  return result;
};

function fetchAllMovieCasts(
  movies: WatchList.Movie[],
): Promise<Credits.Cast[]> {
  const allCasts = Promise.all(
    movies.map((movie) =>
      store.dispatch(
        CreditsEndpoints.endpoints.getMovieCredits.initiate(movie.movieId),
      ),
    ),
  )
    .then((result) => {
      return result.map((res) => res.data?.cast!);
    })
    .then((result) => {
      return result?.flat();
    });

  return allCasts;
}

const getFavoriteActors = async (
  watchLists: WatchList.WatchList[],
): Promise<Analytics.FavoriteAcotrs[]> => {
  let result: Analytics.FavoriteAcotrs[] = [];

  if (watchLists.length !== 0) {
    const movies = watchLists
      .filter((watchList) => watchList.movies!)
      .map((watchList) => watchList.movies)
      .flat();
    if (movies.length !== 0) {
      // fetching all casts of all movies in your watchlist in parralel
      let allCasts = await fetchAllMovieCasts(movies);
      allCasts = compact(allCasts);
      // getting all the unique actors, because we dont want to show the same actor multiple times
      // and grouping them by appearances in your watchlist movies
      const groupedByActorId = groupBy(allCasts, (cast) => cast.id);
      let actors = Object.keys(groupedByActorId)
        .map((id) => {
          return {
            quantity: Number(groupedByActorId[id].length),
            actor: groupedByActorId[id][0],
          };
        })
        .sort((a, b) => b.quantity - a.quantity)
        .sort((a, b) => b.actor.popularity - a.actor.popularity);

      console.log(actors);

      result = actors.slice(0, MAX_FAVORITE_ACTORS);
    }
  }
  return result;
};

export {
  getAverageMovieRatingOverTheYearsOfActor,
  getFavoriteGenres,
  getFavoriteActors,
};

import React, { useState } from 'react';
import { Movie } from 'types';
import * as Styles from './MovieList.styles';
import MovieCard from 'components/Cards/MovieCard';

interface MovieListProps {
  movies: Movie.Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  console.log('movies', movies);

  return (
    <>
      {movies ? (
        <Styles.MovieList>
          {movies && movies.length
            ? // movies.map((movie) => <MovieCard key={movie.id} />)
              movies.map((movie) => (
                <div
                  style={{
                    width: 100,
                    height: 200,
                    background: 'red',
                    marginRight: 20,
                  }}
                  key={movie.id}
                />
              ))
            : movies.map((movie) => (
                <div
                  style={{ width: 100, height: 200, background: 'blue' }}
                  key={movie.id}
                />
              ))}
          <Styles.RightButton></Styles.RightButton>
        </Styles.MovieList>
      ) : (
        <></>
      )}
    </>
  );
};

export default MovieList;

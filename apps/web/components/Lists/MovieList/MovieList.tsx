import React, { useRef, useState } from 'react';
import { Movie } from 'types';
import * as Styles from './MovieList.styles';
import MovieCard from 'components/Cards/MovieCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MovieModalContainer from 'containers/MovieModalContainer';
import { Skeleton } from '@mui/material';
import Link from 'next/link';
import { useRouter } from "next/router";


interface MovieListProps {
  movies: Movie.Movie[];
  buttonColor?: string;
}

const MovieList = ({ movies, buttonColor }: MovieListProps) => {
  const [showBackButton, setShowBackButton] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const currentPath = router.asPath;

  const scroll = (scrollOffset: number) => {
    if (listRef.current) {
      listRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <Styles.Main>
      <Styles.MovieList
        ref={listRef}
        onScroll={(event) =>
          setShowBackButton((event.target as HTMLElement).scrollLeft > 0)
        }
      >
        {movies
          ? movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <Link
                key={movie.id}
                href={`${currentPath}/?movieId=${movie.id}`}
                passHref
                scroll={false}
              >
                <Styles.MovieCardWrapper key={movie.id}>

                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    rating={movie.vote_average}
                    posterUrl={movie.poster_path}
                  />
                </Styles.MovieCardWrapper>
              </Link>
            ))
          : [...Array(6)].map((id, index) => (
            <>
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'grey.900', borderRadius: '1rem' }}
                width={150}
                height={300}
                key={index}
                animation="pulse"
              />
            </>
          ))}
      </Styles.MovieList>
      {
        movies.length > 4 && (
          <Styles.ScrollButton
            style={{ backgroundColor: buttonColor }}
            onClick={() => scroll(500)}
          >
            <ArrowForwardIosIcon />
          </Styles.ScrollButton>
        )
      }
      {
        showBackButton && (
          <Styles.ScrollButton
            left
            style={{ backgroundColor: buttonColor }}
            onClick={() => scroll(-500)}
          >
            <ArrowBackIosNewIcon />
          </Styles.ScrollButton>
        )
      }
      <MovieModalContainer />
    </Styles.Main >
  );
};

export default MovieList;

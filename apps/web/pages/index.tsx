import React from "react";
import { Grid } from "@mui/material";
import { useGetPopularMoviesQuery } from "redux/endpoints/movies.endpoints";
import { getImageByPath } from "utils/tmdb.utils";
import MovieModal from "components/Modals";
import Link from "next/link";
import MovieModalContainer from "containers/MovieModalContainer";

const Home = () => {
  const { data, isLoading } = useGetPopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Grid container>
      {data?.results.map((movie) => (
        <Link
          key={movie.id}
          href={`/?movieId=${movie.id}`}
          passHref
          scroll={false}
        >
          <Grid item xs={6} sm={3}>
            <img
              src={getImageByPath(movie.poster_path)}
              alt={movie.title}
              width={100}
            />
            <p>{movie.title}</p>
          </Grid>
        </Link>
      ))}

      <MovieModalContainer />
    </Grid>
  );
};

export default Home;

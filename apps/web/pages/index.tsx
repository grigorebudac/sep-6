import React from "react";
import { Grid } from "@mui/material";
import { useGetPopularMoviesQuery } from "redux/endpoints/movies.endpoints";
import { getImageByPath } from "utils/tmdb.utils";

const Home = () => {
  const { data, isLoading } = useGetPopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log({ data });

  return (
    <Grid container>
      {data?.results.map((movie) => (
        <Grid key={movie.id} item xs={6} sm={3}>
          <img
            src={getImageByPath(movie.poster_path)}
            alt={movie.title}
            width={100}
          />
          <p>{movie.title}</p>
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;

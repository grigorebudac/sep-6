import React from "react";
import { Dialog, DialogProps } from "@mui/material";
import { getImageByPath } from "utils/tmdb.utils";
import { Movie } from "types";

interface MovieModalProps {
  open: DialogProps["open"];
  movie?: Movie.GetMovieResponse;
  isLoading: boolean;
  onClose: DialogProps["onClose"];
}

const MovieModal = (props: MovieModalProps) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <img
        src={getImageByPath(props.movie?.poster_path)}
        alt={props.movie?.title}
      />
      <p>{props.movie?.title}</p>
    </Dialog>
  );
};

export default MovieModal;

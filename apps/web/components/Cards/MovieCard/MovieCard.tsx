import React from "react";

import * as Styles from "./MovieCard.styles";

interface MovieCardProps {
  title?: string;
  posterUrl?: string;
  rating?: number;
  editable?: boolean;
}

const MovieCard = (props: MovieCardProps) => {
  return (
    <Styles.Container>
      <img
        src={
          props.posterUrl ?
            props.posterUrl :
            "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAQAAAAT4xYKAAAADklEQVR42mNkAAJGOAEAAC0ABNxMS2YAAAAASUVORK5CYII="}
        alt={props.title}
      />

      {props.title && props.rating ? (
        <Styles.Content>
          <Styles.EllipsedTypography fontSize="1.6rem" color="system.main">
            {props.title}
          </Styles.EllipsedTypography>

          <Styles.Subtitle>
            <Styles.StarIcon />

            <Styles.EllipsedTypography fontSize="1.4rem" color="system.main">
              {props.rating}
            </Styles.EllipsedTypography>
          </Styles.Subtitle>
        </Styles.Content>
      ) : React.Fragment}
    </Styles.Container >
  );
};

export default MovieCard;

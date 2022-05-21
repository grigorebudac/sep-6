import React from "react";

import * as Styles from "./MovieCard.styles";

interface MovieCardProps {
  title: string;
  posterUrl: string;
  rating: number;
}

const MovieCard = (props: MovieCardProps) => {
  return (
    <Styles.Container>
      <Styles.Cover src={props.posterUrl} alt={props.title} />

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
    </Styles.Container>
  );
};

export default MovieCard;

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
      <Styles.Cover
        src={
          props.posterUrl ?
            props.posterUrl :
            "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="}
        alt={props.title}
        layout="responsive"
        width={500}
        height={750} />

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

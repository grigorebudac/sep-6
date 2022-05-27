import React from 'react';
import { getImageByPath } from 'utils/tmdb.utils';

import * as Styles from './MovieCard.styles';

interface MovieCardProps {
  title?: string;
  posterUrl?: string;
  rating?: number;
  editable?: boolean;
}

const imagePlaceHolderBase64 =
  'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAADCAQAAAAT4xYKAAAADklEQVR42mNkAAJGOAEAAC0ABNxMS2YAAAAASUVORK5CYII=';

const MovieCard = (props: MovieCardProps) => {
  return (
    <Styles.Container>
      <img
        src={
          props.posterUrl
            ? getImageByPath(props.posterUrl)
            : imagePlaceHolderBase64
        }
        alt={props.title}
      />

      {props.title && props.rating && (
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
      )}
    </Styles.Container>
  );
};

export default MovieCard;

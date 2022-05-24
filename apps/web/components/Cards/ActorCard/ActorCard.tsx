import React from 'react';
import { getImageByPath } from 'utils/tmdb.utils';

import * as Styles from './ActorCard.styles';

interface MovieCardProps {
  name: string;
  popularity: number;
  imageUrl: string;
}

const MovieCard = (props: MovieCardProps) => {
  return (
    <Styles.Container>
      <Styles.Cover src={getImageByPath(props.imageUrl)} alt={props.name} />

      <Styles.Content>
        <Styles.EllipsedTypography fontSize="1.6rem" color="system.main">
          {props.name}
        </Styles.EllipsedTypography>

        <Styles.Subtitle>
          <Styles.StarIcon />

          <Styles.EllipsedTypography fontSize="1.4rem" color="system.main">
            {props.popularity}
          </Styles.EllipsedTypography>
        </Styles.Subtitle>
      </Styles.Content>
    </Styles.Container>
  );
};

export default MovieCard;

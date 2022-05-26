import React from 'react';
import { getImageByPath } from 'utils/tmdb.utils';
import Image from 'next/image';

import * as Styles from './ActorCard.styles';

interface MovieCardProps {
  name: string;
  popularity: number;
  imageUrl: string;
  onClick?: () => void;
}

const MovieCard = (props: MovieCardProps) => {
  return (
    <Styles.Container onClick={props.onClick}>
      <Image
        src={getImageByPath(props.imageUrl)}
        alt={props.name}
        layout="responsive"
        width={100}
        height={150}
      />

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

import React from 'react';

import * as Styles from './CategoryCard.styles';

interface CategoryCardProps {
  title: string;
  size: number;
}

const CategoryCard = (props: CategoryCardProps) => {
  return (
    // @ts-ignore
    <Styles.Container title={props.title.toLowerCase()}>
      <Styles.Content>
        <Styles.EllipsedTypography
          fontSize="3rem"
          color="system.main"
          align="center"
          fontWeight="bold"
          // @ts-ignore
          title={props.title.toLowerCase()}
        >
          {props.size}
        </Styles.EllipsedTypography>

        <Styles.EllipsedTypography
          fontSize="1.4rem"
          color="system.main"
          align="center"
          fontWeight="bold"
          // @ts-ignore
          title={props.title.toLowerCase()}
        >
          {props.title}
        </Styles.EllipsedTypography>
      </Styles.Content>
    </Styles.Container>
  );
};

export default CategoryCard;

import React from 'react';

import * as Styles from './CategoryCard.styles';

interface CategoryCardProps {
  title: Styles.CategoryTitle;
  size: number;
}

const CategoryCard = (props: CategoryCardProps) => {
  return (
    <Styles.Container title={props.title}>
      <Styles.Content>
        <Styles.EllipsedTypography
          fontSize="3rem"
          color="system.main"
          align="center"
          fontWeight={900}
          title={props.title}
        >
          {props.size}
        </Styles.EllipsedTypography>

        <Styles.EllipsedTypography
          fontSize="1.4rem"
          color="system.main"
          align="center"
          title={props.title}
        >
          {props.title}
        </Styles.EllipsedTypography>
      </Styles.Content>
    </Styles.Container>
  );
};

export default CategoryCard;

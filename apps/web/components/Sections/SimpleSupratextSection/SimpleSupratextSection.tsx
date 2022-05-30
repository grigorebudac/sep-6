import React from "react";
import * as Styles from "./SimpleSupratextSection.styles"

interface SimpleSupratextSectionProps {
  text: string
}

const SimpleSupratextSection = (props: SimpleSupratextSectionProps) => {
  return (
    <Styles.Supratext>{props.text}</Styles.Supratext>
  );
};

export default SimpleSupratextSection;

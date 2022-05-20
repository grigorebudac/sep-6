import React from "react";
import { AvatarProps } from "@mui/material";

import * as Styles from "./ProfilePicture.styles";

interface ProfilePictureProps extends AvatarProps {
  showBorder?: boolean;
}

const ProfilePicture = (props: ProfilePictureProps) => {
  return (
    <Styles.Container showBorder={props.showBorder}>
      <Styles.Avatar {...props} />
    </Styles.Container>
  );
};

ProfilePicture.defaultProps = {
  showBorder: false,
};

export { ProfilePicture };

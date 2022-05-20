import React from "react";
import { ProfilePicture } from "components/Avatars/ProfilePicture";

import * as Styles from "./ApplicationNavbar.styles";

type ApplicationNavbarProps = {
  drawerWidth: number;
};

const ApplicationNavbar = (props: ApplicationNavbarProps) => {
  const userFullName = "Tata Albert";

  return (
    <Styles.AppBar
      elevation={0}
      position="sticky"
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        ml: { sm: `${props.drawerWidth}px` },
      }}
    >
      <Styles.Toolbar>
        <ProfilePicture showBorder src={''} alt={userFullName} />
      </Styles.Toolbar>
    </Styles.AppBar>
  );
};

export { ApplicationNavbar };

import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { List } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { SidebarMinimiseIcon } from "assets/animated-icons/SidebarMinimiseIcon";
import * as Styles from "./PrimarySidebar.styles";
import brokerImage from '../../public/images/brokerImage.jpeg'

type PrimarySidebarProps = {
  isExpanded: boolean;
  brokerName: string;
  onExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

const NAV_LINKS = [
  {
    title: "New Event",
    icon: <AddIcon />,
    href: "/new-event",
  },
  {
    title: "Home",
    icon: <HomeIcon />,
    href: "/",
  },
];


const PrimarySidebar = (props: PrimarySidebarProps) => {
  const history = useRouter();

  const handleToggleDrawerOpen = () => {
    props.onExpand((prev) => !prev);
  };

  const handleNavigate = (link: string) => {
    history.push(link);
  };

  return (
    <Styles.Drawer open={props.isExpanded} variant="permanent">
      <Styles.BrokerContainer>
        <Image
          src={brokerImage}
          layout="fill"
          objectFit="cover"
          alt={props.brokerName}
        />
      </Styles.BrokerContainer>

      <Styles.Divider />

      <List>
        {NAV_LINKS.map((navLink) => {
          return (
            <Styles.ListItemButton
              key={navLink.title}
              isActive={history.pathname === navLink.href}
              onClick={() => handleNavigate(navLink.href)}
            >
              <Styles.ListItemIcon>{navLink.icon}</Styles.ListItemIcon>
              <Styles.ListItemText primary={navLink.title} />
            </Styles.ListItemButton>
          );
        })}
      </List>

      <Styles.ActionsContainer>
        <Styles.Divider />

        <List>
          <Styles.ListItemButton onClick={handleToggleDrawerOpen}>
            <Styles.ListItemIcon>
              <SidebarMinimiseIcon open={props.isExpanded} />
            </Styles.ListItemIcon>
            <Styles.ListItemText primary="Minimise" />
          </Styles.ListItemButton>

          <Styles.ListItemButton>
            <Styles.ListItemIcon>
              <PowerSettingsNewIcon />
            </Styles.ListItemIcon>
            <Styles.ListItemText primary="Sign Out" />
          </Styles.ListItemButton>
        </List>
      </Styles.ActionsContainer>
    </Styles.Drawer>
  );
};

export { PrimarySidebar };

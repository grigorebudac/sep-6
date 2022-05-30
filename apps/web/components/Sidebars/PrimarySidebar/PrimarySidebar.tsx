import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { List } from '@mui/material';
import {
  Home,
  Settings,
  ViewList,
  Assessment,
  TheatersSharp,
} from '@mui/icons-material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import { SidebarMinimiseIcon } from 'assets/animated-icons/SidebarMinimiseIcon';

import * as Styles from './PrimarySidebar.styles';
import { Auth } from '@aws-amplify/auth';
import { useDispatch } from 'react-redux';

type PrimarySidebarProps = {
  isExpanded: boolean;
  onExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

const NAV_LINKS = [
  {
    title: 'Home',
    icon: <Home titleAccess="Home" />,
    href: '/',
  },
  {
    title: 'Watch lists',
    icon: <ViewList titleAccess="Watch lists" />,
    href: '/watch-lists',
  },
  {
    title: 'Discover',
    icon: <TheatersSharp titleAccess="Discover" />,
    href: '/discover',
  },
  {
    title: 'About you',
    icon: <Assessment titleAccess="About you" />,
    href: '/analytics',
  },
];

const ACTION_LINKS = [
  {
    title: 'Settings',
    icon: <Settings />,
    href: '/',
  },
];

const PrimarySidebar = (props: PrimarySidebarProps) => {
  const history = useRouter();
  const dispatch = useDispatch();

  const handleToggleDrawerOpen = () => {
    props.onExpand((prev) => !prev);
  };

  const handleNavigate = (link: string) => {
    history.push(link);
  };

  const handleSignOut = async () => {
    await Auth.signOut();
  };

  return (
    <Styles.Drawer open={props.isExpanded} variant="permanent">
      <Styles.BrokerContainer>
        <Image
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100"
          layout="fill"
          objectFit="cover"
          alt="SEP6"
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

          {ACTION_LINKS.map((actionLink) => {
            return (
              <Styles.ListItemButton
                key={actionLink.title}
                isActive={history.pathname === actionLink.href}
                onClick={() => handleNavigate(actionLink.href)}
              >
                <Styles.ListItemIcon>{actionLink.icon}</Styles.ListItemIcon>
                <Styles.ListItemText primary={actionLink.title} />
              </Styles.ListItemButton>
            );
          })}

          <Styles.ListItemButton onClick={handleSignOut}>
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

export default PrimarySidebar;

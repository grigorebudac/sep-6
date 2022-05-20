import React, { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Head from "next/head";

import { PrimarySidebar } from "components/PrimarySidebar";
import { ApplicationNavbar } from "components/ApplicationNavbar";
import { DRAWER } from "config/constants";

import * as Styles from "./ApplicationLayout.styles";

type ApplicationLayoutProps = {
  title: string;
  showEventSidebar?: boolean;
};

const ApplicationLayout: React.FC<ApplicationLayoutProps> = (props) => {
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [primaryExpanded, setPrimaryExpanded] = useState(isUpSm);
  const [drawerWidth, setDrawerWidth] = useState(DRAWER.WIDTH_EXPANDED);

  const primaryDrawerWidth = primaryExpanded
    ? DRAWER.WIDTH_EXPANDED
    : DRAWER.WIDTH_COLLAPSED;

  useEffect(() => {
    setPrimaryExpanded(isUpSm);
  }, [isUpSm]);

  useEffect(() => {
    const nextDrawerWidth = props.showEventSidebar
      ? primaryExpanded
        ? primaryDrawerWidth + DRAWER.WIDTH_EXPANDED
        : DRAWER.WIDTH_COLLAPSED + DRAWER.WIDTH_EXPANDED
      : primaryDrawerWidth;

    setDrawerWidth(nextDrawerWidth);

    // eslint-disable-next-line
  }, [primaryExpanded, props.showEventSidebar]);

  return (
    <Styles.Container>
      <Head>
        <title>{`${props.title} · Baryga Movies`}</title>
      </Head>

      <PrimarySidebar
        isExpanded={primaryExpanded}
        brokerName="Hello"
        onExpand={setPrimaryExpanded}
      />

      <ApplicationNavbar drawerWidth={drawerWidth} />

      <Styles.Content drawerWidth={drawerWidth}>
        <Styles.Main>{props.children}</Styles.Main>
        <Styles.Panel></Styles.Panel>
      </Styles.Content>
    </Styles.Container>
  );
};

export { ApplicationLayout };

import React, { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Head from "next/head";

import PrimarySidebar from "components/Sidebars/PrimarySidebar";
import ApplicationNavbar from "components/Navbars/ApplicationNavbar";

import * as Styles from "./ApplicationLayout.styles";

type ApplicationLayoutProps = {
  title: string;
  showEventSidebar?: boolean;
};

const ApplicationLayout: React.FC<ApplicationLayoutProps> = (props) => {
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [primaryExpanded, setPrimaryExpanded] = useState(isUpSm);

  return (
    <Styles.Container>
      <Head>
        <title>{props.title}</title>
      </Head>

      <Styles.NavMenu>
        <PrimarySidebar
          isExpanded={primaryExpanded}
          onExpand={setPrimaryExpanded}
        />
      </Styles.NavMenu>

      <Styles.Content>
        <ApplicationNavbar />
        <Styles.Main>
          <Styles.Page>
            <Styles.PageContent>{props.children}</Styles.PageContent>
          </Styles.Page>
        </Styles.Main>
      </Styles.Content>
    </Styles.Container>
  );
};

export default ApplicationLayout;

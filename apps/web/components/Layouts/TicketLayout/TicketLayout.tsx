import React, { useEffect, useMemo, useState } from "react";
import { Box, createTheme, rgbToHex } from "@mui/material";
import { useRouter } from "next/router";
import {
  ThemeContainer,
  theme as DefaultTheme,
  ScopeTicketsThemeColors,
  ScopeTicketsTheme,
} from "ui";
import DefaultThemePalette from "ui/src/theme/palette";

import { PageTitle } from "components/Titles/PageTitle";
import { useGetEventQuery } from "redux/apis/events.api";

import { ApplicationLayout } from "../ApplicationLayout";

type TicketLayoutProps = {
  title: string;
  icon: JSX.Element;
  eventId: string;
};

const TicketLayout: React.FC<TicketLayoutProps> = (props) => {
  const [customTheme, setCustomTheme] = useState(DefaultTheme);
  const { data, isLoading } = useGetEventQuery(props.eventId);
  const router = useRouter();

  if (props.eventId == null || (!isLoading && data == null)) {
    router.push("/");
  }

  useEffect(() => {
    if (data == null) {
      return;
    }

    const palette: ScopeTicketsThemeColors = {
      ...DefaultThemePalette,
      eventSystem: {
        main: rgbToHex(data.SystemColour),
      },
      eventBackground: {
        main: rgbToHex(data.ColourBackground),
      },
      eventDetail: {
        main: rgbToHex(data.ColourDetail),
      },
      eventPrimary: {
        main: rgbToHex(data.ColourPrimary),
      },
      eventSecondary: {
        main: rgbToHex(data.ColourSecondary),
      },
    };

    setCustomTheme((prev) => {
      return createTheme({
        ...prev,
        palette,
      });
    });
  }, [data]);

  return (
    <ThemeContainer theme={customTheme}>
      <ApplicationLayout title={props.title} showEventSidebar>
        <Box>
          <PageTitle
            title={props.title}
            subtitle={data?.Name}
            icon={props.icon}
          />
        </Box>

        {props.children}
      </ApplicationLayout>
    </ThemeContainer>
  );
};

export { TicketLayout };

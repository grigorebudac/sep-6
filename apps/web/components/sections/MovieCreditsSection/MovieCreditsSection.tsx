import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Styles from './MovieCreditsSection.styles';
import { Credits } from 'types';
import Link from 'next/link';

interface MovieCreditsSectionProps {
  credits?: Credits.Credits;
}

const CAST_PANEL = 'castPanel';
const CREW_PANEL = 'crewPanel';
const MAX_SHOWN_CREW_CAST = 3

const MovieCreditsSection = (props: MovieCreditsSectionProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
      <Styles.AccordionWrapper
        expanded={expanded === CAST_PANEL}
        onChange={handleChange(CAST_PANEL)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="castPanelbh-content"
          id="castPanelbh-header"
        >
          <Typography sx={{ width: '15%', flexShrink: 0 }} fontWeight="bold">
            Cast
          </Typography>
          {expanded !== CAST_PANEL && (
            <Typography sx={{ color: 'text.secondary' }}>
              {props.credits?.cast
                .slice(0, MAX_SHOWN_CREW_CAST)
                .map((person) => person.name)
                .join(', ')}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Styles.List>
            {props.credits?.cast
              ?.map((castMember, index) => (
                <Styles.ListItem key={index}>
                  <Link href={`?personId=${castMember.id}`}>
                    {castMember.name}
                  </Link>
                </Styles.ListItem>
              ))}
          </Styles.List>
        </AccordionDetails>
      </Styles.AccordionWrapper>
      <Styles.AccordionWrapper
        expanded={expanded === CREW_PANEL}
        onChange={handleChange(CREW_PANEL)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="crewPanelbh-content"
          id="crewPanelbh-header"
        >
          <Typography sx={{ width: '15%', flexShrink: 0 }} fontWeight="bold">
            Crew
          </Typography>
          {expanded !== CREW_PANEL && (
            <Typography sx={{ color: 'text.secondary' }}>
              {props.credits?.crew
                .slice(0, MAX_SHOWN_CREW_CAST)
                .map((person) => person.name)
                .join(', ')}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Styles.List>
            {props.credits?.crew
              ?.map((crewMember, index) => (
                <Styles.ListItem key={index}>
                  <Link href={`?personId=${crewMember.id}`}>
                    {crewMember.name}
                  </Link>
                </Styles.ListItem>
              ))}
          </Styles.List>
        </AccordionDetails>
      </Styles.AccordionWrapper>
    </>
  );
};

export default MovieCreditsSection;

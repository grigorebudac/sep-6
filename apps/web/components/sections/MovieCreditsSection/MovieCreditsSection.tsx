import { Box, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Styles from './MovieCreditsSection.styles';
import { Credits } from "types"
import Link from "next/link";

interface MovieCreditsSectionProps {
  credits?: Credits.Credits
}

const MovieCreditsSection = (props: MovieCreditsSectionProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '15%', flexShrink: 0 }} fontWeight="bold" >
            Cast
          </Typography>
          {expanded !== 'panel1' && (
            <Typography sx={{ color: 'text.secondary' }}>
              {props.credits?.cast.slice(0, 3).map(person => person.name).join(', ')}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Styles.List>
            {props.credits?.cast?.filter(person => person.profile_path).map((castMember, index) => (
              <Styles.ListItem key={index}>
                <Link href={`/person?id=${castMember.id}`}>{castMember.name}</Link>
              </Styles.ListItem>
            ))}
          </Styles.List>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} style={{ boxShadow: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '15%', flexShrink: 0 }} fontWeight="bold" >
            Crew
          </Typography>
          {expanded !== 'panel2' && (
            <Typography sx={{ color: 'text.secondary' }}>
              {props.credits?.crew.slice(0, 3).map(person => person.name).join(', ')}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Styles.List>
            {props.credits?.crew?.filter(person => person.profile_path).map((crewMember, index) => (
              <Styles.ListItem key={index}>
                <Link href={`/person?id=${crewMember.id}`}>{crewMember.name}</Link>
              </Styles.ListItem>
            ))}
          </Styles.List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MovieCreditsSection;

import React, { useCallback, useEffect, useState } from 'react';
import { Box, DialogProps, Grid, IconButton, Typography } from '@mui/material';

import * as Styles from './PersonModal.styles';
import { Close } from '@mui/icons-material';
import { getImageByPath } from 'utils/tmdb.utils';
import SimpleTextSection from 'components/Sections/SimpleTextSection';
import { Analytics, Person } from 'types';
import { useLazyGetMoviesQuery } from 'redux/endpoints/person.endpoints';
import PaddingLineChart from 'components/Charts/PaddingLineChart';
import { getAverageMovieRatingOverTheYearsOfActor } from 'utils/analytics.utils';
import MovieList from 'components/Lists/MovieList';

interface PersonModalProps {
  open: DialogProps['open'];
  person?: Person.PersonResponse;
  isPersonLoading: boolean;
  onClose: () => void;
}

const PersonModal = ({
  person,
  isPersonLoading,
  ...props
}: PersonModalProps) => {
  // Data

  const [getMovies, { data: movieData, isLoading: isMovieLoading }] =
    useLazyGetMoviesQuery();

  // States
  const [coverColor, setCoverColor] = useState('');
  const [averageRatingOverYears, setAverageRatingOverYears] =
    useState<Analytics.AverageRatingOverYears[]>();
  const isOpen = !!person;

  const handleLoadData = useCallback(() => {
    if (isOpen) {
      getMovies(person.id);
      getAverageMovieRatingOverTheYearsOfActor(person.id).then(
        setAverageRatingOverYears,
      );
      getCoverColor();
    }
  }, [isOpen, person, getMovies]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  const getCoverColor = () => {
    const colors = ['#B8576A', '#5DBBE0', '#ADBCDA', '#854CA4', '#7BBEA1'];
    return setCoverColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <Styles.Dialog
      open={props.open}
      fullWidth
      maxWidth="md"
      onClose={props.onClose}
    >
      <Styles.ContentContainer>
        <Styles.Cover style={{ background: coverColor }}>
          <Styles.Avatar
            src={getImageByPath(person?.profile_path || '')}
            alt={person?.name}
          />

          <Typography
            marginLeft={30}
            fontSize={['2rem', '3rem']}
            fontWeight="bold"
            color="system.main"
          >
            {person?.name}
          </Typography>
        </Styles.Cover>

        <Styles.CloseBtnContainer>
          <IconButton color="inherit" onClick={props.onClose}>
            <Close />
          </IconButton>
        </Styles.CloseBtnContainer>
        <Styles.Content>
          <Grid container gap={5}>
            <Grid marginTop={10} item xs={12} sm={3}>
              <Box>
                <SimpleTextSection title="Popularity:" />

                <Box
                  display="flex"
                  paddingTop={1}
                  style={{ color: coverColor }}
                >
                  <Styles.StarIcon />

                  <Typography fontSize="3rem" fontWeight="bold">
                    {person?.popularity}
                  </Typography>
                </Box>
              </Box>

              <Box marginTop={2}>
                {person?.birthday && (
                  <Typography>
                    <b>Birthday:</b>
                    {' ' +
                      new Date(person?.birthday || '').toLocaleDateString()}
                  </Typography>
                )}

                {person?.place_of_birth && (
                  <Typography marginTop={1}>
                    <b>Place of birth:</b> {person?.place_of_birth}
                  </Typography>
                )}

                {person?.known_for_department &&
                  person?.known_for_department !== 'Acting' && (
                    <Typography marginTop={1}>
                      <b>Department:</b> {person?.known_for_department}
                    </Typography>
                  )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <PaddingLineChart
                data={averageRatingOverYears || []}
                lineColor={coverColor}
                isLoading={isPersonLoading}
              />
            </Grid>
          </Grid>
          {movieData?.cast.length !== 0 && (
            <Box marginTop={5}>
              <Typography
                fontSize={['2rem', '3rem']}
                fontWeight="bold"
                color={coverColor}
                marginBottom={1}
              >
                Known for:
              </Typography>

              <MovieList
                movies={movieData?.cast || []}
                buttonColor={coverColor}
              />
            </Box>
          )}
          {person?.biography && (
            <Box marginTop={5}>
              <SimpleTextSection
                title="Biography:"
                subtitle={person?.biography}
              />
            </Box>
          )}
        </Styles.Content>
      </Styles.ContentContainer>
    </Styles.Dialog>
  );
};

export default PersonModal;

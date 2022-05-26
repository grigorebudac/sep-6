import React, { useCallback, useEffect, useState } from 'react';
import { Box, DialogProps, Grid, IconButton, Typography } from '@mui/material';

import * as Styles from './ActorModal.styles';
import { Close } from '@mui/icons-material';
import { getImageByPath } from 'utils/tmdb.utils';
import SimpleTextSection from 'components/Sections/SimpleTextSection';
import { Person } from 'types/person.types';
import { useLazyGetActorQuery } from 'redux/endpoints/person.endpoints';
import PaddingLineChart from 'components/Charts/PaddingLineChart';

const chartData = [
  {
    year: 2000,
    rating: 2400,
  },
  {
    year: 2002,
    rating: 1398,
  },
  {
    year: 2003,
    rating: 9800,
  },
  {
    year: 2005,
    rating: 3908,
  },
  {
    year: 2006,
    rating: 4800,
  },
  {
    year: 2008,
    rating: 3800,
  },
  {
    year: 2012,
    rating: 4300,
  },
];

interface ActorModalProps {
  open: DialogProps['open'];
  actor?: Person.ActorResponse;
  onClose: () => void;
}

const ActorModal = ({ actor, ...props }: ActorModalProps) => {
  const [coverColor, setCoverColor] = useState('');
  const [getActor, { data, isLoading }] = useLazyGetActorQuery();
  const isOpen = !!actor;

  const handleLoadData = useCallback(() => {
    if (isOpen) {
      getActor(actor.id);
      getCoverColor();
    }
  }, [isOpen, actor, getActor]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  const getCoverColor = () => {
    const colors = ['#B8576A', '#5DBBE0', '#ADBCDA', '#854CA4', '#7BBEA1'];
    return setCoverColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <Styles.Dialog open={props.open} maxWidth="md" onClose={props.onClose}>
      <Styles.ContentContainer>
        <Styles.Cover style={{ background: coverColor }}>
          <Styles.Avatar
            src={getImageByPath(data?.profile_path || '')}
            alt={data?.name}
          />

          <Typography
            marginLeft={30}
            fontSize={['2rem', '3rem']}
            fontWeight="bold"
            color="system.main"
          >
            {data?.name}
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
                    {data?.popularity}
                  </Typography>
                </Box>
              </Box>

              <Box marginTop={2}>
                <Typography>
                  <b>Birthday:</b>
                  {' ' + new Date(data?.birthday || '').toLocaleDateString()}
                </Typography>

                <Typography marginTop={1}>
                  <b>Place of birth:</b> {data?.place_of_birth}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <PaddingLineChart
                data={chartData}
                lineColor={coverColor}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
          <Box marginTop={5}>
            <Typography
              fontSize={['2rem', '3rem']}
              fontWeight="bold"
              color={coverColor}
            >
              Known for:
            </Typography>
          </Box>
          <Box marginTop={5}>
            <SimpleTextSection title="Biography:" subtitle={data?.biography} />
          </Box>
        </Styles.Content>
      </Styles.ContentContainer>
    </Styles.Dialog>
  );
};

export default ActorModal;

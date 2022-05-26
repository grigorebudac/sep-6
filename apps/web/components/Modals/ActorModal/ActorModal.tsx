import React, { useCallback, useEffect } from 'react';
import { Box, DialogProps, Grid, IconButton, Typography } from '@mui/material';

import * as Styles from './ActorModal.styles';
import { Close } from '@mui/icons-material';
import { getImageByPath } from 'utils/tmdb.utils';
import SimpleTextSection from 'components/Sections/SimpleTextSection';
import { Person } from 'types/person.types';
import { useLazyGetActorQuery } from 'redux/endpoints/person.endpoints';

interface ActorModalProps {
  open: DialogProps['open'];
  actor?: Person.ActorResponse;
  onClose: () => void;
}

const ActorModal = ({ actor, ...props }: ActorModalProps) => {
  const [getActor, { data, isLoading }] = useLazyGetActorQuery();
  const isOpen = !!actor;

  const handleLoadData = useCallback(() => {
    if (isOpen) {
      getActor(actor.id);
    }
  }, [isOpen, actor, getActor]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  return (
    <Styles.Dialog open={props.open} maxWidth="md" onClose={props.onClose}>
      <Styles.ContentContainer>
        <Styles.Cover>
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

                <Box display="flex" paddingTop={1}>
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
              <SimpleTextSection
                title="Biography:"
                subtitle={data?.biography}
              />
            </Grid>
          </Grid>
        </Styles.Content>
      </Styles.ContentContainer>
    </Styles.Dialog>
  );
};

export default ActorModal;

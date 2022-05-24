import React, { useEffect, useState } from 'react';
import { Box, DialogProps, Grid, IconButton, Typography } from '@mui/material';

import * as Styles from './ActorModal.styles';
import { Close, Style } from '@mui/icons-material';
import { getImageByPath } from 'utils/tmdb.utils';
import SimpleTextSection from 'components/Sections/SimpleTextSection';

interface ActorModalProps {
  open: DialogProps['open'];
  actor?: any;
  onClose: () => void;
}

const ActorModal = ({ actor, ...props }: ActorModalProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (actor) {
      setLoading(false);
    }
  }, [actor]);

  return (
    <Styles.Dialog open={props.open} maxWidth="md" onClose={props.onClose}>
      <Styles.ContentContainer>
        <Styles.Cover>
          <Styles.Avatar
            src={getImageByPath(actor?.profile_path)}
            alt={actor?.title}
          />

          <Typography
            marginLeft={30}
            fontSize={['2rem', '3rem']}
            fontWeight="bold"
            color="system.main"
          >
            {actor?.name}
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
                    {actor?.popularity}
                  </Typography>
                </Box>
              </Box>

              <Box marginTop={2}>
                <Typography>
                  <b>Birthday:</b>
                  {' ' + new Date(actor?.birthday).toLocaleDateString()}
                </Typography>

                <Typography marginTop={1}>
                  <b>Place of birth:</b> {actor?.place_of_birth}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <SimpleTextSection
                title="Biography:"
                subtitle={actor?.biography}
              />
            </Grid>
          </Grid>
        </Styles.Content>
      </Styles.ContentContainer>
    </Styles.Dialog>
  );
};

export default ActorModal;

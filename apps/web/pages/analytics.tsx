import React, { useEffect, useMemo, useState } from 'react';
import { Grid, Skeleton } from '@mui/material';
import ApplicationLayout from 'components/Layouts/ApplicationLayout';
import { useGetWatchListsQuery } from "redux/endpoints/watch-lists.endpoints";
import CategoryCard from 'components/Cards/CategoryCard';
import { Typography } from '@mui/material';
import ActorCard from 'components/Cards/ActorCard';
import ActorModal from 'components/Modals/ActorModal';
import { Person, Analytics as AnalyticsType } from 'types';
import { getFavoriteGenres, getFavoriteActors } from 'utils/analytics.utils';
import SimpleSupratextSection from 'components/Sections/SimpleSupratextSection';

const Analytics = () => {
  const { data, isLoading } = useGetWatchListsQuery();
  const [favoriteActors, setFavoriteActors] = useState<AnalyticsType.FavoriteAcotrs[]>([]);
  const [selectedActor, setSelectedActor] = useState<Person.ActorResponse>();

  const favoriteGenres = useMemo(() => { if (data) return getFavoriteGenres(data); }, [data]);
  useEffect(() => {
    if (data) {
      getFavoriteActors(data).then(setFavoriteActors);
    }
  }, [data]);

  return (
    <ApplicationLayout title="Analytics">
      <Typography
        paddingLeft={'1rem'}
        marginBottom={'1rem'}
        fontSize="3rem"
        color="system.main"
        fontWeight={900}
      >
        Favorite genres <SimpleSupratextSection text="*most frequent in your watchlists"></SimpleSupratextSection>
      </Typography>

      <Grid container>
        {favoriteGenres ? (favoriteGenres.map((genre) => (
          <Grid key={genre.name} item xs={12} sm={4} md={2} padding="1rem">
            <CategoryCard title={genre.name} size={genre.quantity} />
          </Grid>
        ))) : ([...Array(6)].map(skeleton => (
          <Grid item xs={12} sm={4} md={2} padding="1rem" key={skeleton}>
            <Skeleton variant="rectangular" sx={{ bgcolor: 'grey.900', borderRadius: '1rem' }} width="full" height={145} animation="pulse" />
          </Grid>
        )))}
      </Grid>

      <Typography
        paddingLeft={'1rem'}
        marginBottom={'1rem'}
        marginTop={'1.5rem'}
        fontSize="3rem"
        color="system.main"
        fontWeight={900}
      >
        Favorite actors <SimpleSupratextSection text="*most frequent in your watchlists"></SimpleSupratextSection>
      </Typography>

      <Grid container>
        {favoriteActors.length != 0 ? (favoriteActors.map((actorData) => (
          <Grid key={actorData.actor.id} item xs={12} sm={4} md={2} padding="1rem">
            <ActorCard
              name={actorData.actor.name}
              imageUrl={actorData.actor.profile_path}
              popularity={actorData.actor.popularity}
              onClick={() => setSelectedActor(actorData.actor)}
            />
          </Grid>)))
          : ([...Array(6)].map(skeleton => (
            <Grid item xs={12} sm={4} md={2} padding="1rem" key={skeleton}>
              <Skeleton variant="rectangular" sx={{ bgcolor: 'grey.900', borderRadius: '1rem' }} width="full" height={345} animation="pulse" />
            </Grid>
          )))}
      </Grid>

      <ActorModal
        open={!!selectedActor}
        actor={selectedActor}
        onClose={() => setSelectedActor(undefined)}
      />
    </ApplicationLayout >
  );
};

export default Analytics;

import React, { useEffect, useState } from 'react';
import { Grid, Skeleton, Box } from '@mui/material';
import Link from 'next/link';
import ApplicationLayout from 'components/Layouts/ApplicationLayout';
import { useGetWatchListsQuery } from 'redux/endpoints/watch-lists.endpoints';
import CategoryCard from 'components/Cards/CategoryCard';
import { Typography } from '@mui/material';
import ActorCard from 'components/Cards/ActorCard';
import { Analytics as AnalyticsType } from 'types';
import { getFavoriteGenres, getFavoriteActors } from 'utils/analytics.utils';
import SimpleSupratextSection from 'components/Sections/SimpleSupratextSection';

const Analytics = () => {
  const { data, isLoading } = useGetWatchListsQuery();
  const [favoriteActors, setFavoriteActors] = useState<
    AnalyticsType.FavoriteAcotrs[]
  >([]);
  const [favoriteGenres, setFavoriteGenres] = useState<
    AnalyticsType.FavoriteGenres[]
  >([]);

  useEffect(() => {
    if (data) {
      setFavoriteGenres(getFavoriteGenres(data));
      getFavoriteActors(data).then(setFavoriteActors);
    }
  }, [data]);

  if (!isLoading && favoriteGenres?.length === 0) {
    return (
      <ApplicationLayout title="Analytics">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography
            paddingLeft={'1rem'}
            marginBottom={'1rem'}
            fontSize="3rem"
            color="system.main"
            align="center"
            fontWeight={900}
          >
            Add some movies to your watch lists <br /> to see some statistics!
          </Typography>
        </Box>
      </ApplicationLayout>
    );
  }

  return (
    <ApplicationLayout title="Analytics">
      <Typography
        paddingLeft={'1rem'}
        marginBottom={'1rem'}
        fontSize="3rem"
        color="system.main"
        fontWeight={900}
      >
        Favorite genres{' '}
        <SimpleSupratextSection text="*most frequent in your watchlists"></SimpleSupratextSection>
      </Typography>

      <Grid container>
        {favoriteGenres.length > 0
          ? favoriteGenres.map((genre) => (
              <Grid key={genre.name} item xs={12} sm={4} md={2} padding="1rem">
                <CategoryCard title={genre.name} size={genre.quantity} />
              </Grid>
            ))
          : [...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={4} md={2} padding="1rem" key={index}>
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'grey.900', borderRadius: '1rem' }}
                  width="full"
                  height={145}
                  animation="pulse"
                />
              </Grid>
            ))}
      </Grid>

      <Typography
        paddingLeft={'1rem'}
        marginBottom={'1rem'}
        marginTop={'1.5rem'}
        fontSize="3rem"
        color="system.main"
        fontWeight={900}
      >
        Favorite actors{' '}
        <SimpleSupratextSection text="*most frequent in your watchlists"></SimpleSupratextSection>
      </Typography>

      <Grid container>
        {favoriteActors.length > 0
          ? favoriteActors.map((actorData) => (
              <Grid
                key={actorData.actor.id}
                item
                xs={12}
                sm={4}
                md={2}
                padding="1rem"
              >
                <Link
                  key={actorData.actor.id}
                  href={`analytics/?personId=${actorData.actor.id}`}
                  passHref
                  scroll={false}
                >
                  <a>
                    <ActorCard
                      name={actorData.actor.name}
                      imageUrl={actorData.actor.profile_path}
                      popularity={actorData.actor.popularity}
                    />
                  </a>
                </Link>
              </Grid>
            ))
          : [...Array(6)].map((skeleton) => (
              <Grid
                item
                xs={12}
                sm={4}
                md={2}
                padding="1rem"
                key={Math.random()}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'grey.900', borderRadius: '1rem' }}
                  width="full"
                  height={345}
                  animation="pulse"
                />
              </Grid>
            ))}
      </Grid>
    </ApplicationLayout>
  );
};

export default Analytics;

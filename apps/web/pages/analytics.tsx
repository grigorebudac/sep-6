import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ApplicationLayout from 'components/Layouts/ApplicationLayout';
import CategoryCard from 'components/Cards/CategoryCard';
import { Typography } from '@mui/material';
import ActorCard from 'components/Cards/ActorCard';

const Analytics = () => {
  // const { data, isLoading } = useGetPopularMoviesQuery();

  const [data, setData] = useState();

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=33da4b0735e9ca10f0db031928a139eb&language=en-US',
        {
          method: 'GET',
        },
      );
      const data = await response.json();
      console.log(data);
      setData(data);
    };

    getCategories();
  }, []);

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  const actors = [
    {
      id: 1,
      name: 'Benedict Cumberbatch',
      profile_path: '/fBEucxECxGLKVHBznO0qHtCGiMO.jpg',
      popularity: 44.5,
    },
    {
      id: 2,
      name: 'Elizabeth Olsen',
      profile_path: '/mbMsmQE5CyMVTIGMGCw2XpcPCOc.jpg',
      popularity: 31.7,
    },
    {
      id: 3,
      name: 'Benedict Cumberbatch',
      profile_path: '/fBEucxECxGLKVHBznO0qHtCGiMO.jpg',
      popularity: 44.5,
    },
  ];
  return (
    <ApplicationLayout title="Analytics">
      <Typography
        paddingLeft={'1rem'}
        marginBottom={'2rem'}
        fontSize="3rem"
        color="system.main"
        fontWeight={900}
      >
        Favorite categories
      </Typography>

      <Grid container>
        {
          // @ts-ignore
          data?.genres.map((genre) => (
            <Grid key={genre.id} item xs={12} sm={4} md={2} padding="1rem">
              <CategoryCard title={genre.name.toLowerCase()} size={20} />
            </Grid>
          ))
        }
      </Grid>

      <Typography
        paddingLeft={'1rem'}
        marginBottom={'2rem'}
        marginTop={'15rem'}
        fontSize="3rem"
        color="system.main"
        fontWeight={900}
      >
        Favorite actors
      </Typography>

      <Grid container>
        {
          // @ts-ignore
          actors?.map((actor) => (
            <Grid key={actor.id} item xs={12} sm={4} md={2} padding="1rem">
              <ActorCard
                name={actor.name}
                imageUrl={actor.profile_path}
                popularity={actor.popularity}
              />
            </Grid>
          ))
        }
      </Grid>
    </ApplicationLayout>
  );
};

export default Analytics;

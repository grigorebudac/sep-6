import React from 'react';
import Link from 'next/link';
import { Grid } from '@mui/material';
import ApplicationLayout from 'components/Layouts/ApplicationLayout';
import CategoryCard from 'components/Cards/CategoryCard';
import { Typography } from '@mui/material';
import ActorCard from 'components/Cards/ActorCard';
import { Genre } from 'types/genre.types';

export const ACTORS = [
  {
    id: 71580,
    name: 'Benedict Cumberbatch',
    profile_path: '/fBEucxECxGLKVHBznO0qHtCGiMO.jpg',
    popularity: 44.5,
    biography:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum incidunt dolore fuga necessitatibus nostrum? Totam quisquam est accusantium sequi illum, autem exercitationem, tempore cupiditate commodi voluptatem natus a sint inventore!',
    place_of_birth: 'Sherman Oaks, California, USA',
    birthday: '1989-02-16',
  },
  {
    id: 550843,
    name: 'Elizabeth Olsen',
    profile_path: '/mbMsmQE5CyMVTIGMGCw2XpcPCOc.jpg',
    popularity: 31.7,
    biography:
      "Elizabeth Chase Olsen (born February 16, 1989) is an American actress. Born in Sherman Oaks, California, Olsen began acting at age four. She starred in her debut film role in the thriller Martha Marcy May Marlene in 2011, for which she was acclaimed and nominated for a Critics' Choice Movie Award among other accolades, followed by a role in the horror film Silent House. Olsen received a BAFTA Rising Star Award nomination and graduated from New York University two years later.\n\nOlsen gained worldwide recognition for her portrayal of Wanda Maximoff / Scarlet Witch in the Marvel Cinematic Universe media franchise, appearing in the superhero films Avengers: Age of Ultron (2015), Captain America: Civil War (2016), Avengers: Infinity War (2018), and Avengers: Endgame (2019), as well as the miniseries WandaVision (2021). Her performance in WandaVision garnered her a Primetime Emmy Award and Golden Globe Award nomination. Outside of her work as Scarlet Witch, she continued starring in films, including the 2014 monster film Godzilla, the 2017 mystery film Wind River, and the 2017 dramedy Ingrid Goes West. She executive produced and starred in the drama series Sorry for Your Loss (2018–2019), earning a Critics' Choice Television Award nomination for her role as a widow.",
    place_of_birth: 'Sherman Oaks, California, USA',
    birthday: '1989-02-16',
  },
];

const Analytics = () => {
  const genres: Genre.Genre[] = [];

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
        {genres?.map((genre) => (
          <Grid key={genre.id} item xs={12} sm={4} md={2} padding="1rem">
            {/* @ts-ignore */}
            <CategoryCard title={genre.name.toLowerCase()} size={20} />
          </Grid>
        ))}
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
        {ACTORS?.map((actor) => (
          <Grid key={actor.id} item xs={12} sm={4} md={2} padding="1rem">
            <Link
              key={actor.id}
              href={`analytics/?personId=${actor.id}`}
              scroll={false}
              passHref
            >
              <a>
                <ActorCard
                  name={actor.name}
                  imageUrl={actor.profile_path}
                  popularity={actor.popularity}
                />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </ApplicationLayout>
  );
};

export default Analytics;

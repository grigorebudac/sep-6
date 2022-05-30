import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getFullImageByPath, getImageByPath } from 'utils/tmdb.utils';
import { Movie } from 'types';
import VideoModal from 'components/Modals/VideoModal';
import { Box, Typography } from '@mui/material';
import { useLazyGetMovieVideoQuery } from 'redux/endpoints/movies.endpoints';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import * as Styles from './Hero.styles';

interface HeroProps {
  data: Movie.Movie[];
}

const Hero = ({ data }: HeroProps) => {
  // Refs
  const myRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // States
  const [openModal, setOpenModal] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  // Data
  const [getMovieVideo, video] = useLazyGetMovieVideoQuery();

  const getVideoId = (movieId: number) => {
    getMovieVideo(movieId.toString());
    setOpenModal(true);
  };

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <Styles.Main>
      <Styles.MovieList
        ref={scrollRef}
        onScroll={(event) =>
          setShowBackButton((event.target as HTMLElement).scrollLeft > 0)
        }
      >
        {data ? (
          data.map((movie) => (
            <Styles.Movie key={movie.id} ref={myRef}>
              <Image
                src={getFullImageByPath(movie.backdrop_path)}
                alt={movie.title}
                layout="fill"
              />
              <Styles.Content>
                <Styles.MovieContent>
                  <Typography
                    fontSize={'6rem'}
                    lineHeight={'6rem'}
                    fontWeight="bold"
                    color="system.main"
                  >
                    {movie.title}
                  </Typography>
                  <Typography
                    marginTop={2}
                    fontSize={'1.7rem'}
                    color="system.main"
                  >
                    {movie.overview}
                  </Typography>
                  <Box paddingTop={2} display="flex" flexDirection="row">
                    <Styles.Button active onClick={() => getVideoId(movie.id)}>
                      <Typography>Watch trailer</Typography>
                    </Styles.Button>
                    <Link
                      key={movie.id}
                      href={`/?movieId=${movie.id}`}
                      passHref
                      scroll={false}
                    >
                      <Styles.Button>
                        <Typography color="white">Discover</Typography>
                      </Styles.Button>
                    </Link>
                  </Box>
                </Styles.MovieContent>
                <Styles.MovieImageContainer>
                  <Styles.MovieImage>
                    <Image
                      src={getImageByPath(movie.poster_path)}
                      alt={movie.title}
                      layout="responsive"
                      height={300}
                      width={200}
                    />
                  </Styles.MovieImage>
                </Styles.MovieImageContainer>
              </Styles.Content>
            </Styles.Movie>
          ))
        ) : (
          <h1>No data</h1>
        )}

        <VideoModal
          open={openModal}
          videoId={video.data?.results?.[0]?.key || ''}
          onClose={() => setOpenModal(false)}
        />
      </Styles.MovieList>
      <Styles.ScrollButton
        onClick={() =>
          scroll(
            myRef?.current?.offsetWidth
              ? myRef?.current?.offsetWidth + 17
              : 1000,
          )
        }
      >
        <ArrowForwardIosIcon />
      </Styles.ScrollButton>

      {showBackButton && (
        <Styles.ScrollButton
          left
          onClick={() =>
            scroll(
              myRef?.current?.offsetWidth
                ? -myRef?.current?.offsetWidth + 17
                : -1000,
            )
          }
        >
          <ArrowBackIosNewIcon />
        </Styles.ScrollButton>
      )}
    </Styles.Main>
  );
};

export default Hero;

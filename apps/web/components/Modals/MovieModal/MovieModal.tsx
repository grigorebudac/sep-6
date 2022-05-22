import React from "react";
import {
  Box,
  DialogProps,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { getImageByPath } from "utils/tmdb.utils";
import { Movie, WatchList } from "types";

import * as Styles from "./MovieModal.styles";
import SimpleLineChart from "components/Charts/SimpleLineChart";
import { Close, Add } from "@mui/icons-material";
import SimpleTextSection from "components/Sections/SimpleTextSection";
import AddToPlayListModal from "components/Modals/AddToPlayListModal";


interface MovieModalProps {
  open: DialogProps["open"];
  movie?: Movie.GetMovieResponse;
  isLoading: boolean;
  onClose: () => void;
}

const DUMMY_DATA = [
  {
    x: "Wed",
    y: 10,
  },
  {
    x: "Thu",
    y: 30,
  },
  {
    x: "Fri",
    y: 2,
  },
  {
    x: "Sat",
    y: 0,
  },
  {
    x: "Sun",
    y: 7,
  },
  {
    x: "Mon",
    y: 15,
  },
  {
    x: "Tue",
    y: 7,
  },
];

const watchLists: WatchList.WatchList[] = [
  {
    id: "1",
    title: "Favorite",
    updatedAt: "2020-01-01",
    userId: "1",
    createdAt: "2020-01-01",
  },
  {
    id: "2",
    title: "Watch later",
    updatedAt: "2020-01-01",
    userId: "2",
    createdAt: "2020-01-01",
  }
];

const MovieModal = ({ movie, ...props }: MovieModalProps) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value?: string) => {
    setOpen(false);
  };

  const genres = movie?.genres.map((genre) => genre.name)?.join(", ");
  const spokenLanguages = movie?.spoken_languages
    .map(({ name }) => name)
    ?.join(", ");

  return (
    <Styles.Dialog open={props.open} maxWidth="md" onClose={props.onClose}>
      <Styles.CoverContainer>
        <Styles.CoverOverlay />

        <Styles.Cover
          src={getImageByPath(movie?.poster_path)}
          alt={movie?.title}
        />

        <Styles.CloseBtnContainer>
          <IconButton color="inherit" onClick={props.onClose}>
            <Close />
          </IconButton>
        </Styles.CloseBtnContainer>

        <Styles.CoverContent>
          <Typography
            fontSize={["3.2rem", "4.8rem"]}
            fontWeight="bold"
            color="system.main"
          >
            {movie?.title}
          </Typography>
        </Styles.CoverContent>
      </Styles.CoverContainer>

      <Styles.AddToPlayListBtnContainer>
        <Styles.IconButtonWrapper onClick={handleClickOpen} size="large">
          <Add fontSize="large" />
        </Styles.IconButtonWrapper>
        <AddToPlayListModal watchLists={watchLists} open={open} onClose={handleClose} />
      </Styles.AddToPlayListBtnContainer>

      <Styles.Content>
        <Grid container gap={2}>
          <Grid item xs={12} sm={8}>
            <SimpleTextSection title="Overview" subtitle={movie?.overview} />
          </Grid>

          <Grid item xs={12} sm={3}>
            <SimpleTextSection title="Genres" subtitle={genres} />

            <Box marginTop="2rem">
              <SimpleTextSection
                title="Spoken Languages"
                subtitle={spokenLanguages}
              />
            </Box>
          </Grid>
        </Grid>
      </Styles.Content>

      <Styles.Content>
        <Divider />

        <Styles.ChartContainer>
          <SimpleLineChart data={DUMMY_DATA} isLoading={false} />
        </Styles.ChartContainer>

        <Divider />
      </Styles.Content>

      <Styles.Content>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <h1>Reviews</h1>
          </Grid>
        </Grid>
      </Styles.Content>
    </Styles.Dialog>
  );
};

export default MovieModal;

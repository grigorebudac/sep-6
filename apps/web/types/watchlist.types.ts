export declare module WatchList {
  interface Movie {
    title?: string;
    createdAt: string;
    movieId: string;
    cover?: string;
    genres: Genre[]
  }

  interface WatchList {
    updatedAt: string;
    userId: string;
    createdAt: string;
    id: string;
    movies?: Movie[];
    title: string;
  }

  interface Genre {
    id: number;
    name: string;
  }

  interface CreateWatchListPayload {
    title: string;
  }

  interface DeleteMovieFromWatchListResponse {
    movieId: string
  }

  interface DeleteWatchListPayload {
    id: string
  }

  interface addMovieToWatchListPayload {
    watchListId: string;
    movieId: number,
    title: string,
    cover?: string,
    genres?: Genre[]
  }

  interface DeleteMovieFromWatchListPayload {
    watchListId: string
    movieId: string
  }

  interface CreateWatchListInput {
    title: string
  }

  interface UpdateWatchListInput {
    id: string
    title: string
  }
}


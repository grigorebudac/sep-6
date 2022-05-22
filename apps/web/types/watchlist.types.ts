export declare module WatchList {
  interface Movie {
    title?: string;
    createdAt: string;
    movieId: string;
    cover?: string;
  }

  interface WatchList {
    updatedAt: string;
    userId: string;
    createdAt: string;
    id: string;
    movies?: Movie[];
    title: string;
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


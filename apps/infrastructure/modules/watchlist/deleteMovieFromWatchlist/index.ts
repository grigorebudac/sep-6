import { APIGatewayProxyWithCognitoAuthorizerHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import { QueryOutput } from 'aws-sdk/clients/dynamodb';

const DynamoDB = new AWS.DynamoDB.DocumentClient();

type QueryResult = {
  Items?: Array<WatchList>;
};

type WatchList = Partial<{
  title: string;
  movies: Movie[];
}>;

type Movie = Partial<{
  movieId: string;
  title: string;
}>;

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event,
) => {
  let body = null;
  let statusCode = 200;

  try {
    const { sub } = event.requestContext.authorizer.claims;
    const watchListId = event.pathParameters?.['watchListId'];
    const movieId = event.pathParameters?.['movieId'];

    let movieIndex;

    if (watchListId == null) {
      throw new Error('Watchlist id is missing');
    }

    if (movieId == null) {
      throw new Error('Movie id is missing');
    }

    // checks if such a watchlist exists and if it is owned by the user
    // it returns an array of watchlists that match the query
    const watchLists = (await DynamoDB.scan({
      TableName: process.env.WATCHLISTS_TABLE!,
      FilterExpression: 'userId = :userId AND id = :id',
      ExpressionAttributeValues: {
        ':userId': sub,
        ':id': watchListId,
      },
    }).promise()) as QueryResult;

    if (watchLists?.Items?.length === 0) {
      throw new Error('Watchlist not found');
    }

    movieIndex = watchLists?.Items?.[0]?.movies?.findIndex(
      (movie) => movie.movieId === movieId,
    );

    if (movieIndex === undefined || movieIndex === -1) {
      throw new Error('Movie not found in Watchlist');
    }

    await DynamoDB.update({
      TableName: process.env.WATCHLISTS_TABLE!,
      Key: {
        id: watchListId,
      },
      UpdateExpression: `REMOVE movies[${movieIndex}]`,
    }).promise();

    body = movieId;
  } catch (error) {
    statusCode = 500;
    if (error instanceof Error) {
      body = error.message
      if (error.message === 'Watchlist not found' || error.message === 'Movie not found in Watchlist') {
        statusCode = 404;
      }
    } else {
      body = error;
    }
  }

  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS, DELETE',
    },
    statusCode,
    body: JSON.stringify(body),
  };
};

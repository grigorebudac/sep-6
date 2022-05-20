import { APIGatewayProxyWithCognitoAuthorizerHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const DynamoDB = new AWS.DynamoDB.DocumentClient();

type Result = {
  Items: Array<WatchList>;
};

type WatchList = Partial<{
  title: string;
  movies: Movie[];
}>;

type Movie = Partial<{
  id: string;
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

    const watchLists = (await DynamoDB.scan({
      TableName: process.env.WATCHLISTS_TABLE!,
      FilterExpression: 'userId = :userId AND id = :id',
      ExpressionAttributeValues: {
        ':userId': sub,
        ':id': watchListId,
      },
    }).promise()) as Result;

    if (watchLists?.Items?.[0].movies) {
      movieIndex = watchLists?.Items?.[0].movies.findIndex(
        (movie) => movie.id === movieId,
      );
    }

    await DynamoDB.update({
      TableName: process.env.WATCHLISTS_TABLE!,
      Key: {
        id: watchListId,
      },
      UpdateExpression: `REMOVE movies[${movieIndex}]`,
    }).promise();

    statusCode = 200;
    body = movieId;
  } catch (error) {
    statusCode = 500;
    body = error instanceof Error ? error.message : error;
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

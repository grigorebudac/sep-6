import { APIGatewayProxyWithCognitoAuthorizerHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const DynamoDB = new AWS.DynamoDB.DocumentClient();

interface Payload {
  movieId: string;
  title: string;
  cover: string;
}

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event,
) => {
  let body = null;
  let statusCode = 200;

  try {
    const { sub } = event.requestContext.authorizer.claims;
    const watchListId = event.pathParameters?.['watchListId'];

    const currentUnixTime = Date.now().toString();

    const data: Payload = JSON.parse(event.body ?? "{}");

    if (watchListId == null) {
      throw new Error('Watchlist id is missing');
    }

    if (data.movieId == null) {
      throw new Error('Movie id is missing');
    }

    if (data.title == null) {
      throw new Error('Watchlist title is missing');
    }

    const Movie = {
      movieId: data.movieId,
      title: data.title,
      cover: data.cover,
      createdAt: currentUnixTime,
    };

    await DynamoDB.update({
      TableName: process.env.WATCHLISTS_TABLE!,
      ConditionExpression: 'userId = :userId',
      Key: {
        id: watchListId,
      },
      UpdateExpression:
        'set #movies = list_append(if_not_exists(#movies, :empty_list), :movie)',
      ExpressionAttributeNames: {
        '#movies': 'movies',
      },
      ExpressionAttributeValues: {
        ':movie': [Movie],
        ':empty_list': [],
        ':userId': sub,
      },
    }).promise();

    statusCode = 200;
    body = Movie;
  } catch (error) {
    statusCode = 500;
    body = error instanceof Error ? error.message : error;
  }

  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS, PUT',
    },
    statusCode,
    body: JSON.stringify(body),
  };
};

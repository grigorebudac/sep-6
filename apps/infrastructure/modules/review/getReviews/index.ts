import { APIGatewayProxyWithCognitoAuthorizerHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

const DynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event,
) => {
  let body = null;
  let statusCode = 200;

  try {
    const movieId = event.queryStringParameters?.movieId;

    if (movieId == null) {
      throw new Error('Movie id is missing');
    }

    const data = await DynamoDB.scan({
      TableName: process.env.REVIEWS_TABLE!,
      FilterExpression: `movieId = :movieId`,
      ExpressionAttributeValues: {
        ':movieId': movieId,
      },
    }).promise();

    const sortedDescItems = data?.Items?.sort(
      (a, b) => a.createdAt - b.createdAt,
    );

    statusCode = 200;
    body = sortedDescItems ?? [];
  } catch (error) {
    statusCode = 500;
    body = error instanceof Error ? error.message : error;
  }

  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS, GET',
    },
    statusCode,
    body: JSON.stringify(body),
  };
};

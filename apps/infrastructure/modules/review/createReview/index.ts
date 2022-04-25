import { APIGatewayProxyWithCognitoAuthorizerHandler } from "aws-lambda";
import AWS from "aws-sdk";
import { randomUUID } from "crypto";

const DynamoDB = new AWS.DynamoDB.DocumentClient();

interface Payload {
  movieId: string;
  message: string;
  rating: number;
}

const MAX_RATING = 5;

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event
) => {
  let body = null;
  let statusCode = 200;

  try {
    const { sub, name, picture } = event.requestContext.authorizer.claims;
    const currentUnixTime = Date.now().toString();

    const data: Payload = JSON.parse(event.body ?? "");

    if (data.movieId == null) {
      throw new Error("Movie id is missing");
    }

    if (data.message == null && data.rating == null) {
      throw new Error("Review message or rating is missing");
    }

    if (data.rating != null) {
      if (!isFinite(data.rating) || isNaN(data.rating)) {
        throw new Error("Rating is not a valid number");
      }

      if (Number(data.rating) < 0 || Number(data.rating) > MAX_RATING) {
        throw new Error(`Rating is bigger than ${MAX_RATING}`);
      }
    }

    const Item = {
      id: randomUUID(),
      author: { name, picture },
      authorId: sub,
      message: data.message,
      rating: data.rating,
      createdAt: currentUnixTime,
      updatedAt: currentUnixTime,
    };

    await DynamoDB.put({
      TableName: process.env.REVIEWS_TABLE!,
      Item,
    }).promise();

    statusCode = 200;
    body = Item;
  } catch (error) {
    statusCode = 500;
    body = error instanceof Error ? error.message : error;
  }

  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS, POST",
    },
    statusCode,
    body: JSON.stringify(body),
  };
};

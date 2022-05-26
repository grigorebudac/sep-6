import { APIGatewayProxyWithCognitoAuthorizerHandler } from "aws-lambda";
import AWS from "aws-sdk";

const DynamoDB = new AWS.DynamoDB.DocumentClient();

interface Movie {
  movieId: string;
  cover: string;
  title: string;
}

interface Payload {
  title: string;
  movies: Movie[];
}

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event
) => {
  let body = null;
  let statusCode = 200;

  try {
    const { sub } = event.requestContext.authorizer.claims;
    const currentUnixTime = Date.now().toString();

    const watchlistId = event.pathParameters?.["watchListId"];

    const data: Payload = JSON.parse(event.body ?? "{}");
    const { title, movies } = data;

    if (watchlistId == null) {
      throw new Error("Watchlist id is missing");
    }

    if (title == null && movies == null) {
      throw new Error("Watchlist title or movie list are missing");
    }

    // adds the title and movies to the object independently if they are provided
    const Item = {
      id: watchlistId,
      userId: sub,
      ...(title) && { title: title },
      ...(movies) && { movies: movies },
      updatedAt: currentUnixTime,
    };

    let updateExpression = "set #updatedAt = :updatedAt";
    if (title != null) updateExpression += ", #title = :title";
    if (movies != null) updateExpression += ", #movies = :movies";

    await DynamoDB.update({
      TableName: process.env.WATCHLISTS_TABLE!,
      Key: { id: watchlistId },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: {
        ...(title) && { "#title": "title" },
        ...(movies) && { "#movies": "movies" },
        "#updatedAt": "updatedAt",
      },
      ExpressionAttributeValues: {
        ...(title) && { ":title": Item.title },
        ...(movies) && { ":movies": Item.movies },
        ":updatedAt": Item.updatedAt,
      },
      ReturnValues: "ALL_NEW",
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
      "Access-Control-Allow-Methods": "OPTIONS, PATCH",
    },
    statusCode,
    body: JSON.stringify(body),
  };
};

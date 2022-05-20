import { APIGatewayProxyWithCognitoAuthorizerHandler } from "aws-lambda";
import AWS from "aws-sdk";

const DynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event
) => {
  let body = null;
  let statusCode = 200;

  try {
    const { sub } = event.requestContext.authorizer.claims;
    const watchlistId = event.pathParameters?.["id"];

    if (watchlistId == null) {
      throw new Error("Watchlist id is missing");
    }

    await DynamoDB.delete({
      TableName: process.env.WATCHLISTS_TABLE!,
      Key: { id: watchlistId },
      ConditionExpression: `userId = :userId`,
      ExpressionAttributeValues: {
        ":userId": sub,
      },
    }).promise();

    statusCode = 200;
    body = watchlistId;
  } catch (error) {
    statusCode = 500;
    if (error instanceof Error) {
      body = error.message;
      if (error.message === "The conditional request failed") {
        statusCode = 400;
        body = "You don't have permission to delete this watchlist";
      }
    } else {
      body = error;
    }
  }

  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS, DELETE",
    },
    statusCode,
    body: JSON.stringify(body),
  };
};

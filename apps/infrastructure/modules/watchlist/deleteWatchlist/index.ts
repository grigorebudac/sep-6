import { APIGatewayProxyWithCognitoAuthorizerHandler } from "aws-lambda";
import AWS from "aws-sdk";

const DynamoDB = new AWS.DynamoDB.DocumentClient();

interface Payload {
  reviewId: string;
}

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event
) => {
  let body = null;
  let statusCode = 200;

  try {
    // const { sub } = event.requestContext.authorizer.claims;
    const sub = "test";
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
    body = error instanceof Error ? error.message : error;
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

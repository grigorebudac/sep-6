import { APIGatewayProxyWithCognitoAuthorizerHandler } from "aws-lambda";
import AWS from "aws-sdk";

const DynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event
) => {
  let body = null;
  let statusCode = 200;

  try {
    // const { sub, name, picture } = event.requestContext.authorizer.claims;
    const watchlistId = event.pathParameters?.["id"];
    const userId = event.queryStringParameters?.["user-id"];

    const data = await DynamoDB.scan({
      TableName: process.env.WATCHLISTS_TABLE!,
      ...(watchlistId) && { FilterExpression: "id = :id", ExpressionAttributeValues: { ":id": watchlistId } },
      ...(userId && watchlistId == null) && { FilterExpression: "userId = :userId", ExpressionAttributeValues: { ":userId": userId } },
    }).promise();

    if (watchlistId && data?.Items?.length === 0) {
      statusCode = 404;
      throw new Error("Watchlist not found");
    }

    statusCode = 200;
    body = data?.Items ?? [];
    if (watchlistId && body.length === 1) body = body[0];
  } catch (error) {
    statusCode = 500;

    if (error instanceof Error && error.message === "Watchlist not found") {
      statusCode = 404;
    }

    body = error instanceof Error ? error.message : error;
  }

  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS, GET",
    },
    statusCode,
    body: JSON.stringify(body),
  };
};

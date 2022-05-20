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

    const data = await DynamoDB.scan({
      TableName: process.env.WATCHLISTS_TABLE!,
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: { ":userId": sub }
    }).promise();

    statusCode = 200;
    body = data?.Items ?? [];
  } catch (error) {
    statusCode = 500;
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

import { APIGatewayProxyWithCognitoAuthorizerHandler } from "aws-lambda";
import AWS from "aws-sdk";
import { randomUUID } from "crypto";

const DynamoDB = new AWS.DynamoDB.DocumentClient();

interface Payload {
  title: string;
}

export const handler: APIGatewayProxyWithCognitoAuthorizerHandler = async (
  event
) => {
  let body = null;
  let statusCode = 201;

  try {
    const { sub } = event.requestContext.authorizer.claims;
    const currentUnixTime = Date.now().toString();

    const data: Payload = JSON.parse(event.body ?? "{}");

    if (data.title == null) {
      throw new Error("Watchlist title is missing");
    }

    const Item = {
      id: randomUUID(),
      title: data.title,
      userId: sub,
      createdAt: currentUnixTime,
      updatedAt: currentUnixTime,
    };

    await DynamoDB.put({
      TableName: process.env.WATCHLISTS_TABLE!,
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

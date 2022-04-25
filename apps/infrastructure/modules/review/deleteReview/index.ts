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
    const { sub } = event.requestContext.authorizer.claims;

    const data: Payload = JSON.parse(event.body ?? "");

    if (data.reviewId == null) {
      throw new Error("Review id is missing");
    }

    await DynamoDB.delete({
      TableName: process.env.REVIEWS_TABLE!,
      Key: {
        id: data.reviewId,
      },
      ConditionExpression: `authorId = :authorId`,
      ExpressionAttributeValues: {
        ":authorId": sub,
      },
    }).promise();

    statusCode = 200;
    body = data;
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

import { PostConfirmationTriggerHandler } from "aws-lambda";
import AWS from "aws-sdk";

const DynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler: PostConfirmationTriggerHandler = async (
  event,
  context,
  callback
) => {
  const { sub, email, name, picture } = event.request.userAttributes;
  const currentUnixTime = Date.now().toString();

  const params = {
    TableName: process.env.USERS_TABLE!,
    Item: {
      id: sub,
      email,
      name,
      picture,
      createdAt: currentUnixTime,
      updatedAt: currentUnixTime,
    },
  };

  await DynamoDB.put(params).promise();

  callback(null, event);
};

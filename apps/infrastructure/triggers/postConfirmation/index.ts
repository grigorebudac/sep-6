import { PostConfirmationTriggerHandler } from "aws-lambda";
import AWS from "aws-sdk";

const DynamoDB = new AWS.DynamoDB();

export const handler: PostConfirmationTriggerHandler = async (
  event,
  context,
  callback
) => {
  const { sub, email } = event.request.userAttributes;
  const currentUnixTime = Date.now().toString();

  const params = {
    TableName: process.env.USERS_TABLE!,
    Item: {
      id: { S: sub },
      email: { S: email },
      createdAt: { S: currentUnixTime },
      updatedAt: { S: currentUnixTime },
    },
  };

  await DynamoDB.putItem(params).promise();

  callback(null, event);
};

import { PostConfirmationTriggerHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import { randomUUID } from 'crypto';

const DynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler: PostConfirmationTriggerHandler = async (
  event,
  context,
  callback,
) => {
  const { sub, email, name, picture, profile } = event.request.userAttributes;
  const currentUnixTime = Date.now().toString();

  const params = {
    TableName: process.env.USERS_TABLE!,
    Item: {
      id: sub,
      email,
      name: name ?? profile,
      picture,
      createdAt: currentUnixTime,
      updatedAt: currentUnixTime,
    },
  };

  await DynamoDB.put(params).promise();

  await DynamoDB.put({
    TableName: process.env.WATCHLISTS_TABLE!,
    Item: {
      id: randomUUID(),
      title: 'Watch later',
      userId: sub,
      createdAt: currentUnixTime,
      updatedAt: currentUnixTime,
    },
  }).promise();

  await DynamoDB.put({
    TableName: process.env.WATCHLISTS_TABLE!,
    Item: {
      id: randomUUID(),
      title: 'Favorite',
      userId: sub,
      createdAt: currentUnixTime,
      updatedAt: currentUnixTime,
    },
  }).promise();

  callback(null, event);
};

import { PostConfirmationTriggerHandler } from 'aws-lambda';
import AWS from 'aws-sdk';
import { randomUUID } from 'crypto';

const DynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler: PostConfirmationTriggerHandler = async (
  event,
  context,
  callback,
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

  const WatchLaterWatchList = {
    id: randomUUID(),
    title: 'Watch later',
    userId: sub,
    createdAt: currentUnixTime,
    updatedAt: currentUnixTime,
  };

  const FavoriteWatchList = {
    id: randomUUID(),
    title: 'Favorite',
    userId: sub,
    createdAt: currentUnixTime,
    updatedAt: currentUnixTime,
  };

  await DynamoDB.put({
    TableName: process.env.WATCHLISTS_TABLE!,
    WatchLaterWatchList,
  }).promise();

  await DynamoDB.put({
    TableName: process.env.WATCHLISTS_TABLE!,
    FavoriteWatchList,
  }).promise();

  callback(null, event);
};

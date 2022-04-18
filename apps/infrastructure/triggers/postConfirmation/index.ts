import { PostConfirmationTriggerHandler } from "aws-lambda";

export const handler: PostConfirmationTriggerHandler = async (
  event,
  context,
  callback
) => {
  console.log("--> add user to dynamodb");
  callback(null, event);
};

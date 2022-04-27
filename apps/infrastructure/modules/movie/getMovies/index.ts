import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (
  event,
  context,
  callback
) => {
  return {
    statusCode: 200,
    body: JSON.stringify([
      { title: "movie1" },
      { title: "movie2" },
      { title: "movie3" },
    ]),
  };
};

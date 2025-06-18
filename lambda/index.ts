// lambda/index.ts

import { APIGatewayEvent, Context } from "aws-lambda";

export async function handler(event: APIGatewayEvent, context: Context) {
  console.log("Received event:", JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda (TypeScript)!",
      input: event,
    }),
  };
}
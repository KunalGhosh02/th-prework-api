import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayEvent, Context } from 'aws-lambda';

import { app } from './src/express';
import { connectToDB } from './src/utils/database';

let serverlessExpressInstance: any;

const setup = async (event: any, context: Context) => {
  await connectToDB();
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
};

export const handler = (event: APIGatewayEvent, context: Context) => {
  if (serverlessExpressInstance) {
    return serverlessExpressInstance(event, context);
  }

  return setup(event, context);
};

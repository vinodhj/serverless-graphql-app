#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ServerlessGraphqlAppStack } from "../lib/serverless-graphql-app-stack";

const app = new cdk.App();
new ServerlessGraphqlAppStack(app, "ServerlessGraphqlAppStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

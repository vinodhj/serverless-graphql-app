import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ServerlessGraphqlAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   //  Create the Lambda function
    const graphqlLambda = new cdk.aws_lambda.Function(this, 'GraphQLHandler', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: cdk.aws_lambda.Code.fromAsset('graphql'),
    });

     // Create the API Gateway
    new cdk.aws_apigateway.LambdaRestApi(this, 'GraphQLEndpoint', {
      handler: graphqlLambda,
    });
  }
}

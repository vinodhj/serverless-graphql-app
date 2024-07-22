import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ServerlessGraphqlAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an IAM role with the necessary permissions
    const lambdaExecutionRole = new cdk.aws_iam.Role(
      this,
      "LambdaExecutionRole",
      {
        assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
        managedPolicies: [
          cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
            "service-role/AWSLambdaBasicExecutionRole"
          ),
          cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
            "service-role/AWSLambdaVPCAccessExecutionRole"
          ),
        ],
        inlinePolicies: {
          customerPolicy: new cdk.aws_iam.PolicyDocument({
            statements: [
              new cdk.aws_iam.PolicyStatement({
                actions: [
                  "iam:CreateRole",
                  "iam:PutRolePolicy",
                  "iam:AttachRolePolicy",
                  "iam:PassRole",
                  "tag:GetResources",
                  "tag:TagResources",
                ],
                resources: ["*"],
              }),
            ],
          }),
        },
      }
    );

    //  Create the Lambda function
    const graphqlLambda = new cdk.aws_lambda.Function(this, "GraphQLHandler", {
      runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: cdk.aws_lambda.Code.fromAsset("graphql"),
      role: lambdaExecutionRole,
    });

    // Create the API Gateway
    new cdk.aws_apigateway.LambdaRestApi(this, "GraphQLEndpoint", {
      handler: graphqlLambda,
    });
  }
}

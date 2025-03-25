import type { ResourcesConfig } from "aws-amplify";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID),
  },
};

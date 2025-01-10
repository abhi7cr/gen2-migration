import { RemovalPolicy } from "aws-cdk-lib";
import { auth } from "./auth/resource";
import { defineBackend } from "@aws-amplify/backend";
import { Duration } from "aws-cdk-lib";
const backend = defineBackend({
    auth
});
const cfnUserPool = backend.auth.resources.cfnResources.cfnUserPool;
cfnUserPool.userPoolName = "gen1auth77b29935_userpool_77b29935-dev";
cfnUserPool.usernameAttributes = undefined;
cfnUserPool.policies = {
    passwordPolicy: {
        minimumLength: 8,
        requireLowercase: false,
        requireNumbers: false,
        requireSymbols: false,
        requireUppercase: false,
        temporaryPasswordValidityDays: 7
    }
};
// cfnUserPool.applyRemovalPolicy(RemovalPolicy.RETAIN, { applyToUpdateReplacePolicy: true })
const cfnIdentityPool = backend.auth.resources.cfnResources.cfnIdentityPool;
cfnIdentityPool.identityPoolName = "gen1auth77b29935_identitypool_77b29935__dev";
cfnIdentityPool.allowUnauthenticatedIdentities = false;
// cfnIdentityPool.applyRemovalPolicy(RemovalPolicy.RETAIN, { applyToUpdateReplacePolicy: true })
const userPool = backend.auth.resources.userPool;
userPool.addClient("NativeAppClient", {
    disableOAuth: true,
    authSessionValidity: Duration.minutes(3),
    userPoolClientName: "gen1au77b29935_app_client",
    enablePropagateAdditionalUserContextData: false,
    enableTokenRevocation: true,
    refreshTokenValidity: Duration.days(30)
})

@echo off
echo Creating Amplify Service Role...

REM Create the service role
aws iam create-role ^
  --role-name AmplifyGen2ServiceRole ^
  --assume-role-policy-document file://amplify-service-role-policy.json

REM Attach custom permissions policy
aws iam put-role-policy ^
  --role-name AmplifyGen2ServiceRole ^
  --policy-name AmplifyGen2Permissions ^
  --policy-document file://amplify-permissions-policy.json

REM Get the role ARN
aws iam get-role --role-name AmplifyGen2ServiceRole --query 'Role.Arn' --output text

echo Service role created successfully!
echo Use the ARN above when setting up Amplify Gen2 project.
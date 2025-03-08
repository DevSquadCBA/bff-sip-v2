@echo off
@REM #! /bin/bash
@REM ## AWS KEY
@REM # SET AWS_ACCESS_KEY_ID=
@REM # SET AWS_SECRET_ACCESS_KEY=
@REM # SET AWS_SESSION_TOKEN=
@REM ## VARIABLES ESTANDAR
@REM if [ $# -eq 0 ] 
@REM then
set ENVIRONMENT=develop
@REM else
@REM     ENVIRONMENT=$1
@REM fi
set CI_PROJECT_NAME=bff-sip-api
set STACK=%ENVIRONMENT%-%CI_PROJECT_NAME%
for /f "tokens=*" %%a in ('aws sts get-caller-identity --query Account --output text') do set AWS_ACCOUNT_NUMBER=%%a
set BUCKET=%AWS_ACCOUNT_NUMBER%-%STACK%-deploy-piatti
set REGION_1=us-east-1
@REM #PROFILE=924447079950_AZAWS-Architect
set PROFILE=default

echo %BUCKET%
echo "================== Create Bucket =================="
aws s3api create-bucket --bucket %BUCKET%

echo "================== Build =================="
sam build -c -p --beta-features && sam deploy --no-confirm-changeset --s3-bucket %BUCKET% --region %REGION_1% --profile %PROFILE% --stack-name %STACK% --capabilities CAPABILITY_NAMED_IAM --parameter-overrides Environment=%ENVIRONMENT%

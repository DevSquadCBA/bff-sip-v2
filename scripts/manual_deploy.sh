#! /bin/bash
## AWS KEY
# SET AWS_ACCESS_KEY_ID=
# SET AWS_SECRET_ACCESS_KEY=
# SET AWS_SESSION_TOKEN=
## VARIABLES ESTANDAR
if [ $# -eq 0 ] 
then
    ENVIRONMENT=develop
else
    ENVIRONMENT=$1
fi
CI_PROJECT_NAME=bff-sip-api
STACK=$ENVIRONMENT-$CI_PROJECT_NAME
AWS_ACCOUNT_NUMBER=$(aws sts get-caller-identity --query Account --output text)
BUCKET="${AWS_ACCOUNT_NUMBER}-${STACK}-deploy-piatti"
REGION_1=us-east-1
#PROFILE=924447079950_AZAWS-Architect
PROFILE=default

echo "================== Create Bucket =================="
#aws s3api create-bucket --bucket $BUCKET

echo "================== Build =================="
sam build -c -p --beta-features 

echo "================== Deploy =================="
sam deploy --no-confirm-changeset --s3-bucket $BUCKET --region $REGION_1 --profile $PROFILE --stack-name $STACK --capabilities CAPABILITY_NAMED_IAM --parameter-overrides Environment=$ENVIRONMENT

@echo off
@REM VARIABLES ESTANDAR
if "%1" == "" (
    set ENVIRONMENT=develop
) else (
    set ENVIRONMENT=%1
)
set CI_PROJECT_NAME=bff-sip-api
set STACK=%ENVIRONMENT%-%CI_PROJECT_NAME%
for /f "tokens=*" %%a in ('aws sts get-caller-identity --query Account --output text') do set AWS_ACCOUNT_NUMBER=%%a
set BUCKET=%AWS_ACCOUNT_NUMBER%-%STACK%-deploy-piatti
set REGION_1=us-east-1
set PROFILE=default
set ARN_CERT= CONFIGURA TU ARM AQUÍ (lee el readme)

echo %BUCKET%
echo "================== Create Bucket =================="
aws s3api create-bucket --bucket %BUCKET%-persistance
aws s3api create-bucket --bucket %BUCKET%

echo "================== Build =================="
sam deploy  --template-file persistance.yaml --no-confirm-changeset --s3-bucket %BUCKET% --region %REGION_1% --profile %PROFILE% --stack-name %STACK% --capabilities CAPABILITY_NAMED_IAM --parameter-overrides ACMCertificateArn=%ARN_CERT%

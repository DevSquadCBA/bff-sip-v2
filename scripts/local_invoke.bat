set NODE_ENV=develop
rem cd ..
set PROFILE=default
node ./scripts/generateEnvVars.mjs

echo "================== Build =================="
sam build --beta-features -c -p --profile %PROFILE% && sam local start-api --parameter-overrides Environment=%NODE_ENV% -n scripts/env_vars.json --host 0.0.0.0 --port 3001 --profile %PROFILE%

echo "================== Start API =================="

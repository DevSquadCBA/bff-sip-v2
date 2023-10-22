## Necesario ejecutar docker
## VARIABLES ESTANDAR
NODE_ENV=develop
#PROFILE=924447079950_AZAWS-Architect
PROFILE=default
node ./scripts/generateEnvVars.mjs
echo "================== Build =================="
sam build --beta-features -c -p --profile $PROFILE

echo "================== Start API =================="
sam local start-api --parameter-overrides Environment=$NODE_ENV -n scripts/env_vars.json --host 0.0.0.0 --profile $PROFILE

[![Deploy-AWS-PROD](https://github.com/DevSquadCBA/bff-sip-v2/actions/workflows/deploy_aws_prod.yml/badge.svg?event=check_run)](https://github.com/DevSquadCBA/bff-sip-v2/actions/workflows/deploy_aws_prod.yml)

# Backend for frontend of Sistema Integral Piatti

## Pre install

Hay que clonar este repositorio. Ir a la carpeta del proyecto y ejecutar.

```bash
npm install
```

## Ejecutar en local
Dentro de scripts/.env hay que configurar la conexión con la base de datos (no se provee en este proyecto)
<br>
Luego ejecutar

```bash
npm run dev
```

## Ejecutar en AWS
Este proyecto fue construído con <a href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html">SAM (Aws Serverless Application)</a><br>
Es necesario contar con una cuenta de AWS para poder hacer el deploy directo. Para ello se debe instalar <a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html">el cli de AWS</a> y configurar tu cuenta para usarla con CLI. Recomiendo leer detalladamente con hacer este paso <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html">aquí</a>
<br>
Una vez configurado aws cli y sam cli, hay que ir a la carpeta del proyecto.<br>
<br>
> [!IMPORTANT] <br>
> Antes de ejecutar el despliegue, es necesario configurar algunos parámetros en los templates:
<br>


### Configuración de SSM
SSM es un servicio de aws para guardar secretos en la nube. No es lo mas eficiente, pero lo aleja del repositorio<br>
Para ello, se debe acceder a System Manager y en el menú izquierdo en Parameter Store. <br>
<a href="https://us-east-1.console.aws.amazon.com/systems-manager/parameters/">Aquí</a> está el link para la región us-east-1. Asegúrate de configurarlo en tu región.<br>
El template.yaml, consume estos ssm para definir los .env del proyecto. <br>

```ini
/host # el host de tu servidor mysql
/user # user de mysql
/pass # password de mysql
{Environment}/database # nombre de la base de datos. Nótese que Environment tienes que cambiarlo por develop o prod
{Environment}/JWT # crea un JWT secret para poder ser utilizado en la autorización
```

### Crear el Certificado SSL en AWS ACM (Manual)
Ir a AWS ACM: <a href="https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/welcome">AWS Certificate Manager</a><br>
Solicitar un nuevo certificado en "Public Certificates".<br>
Ingresar los dominios:<br>
```
dev-sip.[tudominio].com
sip.[tudominio].com
```
Seleccionar "DNS Validation".<br>
Copiar los registros CNAME que muestra AWS.<br>
Ir a Cloudflare → DNS y agregar los registros CNAME correspondientes.<br>
Esperar hasta que AWS valide el certificado.<br>

### Obtener el ARN del Certificado
Una vez validado, copiar el ARN del certificado en AWS ACM.
Ejemplo de ARN:
```
arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-efgh5678-ijkl9012-mnop3456
```


### Despliegue de la configuración de dominio
Dentro de scripts/manual_persistance.[sh|bat], debes cambiar la variable de arn_cert con la que copiaste en el paso anterior<br>
Dentro de persistance.yml, tienes que cambiar el dominio principal.<br>
Una vez configurado el dominio despliega el stack con:
```bash
./script/manual_persistance.[sh|bat]
```

### Despliegue de la aplicación de stack
En el template.yaml, no deberías cambiar nada. <br>
Debes modificar el entorno dentro de scripts/manual_deploy.[sh|bat] por prod si quieres despegar a prod<br>
Luego deberás ejecutar:

```bash
# Para entornos Linux o MacOs
./scripts/manual_deploy.sh
# Para Windows
./scripts/manual_deploy.bat
```
Esto desplegará la infraestuctura por código de todo el proyecto. Es decir, creará los recursos necesarios para conectar con la api y demás.

### Enlace al backend
Una vez ejecutado el proyecto, debes enlazarlo con Cloudflare (o el servicio de hosting que uses)<br>
Para ello, deberás copiar el output que te indica el stack de cloudformation<br>
Dirígete a <a href="https://us-east-1.console.aws.amazon.com/cloudformation/home">CloudFormation dentro de la consola de AWS</a> y luego a tu stack de la aplicación<br>
Debería llamarse [develop|prod]-bff-sip-api.<br>
Copia el output, debería ser una url con este formato: 
```
abcdefghij.execute-api.us-east-1.amazonaws.com
```
Luego debes ir a Cloudflare y agragar a mano estas configuraciones. <br>

| Tipo  | Nombre  | Destino (Valor)                                | Proxy      |
|-------|---------|------------------------------------------------|------------|
| CNAME | dev-sip | abcdefghij.execute-api.us-east-1.amazonaws.com | ❌ DNS Only |
| CNAME | sip     | abcdefghij.execute-api.us-east-1.amazonaws.com | ❌ DNS Only |

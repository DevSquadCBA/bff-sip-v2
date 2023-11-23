// import Budget, { IBudget } from 'models/Budget';
// import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
// //El validador deberia ser un nuevo budget?
// import { LambdaResolver } from 'utils/lambdaResolver';

// const domain = async (event:Event): Promise<{body:IBudget[], statusCode:number}> => {
//     return {
//         body: await Budget.createBudget(event.queryStringParameters.offset, event.queryStringParameters.limit) as IBudget[],
//         statusCode: 200
//     }
// }
//tratando de seguir la logica del GetBudgets,creo que deberia crear un getNew para traer los nuevos budgets.
// export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS]) Los validadores deberian ser otros.
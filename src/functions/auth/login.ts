import jwt from "jsonwebtoken";
import { User } from "models/User";
import { ApiGatewayParsedEvent } from "types/response-factory/proxies";
import { LambdaResolver } from "utils/lambdaResolver";

import { NotFoundError } from "types/errors";
import { compare } from "functions/utils/hash";
import { Rol } from "models/Rol";
import { IToken } from "models/Token";
import { Validators } from "utils/Validator";

interface Event extends ApiGatewayParsedEvent {
    body: {
        email: string;
        password: string;
    };
}

const domain = async (event: Event) => {
    const { email, password } = event.body;
    console.log(email, password);
    const user = await User.findOne({
        where: {
            email
        },
        include:{
            model: Rol,
            attributes: ['id', 'name', 'description']
        }
    })
    if (!user) {
        throw new NotFoundError('Email or password incorrect');
    }
    if (user) {
        const isValid = await compare(password, user.password);
        if (!isValid) {
            throw new NotFoundError('Email or password incorrect');
        }
    }
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role.name } as IToken,
        process.env.JWT as string,
        {expiresIn: '1d',algorithm: 'HS256'}
    );
    return {
        body: token,
        statusCode: 200
    }
}
export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.VALID_JSON])
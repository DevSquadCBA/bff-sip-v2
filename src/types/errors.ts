interface HttpErrorOptions {
    cause?: unknown;
    statusCode: number;
    code?: string;
}
interface CustomHttpErrorOptions {
    cause?: unknown;
    code?: string;
}
/** HTTPError base class. Extend this class to generate custom error types that meet your business needs. */
export class HTTPError extends Error {
    statusCode: number;
    code: string;
    constructor(message: string, options?: HttpErrorOptions){
        super();
        this.message = message;
        this.code =  options?.code || 'unknown error';
        this.statusCode = options?.statusCode || 500;
    };
}
export class BadRequestError extends HTTPError {
    constructor(message: string, options?: CustomHttpErrorOptions){
        super(message, {...options, statusCode: 400, code: 'BAD_REQUEST'});
    };
}
export class UnauthorizedError extends HTTPError {
    constructor(message: string, options?: CustomHttpErrorOptions){
        super(message, {...options, statusCode: 401, code: 'UNAUTHORIZED'});
    };
}
export class ForbiddenError extends HTTPError {
    constructor(message: string, options?: CustomHttpErrorOptions){
        super(message, {...options, statusCode: 403, code: 'FORBIDDEN'});
    };
}
export class NotFoundError extends HTTPError {
    constructor(message: string, options?: CustomHttpErrorOptions){
        super(message, {...options, statusCode: 404, code: 'NOT_FOUND'});
    };
}
export class NotAcceptableError extends HTTPError {
    constructor(message: string, options?: CustomHttpErrorOptions){
        super(message, {...options, statusCode: 406, code: 'NOT_ACCEPTABLE'});
    };
}
export class ConflictError extends HTTPError {
    constructor(message: string, options?: CustomHttpErrorOptions){
        super(message, {...options, statusCode: 409, code: 'CONFLICT'});
    };
}
export class InternalServerError extends HTTPError {
    constructor(message: string, options?: CustomHttpErrorOptions){
        super(message, {...options, statusCode: 500, code: 'INTERNAL_SERVER_ERROR'});
    };
}
export class BadGatewayError extends HTTPError {
    constructor(message: string, options?: CustomHttpErrorOptions){
        super(message, {...options, statusCode: 502, code: 'BAD_GATEWAY'});
    };
}

export class InvalidIdError extends HTTPError {
    constructor(message: string, options?: CustomHttpErrorOptions){
        super(message, {...options, statusCode: 400, code: 'INVALID_ID'});
    };
}

export class ErrorOnDelete extends HTTPError {
    constructor(message: string, options?: CustomHttpErrorOptions){
        super(message, {...options, statusCode: 400, code: 'ERROR_ON_DELETE'});
    };
}
export {};

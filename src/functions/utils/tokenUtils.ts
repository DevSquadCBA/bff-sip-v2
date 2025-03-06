import { IToken } from "models/Token";
import jwt from 'jsonwebtoken';

export function getRoleFromToken(token: string) {
    const decodedToken = jwt.decode(token);
    return (decodedToken as IToken).role;
}
export function getNameFromToken(token:string){
    const decodedToken = jwt.decode(token);
    return (decodedToken as IToken).username
}
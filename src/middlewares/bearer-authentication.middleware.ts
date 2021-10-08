import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';
import userRespository from "../repositories/user.respository";

async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){

    try {

        const authorizationHeader = req.headers["authorization"];       
    
        if(!authorizationHeader){
            throw new ForbiddenError("Credencias não informadas");
        }

        const [authorizationType, token] = authorizationHeader.split(' ');

        if(authorizationType != 'Bearer' || !token){
            throw new ForbiddenError("Tipo de autenticação inválido");
        }

        const tokenPayload = JWT.verify(token, 'my_secret_key');

        
        if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
            throw new ForbiddenError("Token inválido");
        }

        
        
        const user = {
            uuid: tokenPayload.sub,
            username: tokenPayload.username

        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }

}

export default bearerAuthenticationMiddleware;
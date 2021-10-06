import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRespository from "../repositories/user.respository";


const authorizationRoute = Router();

authorizationRoute.post("/token", async (req: Request, res: Response, next: NextFunction) => {

    try {
        const authorizationHeader = req.headers["authorization"];
    
        if(!authorizationHeader){
            throw new ForbiddenError("Credencias não informadas");
        }

        const [authorizationType, token] = authorizationHeader.split(" ");
        if(authorizationType !== "Basic" || !token){
            throw new ForbiddenError("Tipo de autenticação invalido");
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = tokenContent.split(':');

        if(!username || !password){
            throw new ForbiddenError("Credencias não preenchidas");
        }

        const user = await userRespository.findByUsernameAndPassword(username, password);
        console.log(user);
        


    } catch (error) {
        next(error);
    }

    

});

export default authorizationRoute;
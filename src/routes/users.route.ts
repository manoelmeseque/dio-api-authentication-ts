import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.model';
import userRespository from '../repositories/user.respository';

const usersRoute = Router();

// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid


usersRoute.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRespository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
});

usersRoute.get("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    const user = await userRespository.findById(uuid);
    res.status(StatusCodes.OK).send(user);
});

usersRoute.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    const uuid = await userRespository.create(newUser);

    res.status(StatusCodes.CREATED).send(uuid);
});

usersRoute.put("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;

    await userRespository.update(modifiedUser);
    res.status(StatusCodes.OK).send();
});

usersRoute.delete("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
        await userRespository.remove(uuid);
        res.sendStatus(StatusCodes.OK);
        
    }catch(error){
        next(error);
    }
    
});

export default usersRoute;

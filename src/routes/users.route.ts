import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.model';
import userRespository from '../repositories/user.respository';

const usersRouter = Router();

// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid


usersRouter.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRespository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
});

usersRouter.get("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    const user = await userRespository.findById(uuid);
    res.status(StatusCodes.OK).send(user);
});

usersRouter.post("/users", async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    const uuid = await userRespository.create(newUser);

    res.status(StatusCodes.CREATED).send(uuid);
});

usersRouter.put("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;

    await userRespository.update(modifiedUser);
    res.status(StatusCodes.OK).send();
});

usersRouter.delete("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
        await userRespository.remove(uuid);
        res.sendStatus(StatusCodes.OK);
        
    }catch(error){
        next(error);
    }
    
});

export default usersRouter;

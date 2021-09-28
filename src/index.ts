import express, { Request, Response, NextFunction} from 'express'
const app = express();


app.get("/status", (req: Request, res: Response, next: NextFunction ) => {
    res.status(200).send({ message: "Aplicação Rodando..."});
})

app.listen(3000, () => {
    console.log(`Aplicação roando na porta 3000!`);
})
import express from 'express';
import statusRoute from './routes/status.route';
import usersRouter from './routes/users.route';
const app = express();

// configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configurações de rotas
app.use(usersRouter);
app.use(statusRoute);


app.listen(3000, () => {
    console.log(`Aplicação roando na porta 3000!`);
})
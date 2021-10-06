import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
const app = express();

// configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configurações de rotas
app.use(usersRoute);
app.use(statusRoute);
app.use(authorizationRoute);


// configuração dos handlers de error
app.use(errorHandler);


app.listen(3000, () => {
    console.log(`Aplicação roando na porta 3000!`);
})
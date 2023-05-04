import express from 'express';
import ErrorHandler from './Middleware/ErrorHandler';
import { routers, routersMoto } from './Routers/Routers';

const app = express();

app.use(express.json());
app.use(ErrorHandler.handle);
app.use('/cars', routers);
app.use('/motorcycles', routersMoto);

export default app;

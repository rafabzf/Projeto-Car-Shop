import express from 'express';
import ErrorHandler from './Middleware/ErrorHandler';
import routers from './Routers/Routers';

const app = express();

app.use(express.json());
app.use(ErrorHandler.handle);
app.use(routers);

export default app;

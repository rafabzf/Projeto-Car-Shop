import { NextFunction, Request, Response, Router } from 'express';
import CarController from '../Controllers/CarController';

const routers = Router();

routers.post('/cars', (req: Request, res: Response, next: NextFunction) => 
  new CarController(req, res, next).create());

routers.get('/cars', (req: Request, res: Response, next: NextFunction) => 
  new CarController(req, res, next).findById());

routers.get('/cars/:id', (req: Request, res: Response, next: NextFunction) => 
  new CarController(req, res, next).findOneCar());

export default routers;
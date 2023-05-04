import { NextFunction, Request, Response, Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routers = Router();
const routersMoto = Router();

routers.post('/', (req: Request, res: Response, next: NextFunction) => 
  new CarController(req, res, next).create());

routers.get('/', (req: Request, res: Response, next: NextFunction) => 
  new CarController(req, res, next).findAll());

routers.get('/:id', (req: Request, res: Response, next: NextFunction) => 
  new CarController(req, res, next).findOneCar());

routers.put('/:id', (req: Request, res: Response, next: NextFunction) => 
  new CarController(req, res, next).upById());

routersMoto.post('/', (req: Request, res: Response, next: NextFunction) =>
  new MotorcycleController(req, res, next).create());

export { routers, routersMoto };
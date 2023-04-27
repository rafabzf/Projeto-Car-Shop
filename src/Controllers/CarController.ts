import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

class CarController {
  private req: Request;
  private res: Response;
  private service: CarService;
  private next: NextFunction;

  constructor(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    this.req = req;
    this.res = res;
    this.service = new CarService();
    this.next = next;
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model, 
      year: this.req.body.year, 
      color: this.req.body.color, 
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
      status: this.req.body.status,
    };

    try {
      const carNew = await this.service.car(car);

      return this.res
        .status(201)
        .json(carNew);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;

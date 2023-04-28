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

  public async findAll() {
    const { type, message } = await this.service.findAll();

    if (type) {
      return this.res
        .status(404)
        .json({ message });
    }

    const all = message as ICar[];

    const response = all.map((car) => ({
      id: car.id,
      model: car.model, 
      year: car.year, 
      color: car.color, 
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty,
      status: car.status,
    }));

    return this.res
      .status(200)
      .json(response);
  }

  public async findOneCar() {
    const { id } = this.req.params;
    const { type, message } = await this.service.findOneCar(id);

    if (type) {
      return this.res
        .status(type)
        .json({ message });
    }

    const car = message as ICar;

    const response = {
      id: car.id,
      model: car.model, 
      year: car.year, 
      color: car.color, 
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty,
      status: car.status,
    };

    return this.res
      .status(200)
      .json(response);
  }
}

export default CarController;

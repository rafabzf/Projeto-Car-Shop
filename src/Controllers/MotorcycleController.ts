import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }
  
  public async create() {
    const moto: IMotorcycle = {
      model: this.req.body.model, 
      year: this.req.body.year, 
      color: this.req.body.color,  
      buyValue: this.req.body.buyValue,
      status: this.req.body.status,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity, 
    };

    try {
      const motoNew = await this.service.moto(moto);
      return this.res
        .status(201)
        .json({
          id: motoNew?.getId(),
          model: motoNew?.getModel(),
          year: motoNew?.getYear(),
          color: motoNew?.getColor(),
          status: motoNew?.getStatus(),
          buyValue: motoNew?.getBuyValue(),
          category: motoNew?.getCategory(),
          engineCapacity: motoNew?.getEngineCapacity(),
        });
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;
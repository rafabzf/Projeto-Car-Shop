import { Model, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  private model: Model<ICar>;

  constructor() {
    super();
    this.schema = this.schema.add({
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar | null> {
    return this.model.create({ ...car });
  }

  public async findAll(): Promise<ICar[] | null> {
    return this.model.find();
  }

  public async findOneCar(id: string): Promise<ICar | null> {
    return this.model.findOne({ _id: id });
  }

  public async upById({
    id,
    model: modelCar,
    year,
    color,
    buyValue,
    seatsQty,
    doorsQty,
    status,
  }: ICar) {
    this.model.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          model: modelCar,
          year,
          color,
          buyValue,
          seatsQty,
          doorsQty,
          status,
        },
      },
    );
  }
}

export default CarODM;
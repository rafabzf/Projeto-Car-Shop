import { Model, Schema, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private schema: Schema;
  private modelCar: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      buyValue: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      status: { type: Boolean, required: false },
    });

    this.modelCar = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar | null> {
    return this.modelCar.create({ ...car });
  }

  public async findAll(): Promise<ICar[] | null> {
    return this.modelCar.find();
  }

  public async findOneCar(id: string): Promise<ICar | null> {
    return this.modelCar.findOne({ _id: id });
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
    this.modelCar.updateOne(
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
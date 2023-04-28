import { Model, Schema, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

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
}

export default CarODM;
import { Model, model, models } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  private model: Model<IMotorcycle>;
  constructor() {
    super();
    this.schema = this.schema.add({
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });

    this.model = models.Car || model('Car', this.schema);
  }

  public async create(moto: IMotorcycle): Promise<IMotorcycle | null> {
    await this.model.create({ ...moto });

    const motoNew = await this.model.findOne({
      model: moto.model,
      year: moto.year,
      color: moto.color,
      buyValue: moto.buyValue,
      doorsQty: moto.category,
      seatsQty: moto.engineCapacity,
      status: moto.status,
    });

    return motoNew;
  }
}

export default MotorcycleODM;
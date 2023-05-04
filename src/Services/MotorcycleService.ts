import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createCar(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle({
        id: moto.id,
        model: moto.model, 
        year: moto.year, 
        color: moto.color,  
        buyValue: moto.buyValue,
        category: moto.category,
        engineCapacity: moto.engineCapacity,
        status: moto.status,
      });
    }

    return null;
  }

  public async moto(car: IMotorcycle) {
    const odmMoto = new MotorcycleODM();
    const motoNew = await odmMoto.create(car);
    return this.createCar(motoNew);
  }
}

export default MotorcycleService;
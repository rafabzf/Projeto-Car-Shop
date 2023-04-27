import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private crateCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(
        {
          id: car.id,
          model: car.model, 
          year: car.year, 
          color: car.color, 
          status: car.status, 
          buyValue: car.buyValue,
          doorsQty: car.doorsQty,
          seatsQty: car.seatsQty,
        },
      );
    }
    return null;
  }

  public async car(car: ICar) {
    const odmCar = new CarODM();
    const carNew = await odmCar.create(car);
    return this.crateCarDomain(carNew);
  }
}

export default CarService;
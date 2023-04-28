import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

const notFoundMessage = 'Car not found'; 

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

  public async findAll(): Promise<{ type: number, message: ICar[] | null | string }> {
    const odmCar = new CarODM();
    const cars = await odmCar.findAll();

    if (!cars) {
      return {
        type: 404,
        message: notFoundMessage,
      };
    } 
    return {
      type: 0,
      message: cars,
    };
  }

  public async findOneCar(id: string): Promise<{ type: number, message: ICar | null | string }> {
    const odmCar = new CarODM();
    const idValidation = isValidObjectId(id);

    if (!idValidation) {
      return {
        type: 422,
        message: 'Invalid mongo id',
      };
    }

    const car = await odmCar.findOneCar(id);

    if (!car) {
      return {
        type: 404,
        message: notFoundMessage,
      };
    } 
    return {
      type: 0,
      message: car,
    };
  }

  public async upById({
    id,
    model,
    year,
    color,
    buyValue,
    seatsQty,
    doorsQty,
    status,
  }: ICar): Promise<{ type: number, message: ICar | null | string }> {
    const odmCar = new CarODM();

    const idValidation = isValidObjectId(id);

    if (!idValidation) {
      return {
        type: 422,
        message: 'Invalid mongo id',
      };
    }

    const car = await odmCar.findOneCar(id as string);

    if (!car) {
      return {
        type: 404,
        message: notFoundMessage,
      };
    }

    await odmCar.upById({
      id,
      model,
      year,
      color,
      buyValue,
      seatsQty,
      doorsQty,
      status,
    } as ICar);

    return {
      type: 0,
      message: '',
    };
  }
}

export default CarService;
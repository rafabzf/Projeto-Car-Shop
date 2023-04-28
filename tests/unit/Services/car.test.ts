import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Testa a camada Service', function () {
  const input: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Black',      
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  };

  const output: Car = new Car({
    model: 'Marea',
    year: 2002,
    color: 'Black',      
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
    id: '634852326b35b59438fbea31',
  });

  const list = [
    {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    },
    {
      id: '634852326b35b59438fbea31',
      model: 'Tempra',
      year: 1995,
      color: 'Black',
      status: false,
      buyValue: 39,
      doorsQty: 2,
      seatsQty: 5,
    },
  ];

  it('Testa se um carro é criado com sucesso', async function () {
    Sinon.stub(Model, 'create').resolves(output);

    const service = new CarService();

    const result = await service.car(input);

    expect(result).to.be.deep.equal(output);
  });

  it('Testa se retorna os carros', async function () {
    Sinon.stub(Model, 'find').resolves(list);

    const service = new CarService();

    const result = await service.findAll();

    expect(result.message).to.be.deep.equal(list);
  });

  it('Testa se retorna um erro ao passar um id inválido', async function () {
    const id = 'errado';

    const service = new CarService();

    const result = await service.findOneCar(id);

    const messageError = 'Invalid mongo id';

    expect(result.type).to.be.deep.equal(422);
    expect(result.message).to.be.deep.equal(messageError);
  });
});
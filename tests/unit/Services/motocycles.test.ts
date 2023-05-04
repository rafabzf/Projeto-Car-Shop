import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Testa a camada Service de Motocycles', function () {
  it('Testa se uma moto é criada com sucesso', async function () {
    afterEach(function () {
      Sinon.restore();
    });
    
    const input: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
  
    const output: Motorcycle = new Motorcycle({
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    });

    Sinon.stub(Model, 'create').resolves(output);

    const service = new MotorcycleService();

    const result = await service.moto(input);

    expect(result).to.be.deep.equal(output);
  });
});
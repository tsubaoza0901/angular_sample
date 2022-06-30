import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { AwsProduct } from '../model/aws-product';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const awsProducts = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
    ];
    return { awsProducts };
  }

  // Overrides the genId method to ensure that a awsProduct always has an id.
  // If the awsProducts array is empty,
  // the method below returns the initial number (11).
  // if the awsProducts array is not empty, the method below returns the highest
  // awsProduct id + 1.
  genId(awsProducts: AwsProduct[]): number {
    return awsProducts.length > 0
      ? Math.max(...awsProducts.map((awsProduct) => awsProduct.id)) + 1
      : 11;
  }
}

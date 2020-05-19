import {ProductQuantity} from './ProductQuantity';

export class Recipe {
  constructor(public name: string, public product: ProductQuantity[]) {}
}

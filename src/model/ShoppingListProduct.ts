import {Product} from './Product';

export class ShoppingListProduct {
  constructor(
    public product: Product,
    public quantity: number = 0,
    public checked: boolean = false,
  ) {}
}

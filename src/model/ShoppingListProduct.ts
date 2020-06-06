import {Category} from './Category';
import {Product} from './Product';

export class ShoppingListProduct {
  constructor(
    public product: Product,
    public category: Category,
    public quantity: number = 0,
    public checked: boolean = false,
  ) {}
}

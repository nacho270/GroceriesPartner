import {ProductService} from './ProductsService';
import {ShoppingListService} from './ShoppingListService';

let shoppingListService: ShoppingListService = new ShoppingListService();
let productService: ProductService = new ProductService(shoppingListService);

export function getProductService() {
  return productService;
}

export function getShoppingListService() {
  return shoppingListService;
}

import {Category} from './../model/Category';
import {Product} from './../model/Product';
import {ShoppingListService} from './ShoppingListService';

export class ProductService {
  private products: Product[] = [];
  private categories: Category[] = [];

  constructor(private shoppingListService: ShoppingListService) {
    let carniceria = new Category('Carniceria', '#FF0000');
    let verduleria = new Category('Verduleria', '#00FF00');
    this.categories.push(carniceria, verduleria);

    let bife = new Product('Bife', carniceria);
    let molleja = new Product('Molleja', carniceria);
    let ribs = new Product('Ribs', carniceria);
    let papa = new Product('Papa', verduleria);
    let lechuga = new Product('Lechuga', verduleria);
    this.products.push(bife, colita, ribs, papa, lechuga);
  }

  getProducts() {
    return this.products
      .slice()
      .sort((p1, p2) => p1.name.localeCompare(p2.name));
  }

  getCategories() {
    return this.categories.slice();
  }

  addNewCategory(name: string, color: string) {
    this.categories.push(new Category(name, color));
  }

  removeCategory(name: string) {
    if (this.isCategoryInUse(name)) {
      throw "Cannot delete the category because it's being used";
    }
    this.categories = this.categories.filter(c => c.name !== name);
  }

  removeProduct(name: string) {
    if (this.shoppingListService.isProductUsed(name)) {
      throw "Cannot delete the product because it's being used";
    }
    this.products = this.products.filter(p => p.name !== name);
  }

  addNewProduct(name: string, category: Category) {
    this.products.push(new Product(name, category));
  }

  private isCategoryUsedInProduct(categoryName: string): boolean {
    return (
      this.products.filter(p => p.category.name === categoryName).length > 0
    );
  }

  private isCategoryInUse(name: string) {
    return (
      this.shoppingListService.isCategoryUsed(name) ||
      this.isCategoryUsedInProduct(name)
    );
  }
}

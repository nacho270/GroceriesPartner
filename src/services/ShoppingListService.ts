import {Product} from './../model/Product';
import {ShoppingListProduct} from './../model/ShoppingListProduct';

export class ShoppingListService {
  private currentList: ShoppingListProduct[] = [];

  constructor() {
    // let carniceria = new Category('Carniceria', '#FF0000');
    // let verduleria = new Category('Verduleria', '#00FF00');
    // let bife = new Product('Bife', carniceria);
    // let molleja = new Product('Molleja', carniceria);
    // let papa = new Product('Papa', verduleria);
    // let lechuga = new Product('Lechuga', verduleria);
    // this.currentList.push(new ShoppingListProduct(bife));
    // this.currentList.push(new ShoppingListProduct(molleja));
    // this.currentList.push(new ShoppingListProduct(papa, 0, true));
    // this.currentList.push(new ShoppingListProduct(lechuga));
  }

  isCategoryUsed(categoryName: string) {
    return (
      this.currentList.filter(p => p.product.category.name === categoryName)
        .length > 0
    );
  }

  isProductUsed(name: string) {
    return this.currentList.filter(p => p.product.name === name).length > 0;
  }

  addProduct(product: Product, quantity: number) {
    this.currentList.push(new ShoppingListProduct(product, quantity));
  }

  markProductAsChecked(productName: string) {
    this.markProduct(productName, true);
  }

  markProductAsUnhecked(productName: string) {
    this.markProduct(productName, false);
  }

  private markProduct(productName: string, checked: boolean): void {
    let prod = this.currentList.find(listProduct => {
      listProduct.product.name === productName;
    });
    prod.checked = checked;
  }

  removeChecked() {
    this.currentList = this.currentList.filter(e => e.checked);
  }

  getCurrentShoppingList() {
    return this.currentList
      .slice()
      .sort((slp1, slp2) =>
        slp1.product.category.name.localeCompare(slp2.product.category.name),
      );
  }

  getCurrentShoppingListGroupedByCategory() {
    return this.currentList.reduce((r, a) => {
      r[a.product.category.name] = r[a.product.category.name] || [];
      r[a.product.category.name].push(a);
      return r;
    }, Object.create(null));
  }
}

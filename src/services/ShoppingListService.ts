import {Product} from './../model/Product';
import AsyncStorage from '@react-native-community/async-storage';

import {ShoppingListProduct} from './../model/ShoppingListProduct';

export class ShoppingListService {
  private currentList: ShoppingListProduct[] = [];
  private SHOPPING_STORAGE_KEY = '@shopping';

  constructor() {
    this.readShoppingListFromStorage();
    // this.storeShoppingList();
    // let carniceria = new Category('Carniceria', '#FF0000');
    // let verduleria = new Category('Verduleria', '#00FF00');
    // let bife = new Product('Bife', carniceria);
    // let molleja = new Product('Molleja', carniceria);
    // let papa = new Product('Papa', verduleria);
    // let lechuga = new Product('Lechuga', verduleria);
    // this.currentList.push(new ShoppingListProduct(bife, carniceria));
    // this.currentList.push(new ShoppingListProduct(molleja, carniceria));
    // this.currentList.push(new ShoppingListProduct(papa, verduleria, 0, true));
    // this.currentList.push(new ShoppingListProduct(lechuga, verduleria));
  }

  private readShoppingListFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(this.SHOPPING_STORAGE_KEY);
      if (jsonValue === null) {
        return;
      }
      let shoppingListFromStorage = JSON.parse(jsonValue);
      for (var c in shoppingListFromStorage) {
        this.currentList.push(
          new ShoppingListProduct(
            shoppingListFromStorage[c].product,
            shoppingListFromStorage[c].category,
            shoppingListFromStorage[c].number,
            shoppingListFromStorage[c].checked,
          ),
        );
      }
    } catch (e) {
      return;
    }
  };

  private storeShoppingList = async () => {
    try {
      const jsonValue = JSON.stringify(this.currentList);
      await AsyncStorage.setItem(this.SHOPPING_STORAGE_KEY, jsonValue);
    } catch (e) {}
  };

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
    if (!this.isProductUsed(product.name)) {
      this.currentList.push(
        new ShoppingListProduct(product, product.category, quantity, false),
      );
      this.storeShoppingList();
    }
  }

  markProductAsChecked(shoppingItem: ShoppingListProduct) {
    this.markProduct(shoppingItem, true);
    this.storeShoppingList();
  }

  markProductAsUnhecked(shoppingItem: ShoppingListProduct) {
    this.markProduct(shoppingItem, false);
    this.storeShoppingList();
  }

  private markProduct(
    shoppingItem: ShoppingListProduct,
    checked: boolean,
  ): void {
    let prod = this.currentList.find(
      listProduct => listProduct.product.name === shoppingItem.product.name,
    );
    prod.checked = checked;
  }

  removeProduct(product: Product) {
    this.currentList = this.currentList.filter(
      e => e.product.name !== product.name,
    );
    this.storeShoppingList();
  }

  removeChecked() {
    this.currentList = this.currentList.filter(e => !e.checked);
    this.storeShoppingList();
  }

  getCurrentShoppingList() {
    return this.currentList
      .slice()
      .sort((slp1, slp2) =>
        slp1.category.name.localeCompare(slp2.category.name),
      );
  }

  getCurrentShoppingListGroupedByCategory() {
    let groupedList = [];
    let shoppingListByName: ShoppingListProduct[] = this.getCurrentShoppingList();
    if (!shoppingListByName || shoppingListByName.length === 0) {
      return groupedList;
    }

    let index = 0;
    while (index < shoppingListByName.length) {
      let productList = [];
      let currentCategory = shoppingListByName[index].category;
      while (
        index < shoppingListByName.length &&
        shoppingListByName[index].category.name === currentCategory.name
      ) {
        productList.push(shoppingListByName[index]);
        index++;
      }
      groupedList.push({
        category: currentCategory,
        products: productList,
      });
    }
    return groupedList;
  }
}

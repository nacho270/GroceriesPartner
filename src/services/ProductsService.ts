import {Category} from './../model/Category';
import {Product} from './../model/Product';
import {ShoppingListService} from './ShoppingListService';
import AsyncStorage from '@react-native-community/async-storage';
import Color from '../shared/Colors';

export class ProductService {
  private products: Product[] = [];
  private categories: Category[] = [];

  private CATEGORIES_STORAGE_KEY = '@categories';
  private PRODUCTS_STORAGE_KEY = '@products';
  private FIRST_BOOT = '@firstboot';

  private defaultCategories: Category[] = [
    new Category('Carniceria', Color.category.red),
    new Category('Verduleria', Color.category.green),
  ];

  constructor(private shoppingListService: ShoppingListService) {
    this.readCategoriesFromStorage();
    this.readProductsFromStorage();

    // this.storeCategories();
    // this.storeProducts();
    // let carniceria = new Category('Carniceria', Color.category.red);
    // let verduleria = new Category('Verduleria', Color.category.green);
    // this.categories.push(
    //   carniceria,
    //   verduleria,
    //   carniceria,
    //   verduleria,
    //   carniceria,
    //   verduleria,
    //   carniceria,
    //   verduleria,
    //   carniceria,
    //   verduleria,
    //   carniceria,
    //   verduleria,
    // );
    // let bife = new Product('Bife', carniceria);
    // let molleja = new Product('Molleja', carniceria);
    // let ribs = new Product('Ribs', carniceria);
    // let papa = new Product('Papa', verduleria);
    // let lechuga = new Product('Lechuga', verduleria);
    // this.products.push(
    //   bife,
    //   molleja,
    //   ribs,
    //   papa,
    //   lechuga,
    //   bife,
    //   molleja,
    //   ribs,
    //   papa,
    //   lechuga,
    //   bife,
    //   molleja,
    //   ribs,
    //   papa,
    //   lechuga,
    // );
  }

  private readCategoriesFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(this.CATEGORIES_STORAGE_KEY);
      const firstBoot = await AsyncStorage.getItem(this.FIRST_BOOT);
      if (firstBoot !== null && jsonValue === null) {
        return;
      }
      if (firstBoot === null) {
        await this.loadDefaultCategories();
      } else {
        this.loadCategories(JSON.parse(jsonValue));
      }
    } catch (e) {}
  };

  private storeCategories = async () => {
    try {
      const jsonValue = JSON.stringify(this.categories);
      await AsyncStorage.setItem(this.CATEGORIES_STORAGE_KEY, jsonValue);
    } catch (e) {}
  };

  private readProductsFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(this.PRODUCTS_STORAGE_KEY);
      if (jsonValue === null) {
        return;
      }
      let productsFromStorage = JSON.parse(jsonValue);
      for (var c in productsFromStorage) {
        this.products.push(
          new Product(
            productsFromStorage[c].name,
            new Category(
              productsFromStorage[c].category.name,
              productsFromStorage[c].category.color,
            ),
          ),
        );
      }
    } catch (e) {}
  };

  private storeProducts = async () => {
    try {
      const jsonValue = JSON.stringify(this.products);
      await AsyncStorage.setItem(this.PRODUCTS_STORAGE_KEY, jsonValue);
    } catch (e) {}
  };

  private loadCategories(categoriesToLoad: Category[]) {
    for (var c in categoriesToLoad) {
      this.categories.push(
        new Category(categoriesToLoad[c].name, categoriesToLoad[c].color),
      );
    }
  }

  private async loadDefaultCategories() {
    this.loadCategories(this.defaultCategories);
    this.storeCategories();
    await AsyncStorage.setItem(this.FIRST_BOOT, 'false');
  }

  getProducts() {
    return this.products
      .slice()
      .sort((p1, p2) => p1.name.localeCompare(p2.name));
  }

  getCategories() {
    let cats = this.categories;
    if (cats.length === 0) {
      return cats.slice();
    }
    return cats.sort((c1, c2) => c1.name.localeCompare(c2.name));
  }

  addNewCategory(name: string, color: string) {
    if (this.getCategoryByName(name).length > 0) {
      throw 'Category ' + name + ' already exists';
    }
    this.categories.push(new Category(name, color));
    this.storeCategories();
  }

  getCategoryByName(name: string): Category[] {
    return this.categories.filter(c => c.name === name);
  }

  removeCategory(name: string) {
    if (this.isCategoryInUse(name)) {
      throw "Cannot delete the category because it's being used";
    }
    this.categories = this.categories.filter(c => c.name !== name);
    this.storeCategories();
  }

  removeProduct(name: string) {
    if (this.shoppingListService.isProductUsed(name)) {
      throw "Cannot delete the product because it's being used";
    }
    this.products = this.products.filter(p => p.name !== name);
    this.storeProducts();
  }

  addNewProduct(name: string, category: Category) {
    if (this.getProductByName(name).length > 0) {
      throw 'Product ' + name + ' already exists';
    }
    this.products.push(new Product(name, category));
    this.storeProducts();
  }

  getProductByName(name: string): Product[] {
    return this.products.filter(p => p.name === name);
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

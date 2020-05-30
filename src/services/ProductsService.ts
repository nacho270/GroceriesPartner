import {Category} from './../model/Category';
import {Product} from './../model/Product';
import {ShoppingListService} from './ShoppingListService';
import AsyncStorage from '@react-native-community/async-storage';
import Color from '../shared/Colors';

export class ProductService {
  private products: Product[] = [];
  private categories: Category[] = [];

  private CATEGORIES_STORAGE_KEY = '@categories';

  private defaultCategpries: Category[] = [
    new Category('Carniceria', Color.category.red),
    new Category('Verduleria', Color.category.green),
  ];

  constructor(private shoppingListService: ShoppingListService) {
    this.readCategoriesFromStorage();

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
      if (jsonValue === null) {
        return;
      }
      let categoriesFromStorage = JSON.parse(jsonValue);
      console.log('Categories from storage: ' + categoriesFromStorage);
      for (var c in categoriesFromStorage) {
        this.categories.push(
          new Category(
            categoriesFromStorage[c].name,
            categoriesFromStorage[c].color,
          ),
        );
      }
    } catch (e) {
      return;
    }
  };

  private storeCategories = async () => {
    try {
      const jsonValue = JSON.stringify(this.categories);
      await AsyncStorage.setItem(this.CATEGORIES_STORAGE_KEY, jsonValue);
    } catch (e) {}
  };

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

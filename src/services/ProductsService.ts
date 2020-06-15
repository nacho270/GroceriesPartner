import {Category} from './../model/Category';
import {Product} from './../model/Product';
import {ShoppingListService} from './ShoppingListService';
import AsyncStorage from '@react-native-community/async-storage';
import Color from '../shared/Colors';
import {translate} from '../lang/language';

export class ProductService {
  private products: Product[] = [];
  private categories: Category[] = [];

  private CATEGORIES_STORAGE_KEY = '@categories';
  private PRODUCTS_STORAGE_KEY = '@products';
  private FIRST_BOOT = '@firstboot';

  private defaultCategories: Category[] = [
    new Category(
      translate('PRODUCTSERVICE_defaulCategoryMeat'),
      Color.category.red,
    ),
    new Category(
      translate('PRODUCTSERVICE_defaulCategoryVegetables'),
      Color.category.green,
    ),
    new Category(
      translate('PRODUCTSERVICE_defaulCategoryFish'),
      Color.category.light_blue,
    ),
    new Category(
      translate('PRODUCTSERVICE_defaulCategoryMilk'),
      Color.category.cyan,
    ),
    new Category(
      translate('PRODUCTSERVICE_defaulCategoryHouseware'),
      Color.category.dark_grey,
    ),
    new Category(
      translate('PRODUCTSERVICE_defaulCategoryPersonalCare'),
      Color.category.pink,
    ),
    new Category(
      translate('PRODUCTSERVICE_defaulCategoryPersonalCandy'),
      Color.category.purple,
    ),
    new Category(
      translate('PRODUCTSERVICE_defaulCategoryPersonalBread'),
      Color.category.mustard,
    ),
    new Category(
      translate('PRODUCTSERVICE_defaulCategoryPersonalBeverages'),
      Color.category.light_yellow,
    ),
    new Category(
      translate('PRODUCTSERVICE_defaulCategoryPersonalGeneral'),
      Color.category.olive,
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {
    this.readCategoriesFromStorage();
    this.readProductsFromStorage();

    // this.storeCategories();
    // this.storeProducts();
  }

  private readCategoriesFromStorage = async () => {
    try {
      // await AsyncStorage.removeItem(this.FIRST_BOOT);
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
      throw translate('CATEGORIESLIST_categoryAlreadyExists', {
        category: name,
      });
    }
    this.categories.push(new Category(name, color));
    this.storeCategories();
  }

  getCategoryByName(name: string): Category[] {
    return this.categories.filter(c => c.name === name);
  }

  removeCategory(name: string) {
    if (this.isCategoryInUse(name)) {
      throw translate('PRODUCTSERVICE_categoryBeingUsed', {
        category: name,
      });
    }
    this.categories = this.categories.filter(c => c.name !== name);
    this.storeCategories();
  }

  removeProduct(name: string) {
    if (this.shoppingListService.isProductUsed(name)) {
      throw translate('PRODUCTSERVICE_productBeingUsed', {
        product: name,
      });
    }
    this.products = this.products.filter(p => p.name !== name);
    this.storeProducts();
  }

  addNewProduct(name: string, category: Category) {
    if (this.getProductByName(name).length > 0) {
      throw translate('PRODUCTLIST_productAlreadyExists', {
        product: name,
      });
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

import React, {useState} from 'react';
import ListSection from './ListSection';
import {getProductService} from '../../services/DependencyResolver';
import {getShoppingListService} from '../../services/DependencyResolver';
import AddPanel from './AddPanel';
import {View, StyleSheet, Alert, Text, Keyboard} from 'react-native';
import CategoriesList from './CategoriesList';
import Colors from '../../shared/Colors';
import {translate} from '../../lang/language';

class ProductsList extends React.Component {
  state = {
    categories: getProductService().getCategories(),
    products: getProductService().getProducts(),
    filter: '',
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  setFilter(filter) {
    this.setState({filter: filter});
  }

  onFireCategoriesUpdated() {
    this.setState({categories: getProductService().getCategories()});
  }

  render() {
    let display = (
      <View style={styles.noproducts}>
        <Text style={{color: Colors.emptyList}}>
          {translate('PRODUCTLIST_empty')}
        </Text>
      </View>
    );

    const {products} = this.state;

    const onNewProduct = (name, category) => {
      getProductService().addNewProduct(name, category);
      this.setState({products: getProductService().getProducts()});
      this.props.onNewProduct();
    };

    const deleteProduct = product => {
      try {
        getProductService().removeProduct(product.name);
        this.setState({
          products: getProductService().getProducts(),
        });
        this.props.onProductDelete();
      } catch (e) {
        Alert.alert(e);
      }
    };

    const handleDeleteProduct = product => {
      Alert.alert(
        translate('PRODUCTLIST_deleteProduct', {product: product.name}),
        '',
        [
          {
            text: translate('GENERAL_yes'),
            onPress: () => deleteProduct(product),
          },
          {
            text: translate('GENERAL_no'),
            style: 'destructive',
          },
        ],
        {cancelable: false},
      );
    };

    const handleAddToProductList = product => {
      getShoppingListService().addProduct(product, 0);
      this.props.onProductListUpdated();
    };

    if (products && products.length > 0) {
      display = (
        <View style={styles.list} onPress={() => Keyboard.dismiss()}>
          <ListSection
            title={translate('PRODUCTLIST_title')}
            placeholder={translate('PRODUCTLIST_placeholder')}
            items={products.filter(prod =>
              prod.name.includes(this.state.filter),
            )}
            colorResolver={prod => prod.category.color}
            handlePress={handleAddToProductList}
            handleLongPress={handleDeleteProduct}
          />
        </View>
      );
    }

    return (
      <View style={styles.section}>
        {display}
        <ProductAdd
          onNewProduct={(name, category) => onNewProduct(name, category)}
        />
      </View>
    );
  }
}

const ProductAdd = props => {
  const [category, setCategory] = useState(undefined);

  const onFireCategoriesUpdated = selectedCategory => {
    setCategory(selectedCategory);
  };

  const successfulSubmitHandler = data => {
    props.onNewProduct(data, category);
    setCategory(undefined);
  };

  const validateProduct = enteredData => {
    if (!category) {
      return translate('PRODUCTLIST_mustPickCategory');
    }
    if (getProductService().getProductByName(enteredData).length > 0) {
      return translate('PRODUCTLIST_productAlreadyExists', {
        product: enteredData,
      });
    }
  };

  return (
    <View style={styles.add}>
      <AddPanel
        placeholder={translate('PRODUCTLIST_placeholder')}
        onSuccessfulSubmit={successfulSubmitHandler}
        validate={enteredData => validateProduct(enteredData)}
        extraComponent={
          <View style={styles.categoryListContainer}>
            <CategoriesList
              onFireCategoriesUpdated={onFireCategoriesUpdated}
              onSelectedCategory={cat => setCategory(cat)}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {flex: 10},
  list: {maxHeight: '85%'},
  noproducts: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteOverlay,
  },
  add: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.whiteOverlay,
  },
  categoryListContainer: {height: '100%'},
});

export default ProductsList;

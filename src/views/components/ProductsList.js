import React, {useState} from 'react';
import ListSection from './ListSection';
import {getProductService} from '../../services/DependencyResolver';
import AddPanel from './AddPanel';
import {View, StyleSheet, Alert} from 'react-native';

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
    const {products} = this.state;

    const onNewProduct = (name, category) => {
      getProductService().addNewProduct(name, category);
      this.setState({products: getProductService().getProducts()});
    };

    const deleteProduct = product => {
      try {
        getProductService().removeProduct(product.name);
        this.setState({
          products: getProductService().getProducts(),
        });
      } catch (e) {
        Alert.alert(e);
      }
    };

    const handleDeleteProduct = product => {
      Alert.alert(
        'Delete ' + product.name + '?',
        '',
        [
          {
            text: 'Yes',
            onPress: () => deleteProduct(product),
          },
          {
            text: 'No',
            style: 'destructive',
          },
        ],
        {cancelable: false},
      );
    };

    return (
      <View style={styles.section}>
        <View style={styles.list}>
          <ListSection
            title="Products"
            placeholder="Product..."
            items={products.filter(prod =>
              prod.name.includes(this.state.filter),
            )}
            colorResolver={prod => prod.category.color}
            handlePress={prod => console.log('Long press: ' + prod)}
            handleLongPress={prod => handleDeleteProduct(prod)}
          />
        </View>
        <ProductAdd
          onNewProduct={(name, category) => onNewProduct(name, category)}
        />
      </View>
    );
  }
}

const ProductAdd = props => {
  const [category, setCategory] = useState(undefined);

  const categorySelectedHandler = selectedCategory => {
    setCategory(selectedCategory);
  };

  const successfulSubmitHandler = data => {
    props.onNewProduct(data, category);
    setCategory(undefined);
  };

  const validateProduct = enteredData => {
    if (!category) {
      return 'Must pick a category';
    }
    if (getProductService().getProductByName(enteredData).length > 0) {
      return 'Product ' + enteredData + ' already exists';
    }
  };

  return (
    <View style={styles.add}>
      <AddPanel
        placeholder="Product..."
        onSuccessfulSubmit={successfulSubmitHandler}
        validate={enteredData => validateProduct(enteredData)}
        extraComponent={
          <ListSection
            title="Categories"
            items={getProductService().getCategories()}
            colorResolver={cat => cat.color}
            handlePress={cat => categorySelectedHandler(cat)}
            enableSelection
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {flex: 7},
  list: {flex: 6},
  add: {flex: 1},
});

export default ProductsList;

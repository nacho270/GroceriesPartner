import React from 'react';
import ListSection from './ListSection';
import {getProductService} from '../../services/DependencyResolver';
import AddPanel from './AddPanel';
import {View, StyleSheet} from 'react-native';

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
    console.log('pepe: ' + getProductService().getCategories());
    this.setState({categories: getProductService().getCategories()});
  }

  render() {
    const {products} = this.state;
    return (
      <View style={styles.section}>
        <View style={styles.list}>
          <ListSection
            title="Products"
            items={products.filter(prod =>
              prod.name.includes(this.stabte.filter),
            )}
            colorResolver={prod => prod.category.color}
            placeholder="Product..."
          />
        </View>
        <View style={styles.add}>
          <AddPanel
            placeholder="Product..."
            extraComponent={
              <ListSection
                title="Categories"
                items={getProductService().getCategories()}
                colorResolver={cat => cat.color}
                hideAdd
              />
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {flex: 7},
  list: {flex: 6},
  add: {flex: 1},
});

export default ProductsList;

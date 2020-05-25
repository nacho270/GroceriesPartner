import React, {useState} from 'react';
import ListSection from './ListSection';
import {getProductService} from '../../services/DependencyResolver';
import AddPanel from './AddPanel';
import {View, StyleSheet} from 'react-native';

const ProductsList = props => {
  const [categories] = useState(getProductService().getCategories());

  return (
    <View style={styles.section}>
      <View style={styles.list}>
        <ListSection
          title="Products"
          items={props.products}
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
              items={categories}
              colorResolver={cat => cat.color}
              hideAdd
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {flex: 7},
  list: {flex: 6},
  add: {flex: 1},
});

export default ProductsList;

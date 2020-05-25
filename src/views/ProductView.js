import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';

import CategoriesList from './components/CategoriesList';
import ProductsList from './components/ProductsList';

import Color from '../shared/Colors';
import {getProductService} from '../services/DependencyResolver';

export default function ProductsScreen() {
  //
  const [filterBy, setFilter] = useState('');

  const [products] = useState(getProductService().getProducts());
  const [categories] = useState(getProductService().getCategories());

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Search product..."
        style={styles.input}
        maxLength={30}
        onChangeText={value => setFilter(value)}
        blurOnSubmit={false}
      />

      <View style={{height: '46%'}}>
        <ProductsList
          products={products.filter(prod => prod.name.includes(filterBy))}
        />
      </View>

      <View style={styles.separator} />

      <View style={{height: '52%'}}>
        <CategoriesList categories={categories} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: '2%',
    borderBottomColor: Color.separator,
    borderBottomWidth: 4,
  },
  input: {
    borderBottomColor: Color.separator,
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 8,
  },
});

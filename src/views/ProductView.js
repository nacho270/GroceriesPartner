import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';

import ListSection from './components/ListSection';
import ColorGrid from './components/ColorGrid';

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

      <ListSection
        title="Products"
        items={products.filter(prod => prod.name.includes(filterBy))}
        colorResolver={prod => prod.category.color}
        styles={{height: '49%'}}
        placeholder="Product..."
        extraComponent={
          <ListSection
            title="Categories"
            items={categories}
            styles={{height: '100%'}}
            colorResolver={cat => cat.color}
            hideAdd
          />
        }
      />

      <View style={styles.separator} />

      <ListSection
        title="Categories"
        placeholder="Category..."
        items={categories}
        styles={{height: '49%'}}
        colorResolver={cat => cat.color}
        extraComponent={<ColorGrid numColumns={3} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    borderBottomColor: Color.separator,
    borderBottomWidth: 1,
  },
  input: {
    borderBottomColor: Color.separator,
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 8,
  },
});

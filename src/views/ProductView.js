import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';

import CategoriesList from './components/CategoriesList';
import ProductsList from './components/ProductsList';

import Color from '../shared/Colors';

export default function ProductsScreen() {
  const onFireCategoriesUpdated = () => {
    this.child.onFireCategoriesUpdated();
  };

  const onProductListUpdated = () => {
    console.log('onProductListUpdated');
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Search product..."
        style={styles.input}
        maxLength={30}
        onChangeText={value => this.child.setFilter(value)}
        blurOnSubmit={false}
      />

      <View style={{height: '46%'}}>
        <ProductsList
          onRef={ref => (this.child = ref)}
          onProductListUpdated={onProductListUpdated}
        />
      </View>

      <View style={styles.separator} />

      <View style={{height: '52%'}}>
        <CategoriesList onFireCategoriesUpdated={onFireCategoriesUpdated} />
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

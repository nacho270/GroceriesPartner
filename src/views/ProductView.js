import React, {useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {getProductService} from '../services/DependencyResolver';

export default function ProductsScreen() {
  const [products] = useState(getProductService().getProducts());
  const [categories] = useState(getProductService().getCategories());

  const [filterBy, setFilter] = useState('');

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Search product..."
        style={styles.input}
        maxLength={30}
        onChangeText={value => setFilter(value)}
      />
      <View style={styles.list}>
        <Text style={styles.title}>Products</Text>
        <FlatList
          data={products.filter(prod => prod.name.includes(filterBy))}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item: product}) => {
            return (
              <View style={styles.row}>
                <View
                  style={{
                    ...styles.rowButton,
                    backgroundColor: product.category.color,
                  }}
                />
                <Text style={styles.rowText}>{product.name}</Text>
              </View>
            );
          }}
        />
        <View style={{flexDirection: 'row-reverse', padding: 20}}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
              backgroundColor: '#1a98fc',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                color: 'white',
                textAlignVertical: 'center',
                textAlign: 'center',
                marginTop: -5,
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{width: '100%', borderBottomColor: 'red', borderBottomWidth: 1}}
      />
      <View style={styles.list}>
        <Text style={styles.title}>Categories</Text>
        <FlatList
          data={categories}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item: category}) => {
            return (
              <View style={styles.row}>
                <View
                  style={{
                    ...styles.rowButton,
                    backgroundColor: category.color,
                  }}
                />
                <Text style={styles.rowText}>{category.name}</Text>
              </View>
            );
          }}
        />
        <View style={{flexDirection: 'row-reverse', padding: 20}}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
              backgroundColor: '#1a98fc',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                color: 'white',
                textAlignVertical: 'center',
                textAlign: 'center',
                marginTop: -5,
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderBottomWidth: 1,
    padding: 10,
  },
  title: {padding: 20},
  rowButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  rowText: {width: '100%', marginTop: 10, marginLeft: 20},
  list: {
    width: '100%',
    height: '49%',
  },
  input: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 8,
  },
  centerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

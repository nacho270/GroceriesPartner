import React, {useState} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Color from '../shared/Colors';

import {getProductService} from '../services/DependencyResolver';
import {Modal} from 'react-native';

export default function ProductsScreen() {
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
      />

      <ListSection
        title="Products"
        items={products.filter(prod => prod.name.includes(filterBy))}
        colorResolver={prod => prod.category.color}
      />

      <View style={styles.separator} />

      <ListSection
        title="Categories"
        items={categories}
        colorResolver={cat => cat.color}
      />
    </SafeAreaView>
  );
}

const AddModal = props => {
  const [data, setData] = useState('');
  const onEnteredData = enteredData => {
    setData(enteredData);
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <TextInput
          placeholder="Name..."
          style={{
            borderBottomColor: Color.separator,
            borderBottomWidth: 1,
            padding: 10,
            width: '80%',
          }}
          onChangeText={onEnteredData}
        />
        {props.extraComponent}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            title="Add"
            style={{width: 150, height: 20}}
            onPress={props.onClose.bind(this, data)}
          />
          <Button
            title="Cancel"
            style={{width: 50, height: 20}}
            onPress={props.onClose.bind(this, null)}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const ListSection = props => {
  const [isAdding, setIsAdding] = useState(false);
  const addItemHandler = enteredData => {
    console.log(enteredData);
    setIsAdding(false);
  };
  return (
    <View style={styles.list}>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        data={props.items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item: item}) => {
          return (
            <View style={styles.row}>
              <View
                style={{
                  ...styles.rowThumbnail,
                  backgroundColor: props.colorResolver(item),
                }}
              />
              <Text style={styles.rowText}>{item.name}</Text>
            </View>
          );
        }}
      />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAdding(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <AddModal
        visible={isAdding}
        onClose={addItemHandler}
        extraComponent={<Text>Puto</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderColor: Color.row_separator,
    borderBottomWidth: 1,
    padding: 10,
  },
  title: {padding: 20},
  rowThumbnail: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  rowText: {
    width: '100%',
    marginTop: 10,
    marginLeft: 20,
  },
  list: {
    width: '100%',
    height: '49%',
  },
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
  centerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonContainer: {flexDirection: 'row-reverse', padding: 20},
  addButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: Color.add_button,
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: -5,
  },
});

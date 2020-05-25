import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import AddModal from './AddModal';
import Color from '../../shared/Colors';

const ListSection = props => {
  const [isAdding, setIsAdding] = useState(false);
  const addItemHandler = enteredData => {
    if (enteredData) {
      console.log(enteredData);
    }
    setIsAdding(false);
  };

  let addPanel = null;
  if (!props.hideAdd) {
    addPanel = (
      <>
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
          placeholder={props.placeholder}
          extraComponent={props.extraComponent}
        />
      </>
    );
  }

  return (
    <View style={{...styles.list, ...props.styles}}>
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
      {addPanel}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {padding: 20, fontSize: 25, fontWeight: 'bold', textAlign: 'center'},
  row: {
    flexDirection: 'row',
    borderColor: Color.row_separator,
    borderBottomWidth: 1,
    padding: 10,
  },
  list: {
    width: '100%',
  },
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

export default ListSection;

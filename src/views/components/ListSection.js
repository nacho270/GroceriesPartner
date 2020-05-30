import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Color from '../../shared/Colors';

const ListSection = props => {
  const handleDelete = name => {
    console.log('Handle delete: ' + name);
    Alert.alert(
      'Delete ' + name + '?',
      '',
      [
        {
          text: 'Yes',
          onPress: () => props.deleteRequested(name),
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
    // <View style={{...styles.list, ...props.styles}}>
    <View style={styles.list}>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        style={{height: '70%'}}
        data={props.items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item: item}) => {
          return (
            <TouchableOpacity
              style={styles.row}
              onPress={() => handleDelete(item.name)}
              onLongPress={() => handleDelete(item.name)}>
              <View
                style={{
                  ...styles.rowThumbnail,
                  backgroundColor: props.colorResolver(item),
                }}
              />
              <Text style={styles.rowText}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {padding: 20, fontSize: 25, fontWeight: 'bold', textAlign: 'center'},
  list: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    borderColor: Color.row_separator,
    borderBottomWidth: 1,
    padding: 10,
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
});

export default ListSection;

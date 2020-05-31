import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Color from '../../shared/Colors';

const ListSection = props => {
  const [currentItem, setCurrentItem] = useState(undefined);

  const styleResolver = item => {
    let rowStyle = [styles.row];
    if (
      props.enableSelection &&
      currentItem &&
      item.name === currentItem.name
    ) {
      rowStyle.push(styles.selectedRow);
    }

    return rowStyle;
  };

  return (
    // <View style={{...styles.list, ...props.styles}}>
    <View style={styles.list}>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        style={styles.flatList}
        data={props.items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item: item}) => {
          return (
            <TouchableOpacity
              style={styleResolver(item)}
              onPress={() => {
                if (props.enableSelection) {
                  setCurrentItem(item);
                }
                if (props.handlePress) {
                  props.handlePress(item);
                }
              }}
              onLongPress={() => {
                if (props.enableSelection) {
                  setCurrentItem(item);
                }
                if (props.handleLongPress) {
                  props.handleLongPress(item);
                }
              }}>
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
  flatList: {height: '70%'},
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
  selectedRow: {
    backgroundColor: Color.selectedRow,
  },
});

export default ListSection;

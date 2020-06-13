import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Color from '../../shared/Colors';
import {translate} from '../../lang/language';

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
    <View style={styles.list}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{translate('GENERAL_longPress')}</Text>
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
  title: {
    paddingTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  },
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
    borderColor: Color.thumbnailBorder,
    borderWidth: 1,
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

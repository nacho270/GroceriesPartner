import React from 'react';
import ListSection from './ListSection';
import ColorGrid from './ColorGrid';
import {View, StyleSheet} from 'react-native';

import AddPanel from './AddPanel';

const CategoriesList = props => {
  const colorSelectedHandler = color => {
    console.log(color);
  };
  return (
    <View style={styles.section}>
      <View style={styles.list}>
        <ListSection
          title="Categories"
          placeholder="Category..."
          items={props.categories}
          colorResolver={cat => cat.color}
        />
      </View>
      <View style={styles.add}>
        <AddPanel
          placeholder="Category..."
          extraComponent={<ColorGrid numColumns={3} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {flex: 4},
  list: {flex: 3},
  add: {flex: 1},
});

export default CategoriesList;

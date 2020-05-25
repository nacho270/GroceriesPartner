import React, {useState} from 'react';
import Grid from 'react-native-grid-component';
import {View, StyleSheet} from 'react-native';

import Color from '../../shared/Colors';

const ColorGrid = props => {
  const [selected, setSelected] = useState();
  const renderItem = data => {
    let currentStyle = [{backgroundColor: data}, styles.gridItem];
    if (data === selected) {
      currentStyle.push({borderColor: 'orange', borderWidth: 3});
    }
    return <View style={currentStyle} onTouchStart={() => setSelected(data)} />;
  };

  const renderPlaceholder = () => <View style={styles.gridItem} />;

  return (
    <Grid
      style={styles.grid}
      renderItem={renderItem}
      renderPlaceholder={renderPlaceholder}
      numColumns={props.numColumns}
      keyExtractor={(_, index) => index.toString()}
      data={Object.values(Color.category)}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    height: '30%',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: Color.row_separator,
  },
  gridItem: {
    flex: 1,
    height: 40,
    margin: 10,
  },
});

export default ColorGrid;

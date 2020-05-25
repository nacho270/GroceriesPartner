import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Grid from 'react-native-grid-component';

const ITEMS_COUNT = 19;

export default class Simple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: generateRandomColorsArray(ITEMS_COUNT),
      refreshing: false,
    };
  }

  _renderItem = data => <View style={[{backgroundColor: data}, styles.item]} />;

  _renderPlaceholder = () => <View style={styles.item} />;

  render() {
    return (
      <Grid
        style={{height: '30%'}}
        renderItem={this._renderItem}
        renderPlaceholder={this._renderPlaceholder}
        data={this.state.data}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({
            data: generateRandomColorsArray(ITEMS_COUNT),
            refreshing: false,
          });
        }}
        onEndReached={() => {
          this.setState(({data}) => ({
            data: [...data, ...generateRandomColorsArray(ITEMS_COUNT)],
          }));
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 40,
    margin: 10,
  },
});

// Helper functions
// thanks materialuicolors.co
const colors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B',
];

function generateRandomColorsArray(length) {
  return Array.from(Array(length)).map(
    () => colors[Math.floor(Math.random() * colors.length)],
  );
}

import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function ProductsScreen() {
  return (
    <View style={styles.centerText}>
      <Text>Products!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

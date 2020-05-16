import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function RecipesScreen() {
  return (
    <View style={styles.centerText}>
      <Text>Recipes!</Text>
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

import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {translate} from '../lang/language';

export default function AboutScreen() {
  let nacho = require('../../package.json').version;
  return (
    <View style={styles.centerText}>
      <Text>
        {translate('ABOUT_version')}: {nacho}
      </Text>
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

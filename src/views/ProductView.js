import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import {getProductService} from '../services/DependencyResolver';

export default function ProductsScreen() {
  const [products] = React.useState(getProductService().getProducts());
  return (
    <SafeAreaView>
      <View>
        <FlatList
          style={{width: '100%', height: '100%'}}
          data={products}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View style={{flexDirection: 'row'}}>
                <Button title="+" />
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: item.category.color,
                  }}
                />
                <Text style={{width: '100%', marginTop: 10, marginLeft: 20}}>
                  {item.name}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

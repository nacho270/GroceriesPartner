import * as React from 'react';
import {Text, View, StyleSheet, CheckBox, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TouchableOpacity, Switch} from 'react-native-gesture-handler';

import {getShoppingListService} from '../services/DependencyResolver';

export default function HomeScreen() {
  const [currentListGrouped] = React.useState(
    getShoppingListService().getCurrentShoppingListGroupedByCategory(),
  );

  let aa = [];
  for (var k in currentListGrouped) {
    aa.push({cat: k, prods: currentListGrouped[k]});
  }

  // console.log(JSON.stringify(aa));

  // for (var k in currentListGrouped) {
  //   for (var p in currentListGrouped[k]) {
  //     console.log(currentListGrouped[k][p].product.name);
  //   }
  // }

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'column', alignContent: 'stretch'}}>
        <Text style={{alignContent: 'center'}}>Home!</Text>
        <FlatList
          style={{width: '100%', height: '100%'}}
          data={aa}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <>
                <CategoryProducts data={item} />
              </>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

class CategoryProducts extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log(JSON.stringify(this.props.data));
    return (
      <View>
        <Text>{this.props.data.cat}</Text>
        <FlatList
          style={{padding: 20}}
          data={this.props.data.prods}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            if (Platform.OS === 'ios') {
              let isEnabled = item.product.checked;
              return (
                <>
                  <View style={{flexDirection: 'row', margin: 10}}>
                    <Switch
                      trackColor={{
                        false: '#767577',
                        true: '#81b0ff',
                      }}
                      thumbColor={isEnabled ? '#ff0000' : '#ffffff'}
                      ios_backgroundColor="#ffffff"
                      value={isEnabled}
                    />
                    <Text style={{fontSize: 25, marginLeft: 5}}>
                      {item.product.name}
                    </Text>
                  </View>
                </>
              );
            } else {
              <>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <CheckBox value={item.product.checked} />
                  <Text style={{fontSize: 25, marginLeft: 5}}>
                    {item.product.name}
                  </Text>
                </View>
              </>;
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

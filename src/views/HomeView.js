import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native';

import {getShoppingListService} from '../services/DependencyResolver';

export default function HomeScreen() {
  //
  const [currentListGrouped] = React.useState(
    getShoppingListService().getCurrentShoppingListGroupedByCategory(),
  );

  let display = <Text>Your shopping list is empty!</Text>;
  if (currentListGrouped && currentListGrouped.length > 0) {
    display = <ShoppingListView shoppingList={currentListGrouped} />;
  }

  return <SafeAreaView style={styles.screen}>{display}</SafeAreaView>;
}

const ShoppingListView = props => {
  return (
    <FlatList
      data={props.shoppingList}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item: item}) => {
        return <CategoryGroupCard group={item} />;
      }}
    />
  );
};

const CategoryGroupCard = props => {
  return (
    <View
      style={{
        ...styles.card,
        borderColor: props.group.category.color,
      }}>
      <Text style={styles.title}>{props.group.category.name}</Text>
      <FlatList
        data={props.group.products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item: item}) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  card: {
    borderWidth: 2,
    width: 300,
    maxWidth: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingTop: 5,
    borderRadius: 10,
    marginBottom: 20,

    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 6,
    // shadowOpacity: 0.26,
    // elevation: 8,
  },
});

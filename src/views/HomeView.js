import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TouchableOpacity} from 'react-native';
import {getShoppingListService} from '../services/DependencyResolver';
import Colors from '../shared/Colors';

export default function HomeScreen() {
  //
  const [currentListGrouped] = React.useState(
    getShoppingListService().getCurrentShoppingListGroupedByCategory(),
  );

  let display = (
    <Text style={{color: Colors.emptyList}}>Your shopping list is empty!</Text>
  );
  if (currentListGrouped && currentListGrouped.length > 0) {
    display = <ShoppingListView shoppingList={currentListGrouped} />;
  }

  return <SafeAreaView style={styles.screen}>{display}</SafeAreaView>;
}

const ShoppingListView = props => {
  return (
    <>
      <Text style={styles.mainTitle}>Shopping List</Text>
      <FlatList
        data={props.shoppingList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item: item}) => {
          return <CategoryGroupCard group={item} />;
        }}
      />
    </>
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
          return <ProductRow product={item} />;
        }}
      />
    </View>
  );
};

const ProductRow = props => {
  return (
    <View style={styles.productRow}>
      <TouchableOpacity style={{width: '100%'}}>
        <Text style={styles.productRowText}>{props.product.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.defaultBackground,
  },
  mainTitle: {
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  card: {
    borderWidth: 2,
    width: 300,
    maxWidth: '100%',
    alignItems: 'center',
    backgroundColor: Colors.defaultBackground,
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
  productRow: {
    margin: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    borderBottomColor: Colors.selectedRow,
    borderBottomWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 280,
    // height: '100%',
  },
  productRowText: {fontSize: 16},
});

import * as React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TouchableOpacity} from 'react-native';
import {getShoppingListService} from '../services/DependencyResolver';
import Colors from '../shared/Colors';

export default function HomeScreen({navigation}) {
  //
  const [currentList, setCurrentList] = React.useState(
    getShoppingListService().getCurrentShoppingListGroupedByCategory(),
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCurrentList(
        getShoppingListService().getCurrentShoppingListGroupedByCategory(),
      );
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  let display = (
    <Text style={{color: Colors.emptyList}}>Your shopping list is empty!</Text>
  );

  const onDeleteProduct = product => {
    getShoppingListService().removeProduct(product);
    setCurrentList(
      getShoppingListService().getCurrentShoppingListGroupedByCategory(),
    );
  };

  const onMarkShoppingItem = shoppingItem => {
    if (shoppingItem.checked) {
      getShoppingListService().markProductAsUnhecked(shoppingItem);
    } else {
      getShoppingListService().markProductAsChecked(shoppingItem);
    }
    setCurrentList(
      getShoppingListService().getCurrentShoppingListGroupedByCategory(),
    );
  };

  if (currentList && currentList.length > 0) {
    display = (
      <ShoppingListView
        shoppingList={currentList}
        onDeleteProduct={onDeleteProduct}
        onMarkShoppingItem={onMarkShoppingItem}
      />
    );
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
          return (
            <CategoryGroupCard
              group={item}
              onDeleteProduct={props.onDeleteProduct}
              onMarkShoppingItem={props.onMarkShoppingItem}
            />
          );
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
          return (
            <ProductRow
              shoppingItem={item}
              onDeleteProduct={props.onDeleteProduct}
              onMarkShoppingItem={props.onMarkShoppingItem}
            />
          );
        }}
      />
    </View>
  );
};

const ProductRow = props => {
  const onMarkShoppingItem = shoppingItem => {
    props.onMarkShoppingItem(shoppingItem);
  };

  const deleteProduct = product => {
    props.onDeleteProduct(product);
  };

  const onDeleteRow = product => {
    Alert.alert(
      'Delete ' + product.name + '?',
      '',
      [
        {
          text: 'Yes',
          onPress: () => deleteProduct(product),
        },
        {
          text: 'No',
          style: 'destructive',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  let textStyle = {...styles.productRowText};
  if (props.shoppingItem.checked) {
    textStyle.textDecorationLine = 'line-through';
    textStyle.textDecorationStyle = 'solid';
  }
  return (
    <View style={styles.productRow}>
      <TouchableOpacity
        style={styles.productRowTouch}
        onPress={() => onMarkShoppingItem(props.shoppingItem)}
        onLongPress={() => onDeleteRow(props.shoppingItem.product)}>
        <Text style={textStyle}>{props.shoppingItem.product.name}</Text>
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
  productRowTouch: {width: '100%'},
  productRowText: {fontSize: 16},
});

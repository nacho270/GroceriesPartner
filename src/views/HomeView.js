import * as React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TouchableOpacity} from 'react-native';
import {getShoppingListService} from '../services/DependencyResolver';
import Colors from '../shared/Colors';
import {translate} from '../lang/language';

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
    <Text style={{color: Colors.emptyList}}>
      {translate('SHOPPINGLIST_empty')}
    </Text>
  );

  const onDeleteProduct = product => {
    getShoppingListService().removeProduct(product);
    setCurrentList(
      getShoppingListService().getCurrentShoppingListGroupedByCategory(),
    );
  };

  const removeAll = () => {
    getShoppingListService().removeAll();
    setCurrentList(
      getShoppingListService().getCurrentShoppingListGroupedByCategory(),
    );
  };

  const onClearList = () => {
    Alert.alert(
      translate('SHOPPINGLIST_clearListQuestion'),
      '',
      [
        {
          text: translate('GENERAL_yes'),
          onPress: () => removeAll(),
        },
        {
          text: translate('GENERAL_no'),
          style: 'destructive',
        },
      ],
      {cancelable: false},
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

  const onDeletedCheckedProducts = () => {
    getShoppingListService().removeChecked();
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
        onDeletedCheckedProducts={onDeletedCheckedProducts}
        onClearList={onClearList}
      />
    );
  }

  return <SafeAreaView style={styles.screen}>{display}</SafeAreaView>;
}

const ShoppingListView = props => {
  return (
    <View>
      <Text style={styles.mainTitle}>{translate('MENU_shoppingList')}</Text>
      <Text style={styles.subtitle}>{translate('GENERAL_longPress')}</Text>

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
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.deleteCheckedButton}
          onPress={props.onDeletedCheckedProducts}>
          <Text style={styles.deleteCheckedText}>
            {translate('SHOPPINGLIST_removeCheckedProducts')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteCheckedButton}
          onPress={props.onClearList}>
          <Text style={styles.deleteCheckedText}>
            {translate('SHOPPINGLIST_clearList')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CategoryGroupCard = props => {
  return (
    <View
      style={{
        ...styles.card,
        borderColor: props.group.category.color,
      }}>
      <Text
        style={{
          ...styles.title,
          backgroundColor: props.group.category.color,
          // color: safeFontColor,
        }}>
        {props.group.category.name}
      </Text>
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
      translate('SHOPPINGLIST_removeProduct', {product: product.name}),
      '',
      [
        {
          text: translate('GENERAL_yes'),
          onPress: () => deleteProduct(product),
        },
        {
          text: translate('GENERAL_no'),
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
    textStyle.color = Colors.row_separator;
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
    paddingTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    width: '100%',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    paddingBottom: 5,
    fontWeight: 'bold',
    // marginTop: 10,
  },
  subtitle: {
    paddingTop: 5,
    paddingBottom: 20,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  },
  card: {
    borderWidth: 4,
    width: 300,
    maxWidth: '100%',
    alignItems: 'center',
    backgroundColor: Colors.defaultBackground,
    paddingBottom: 15,
    borderRadius: 10,
    marginBottom: 20,
    // paddingTop: 5,

    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 6,
    // shadowOpacity: 0.26,
    // elevation: 8,
  },
  productRow: {
    margin: 5,
    paddingBottom: 5,
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
  bottomButtonsContainer: {flexDirection: 'row'},
  deleteCheckedButton: {
    borderColor: Colors.buttonBlue,
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.buttonBlue,
    borderRadius: 10,
    margin: 5,
  },
  deleteCheckedText: {color: 'white', fontWeight: 'bold'},
});

import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProductsList from './components/ProductsList';
import Color from '../shared/Colors';
import Overlay from 'react-native-modal-overlay';
import Colors from '../shared/Colors';
import {getProductService} from '../services/DependencyResolver';

export default function ProductsScreen() {
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [products, setProducts] = React.useState(
    getProductService().getProducts(),
  );
  const onProductListUpdated = () => {
    setShowOverlay(true);
    setTimeout(function() {
      setShowOverlay(false);
    }, 1000);
  };
  const updateProductList = () => {
    setProducts(getProductService().getProducts());
  };

  let display;
  if (products && products.length > 0) {
    display = (
      <>
        <ProductAddedOverlay visible={showOverlay} />
        <TextInput
          style={styles.input}
          placeholder="Search product..."
          maxLength={30}
          onChangeText={value => this.child.setFilter(value)}
          blurOnSubmit={false}
        />
      </>
    );
  }
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>{display}</View>
      <View style={styles.productListContainer}>
        <ProductsList
          onRef={ref => (this.child = ref)}
          onProductListUpdated={onProductListUpdated}
          onProductDelete={updateProductList}
          onNewProduct={updateProductList}
        />
      </View>
    </SafeAreaView>
  );
}

const ProductAddedOverlay = props => {
  return (
    <Overlay
      visible={props.visible}
      animationDuration={500}
      animationType="bounceIn"
      containerStyle={styles.overlay}
      closeOnTouchOutside>
      <View style={styles.overlayView}>
        <Text style={styles.overlayText}>Added!</Text>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.defaultBackground,
    flex: 16,
  },
  content: {
    flex: 1,
  },
  input: {
    borderBottomColor: Color.separator,
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 8,
  },
  productListContainer: {backgroundColor: Colors.whiteOverlay, flex: 15},
  overlay: {backgroundColor: Colors.whiteOverlay},
  overlayView: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 50,
  },
  overlayText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

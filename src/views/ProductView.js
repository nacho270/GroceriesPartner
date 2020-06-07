import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CategoriesList from './components/CategoriesList';
import ProductsList from './components/ProductsList';
import Color from '../shared/Colors';
import Overlay from 'react-native-modal-overlay';
import Colors from '../shared/Colors';

export default function ProductsScreen() {
  const [showOverlay, setShowOverlay] = React.useState(false);

  const onFireCategoriesUpdated = () => {
    this.child.onFireCategoriesUpdated();
  };

  const onProductListUpdated = () => {
    setShowOverlay(true);
    setTimeout(function() {
      setShowOverlay(false);
    }, 1000);
  };

  return (
    <SafeAreaView>
      <ProductAddedOverlay visible={showOverlay} />
      <TextInput
        placeholder="Search product..."
        style={styles.input}
        maxLength={30}
        onChangeText={value => this.child.setFilter(value)}
        blurOnSubmit={false}
      />

      <View style={styles.productListContainer}>
        <ProductsList
          onRef={ref => (this.child = ref)}
          onProductListUpdated={onProductListUpdated}
        />
      </View>

      <View style={styles.separator} />

      <View style={styles.categoryListContainer}>
        <CategoriesList onFireCategoriesUpdated={onFireCategoriesUpdated} />
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
  separator: {
    width: '100%',
    height: '2%',
    borderBottomColor: Color.separator,
    borderBottomWidth: 4,
  },
  input: {
    borderBottomColor: Color.separator,
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 8,
  },
  productListContainer: {height: '45%'},
  categoryListContainer: {height: '47%'},
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

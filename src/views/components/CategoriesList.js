import React, {useState, useRef} from 'react';
import ListSection from './ListSection';
import ColorGrid from './ColorGrid';
import {View, StyleSheet} from 'react-native';

import AddPanel from './AddPanel';
import {getProductService} from '../../services/DependencyResolver';

const CategoriesList = props => {
  const [categories, setCategories] = useState(
    getProductService().getCategories(),
  );

  return (
    <View style={styles.section}>
      <View style={styles.list}>
        <ListSection
          title="Categories"
          placeholder="Category..."
          items={categories}
          colorResolver={cat => cat.color}
        />
      </View>
      <CategoryAdd
        onUpdatedCategories={() => {
          setCategories(getProductService().getCategories());
          props.onFireCategoriesUpdated();
        }}
      />
    </View>
  );
};

const CategoryAdd = props => {
  const [color, setColor] = useState('');

  const colorSelectedHandler = cc => {
    setColor(cc);
  };

  const successfulSubmitHandler = data => {
    getProductService().addNewCategory(data, color);
    props.onUpdatedCategories();
    setColor(undefined);
  };

  return (
    <View style={styles.add}>
      <AddPanel
        placeholder="Category..."
        onSuccessfulSubmit={successfulSubmitHandler}
        validate={() => {
          return !color || color.trim().length === 0
            ? 'Must select a color'
            : undefined;
        }}
        extraComponent={
          <ColorGrid numColumns={3} onColorSelected={colorSelectedHandler} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {flex: 4},
  list: {flex: 3},
  add: {flex: 1},
});

export default CategoriesList;

import React, {useState} from 'react';
import ListSection from './ListSection';
import ColorGrid from './ColorGrid';
import {View, StyleSheet, Alert} from 'react-native';
import {translate} from '../../lang/language';

import AddPanel from './AddPanel';
import {getProductService} from '../../services/DependencyResolver';

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    categories: getProductService().getCategories(),
  };

  render() {
    const onNewCategory = (name, color) => {
      getProductService().addNewCategory(name, color);
      this.setState({
        categories: getProductService().getCategories(),
      });
      this.props.onFireCategoriesUpdated();
    };

    const deleteCategory = category => {
      try {
        getProductService().removeCategory(category.name);
        this.setState({
          categories: getProductService().getCategories(),
        });
        this.props.onFireCategoriesUpdated();
      } catch (e) {
        Alert.alert(e);
      }
    };

    const handleDeleteCategory = category => {
      Alert.alert(
        translate('CATEGORIESLIST_deleteCategory', {
          category: category.name,
        }),
        '',
        [
          {
            text: translate('GENERAL_yes'),
            onPress: () => deleteCategory(category),
          },
          {
            text: translate('GENERAL_no'),
            style: 'destructive',
          },
        ],
        {cancelable: false},
      );
    };

    return (
      <View style={styles.section}>
        <View style={styles.list}>
          <ListSection
            title={translate('CATEGORIESLIST_title')}
            placeholder={translate('CATEGORIESLIST_placeholder')}
            items={this.state.categories}
            colorResolver={cat => cat.color}
            handlePress={cat => this.props.onSelectedCategory(cat)}
            handleLongPress={cat => handleDeleteCategory(cat)}
            enableSelection
          />
        </View>
        <CategoryAdd
          onNewCategory={(name, color) => onNewCategory(name, color)}
        />
      </View>
    );
  }
}

const CategoryAdd = props => {
  const [color, setColor] = useState('');

  const colorSelectedHandler = selectedColor => {
    setColor(selectedColor);
  };

  const successfulSubmitHandler = data => {
    props.onNewCategory(data, color);
    setColor(undefined);
  };

  const validateCategory = enteredData => {
    if (!color || color.trim().length === 0) {
      return translate('CATEGORIESLIST_mustSelectColor');
    }
    if (getProductService().getCategoryByName(enteredData).length > 0) {
      return translate('CATEGORIESLIST_categoryAlreadyExists', {
        category: enteredData,
      });
    }
  };

  return (
    <View style={styles.add}>
      <AddPanel
        title={translate('CATEGORIESLIST_addNewCategory')}
        placeholder={translate('CATEGORIESLIST_placeholder')}
        onSuccessfulSubmit={successfulSubmitHandler}
        validate={enteredData => validateCategory(enteredData)}
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
  add: {
    flex: 1,
    maxHeight: '15%',
    maxWidth: '20%',
    marginLeft: 280,
  },
});

export default CategoriesList;

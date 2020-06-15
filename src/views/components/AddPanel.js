import React, {useState} from 'react';
import {Text, View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import Color from '../../shared/Colors';
import AddModal from './AddModal';
import {translate} from '../../lang/language';

const AddPanel = props => {
  const [isAdding, setIsAdding] = useState(false);

  const addItemHandler = enteredData => {
    if (!enteredData || enteredData.trim().length === 0) {
      Alert.alert(translate('ADDPANEL_mustEnterName'), '', [
        {text: translate('GENERAL_ok'), style: 'cancel'},
      ]);
      return false;
    }
    if (!props.validate) {
      setIsAdding(false);
      return false;
    }
    let extraComponentError = props.validate(enteredData);
    if (extraComponentError) {
      Alert.alert(extraComponentError, '', [
        {text: translate('GENERAL_ok'), style: 'cancel'},
      ]);
      return false;
    }

    setIsAdding(false);
    props.onSuccessfulSubmit(enteredData);
    return true;
  };

  return (
    <>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAdding(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <AddModal
        title={props.title}
        visible={isAdding}
        onAdd={addItemHandler}
        onCancel={() => setIsAdding(false)}
        placeholder={props.placeholder}
        extraComponent={props.extraComponent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  addButtonContainer: {
    flexDirection: 'row-reverse',
    marginLeft: 20,
    // padding: 10,
  },
  addButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: Color.add_button,
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: -5,
  },
});

export default AddPanel;

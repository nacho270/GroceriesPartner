import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, View, StyleSheet, Alert} from 'react-native';
import Color from '../../shared/Colors';
import AddModal from './AddModal';

const AddPanel = props => {
  const [isAdding, setIsAdding] = useState(false);

  const addItemHandler = enteredData => {
    if (!enteredData || enteredData.trim().length === 0) {
      Alert.alert('You must enter a name', '', [{text: 'Ok', style: 'cancel'}]);
      return;
    }
    if (!props.validate) {
      setIsAdding(false);
      return;
    }
    let extraComponentError = props.validate();
    if (extraComponentError) {
      Alert.alert(extraComponentError, '', [{text: 'Ok', style: 'cancel'}]);
      return;
    }

    setIsAdding(false);
    props.onSuccessfulSubmit(enteredData);
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
  addButtonContainer: {flexDirection: 'row-reverse', marginLeft: 20},
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

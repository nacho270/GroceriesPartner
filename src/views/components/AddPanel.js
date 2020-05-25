import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, View, StyleSheet} from 'react-native';
import Color from '../../shared/Colors';
import AddModal from './AddModal';

const AddPanel = props => {
  const [isAdding, setIsAdding] = useState(false);
  const addItemHandler = enteredData => {
    if (enteredData) {
      console.log(enteredData);
    }
    setIsAdding(false);
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
        onClose={addItemHandler}
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

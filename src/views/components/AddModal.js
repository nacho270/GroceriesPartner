import React, {useState} from 'react';
import {View, StyleSheet, Button, Modal} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import Color from '../../shared/Colors';

const AddModal = props => {
  const [data, setData] = useState('');
  const onEnteredData = enteredData => {
    setData(enteredData);
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.modalContainer}>
        <TextInput
          placeholder={props.placeholder}
          style={styles.modalTextInput}
          // autoFocus={true}
          onChangeText={onEnteredData}
        />
        <View style={styles.modalExtraComponenContainer}>
          {props.extraComponent}
        </View>
        <View style={styles.modalButtonsContainer}>
          <Button title="Add" onPress={props.onClose.bind(this, data)} />
          <Button title="Cancel" onPress={props.onClose.bind(this, null)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {padding: 20, fontSize: 25, fontWeight: 'bold', textAlign: 'center'},
  row: {
    flexDirection: 'row',
    borderColor: Color.row_separator,
    borderBottomWidth: 1,
    padding: 10,
  },
  list: {
    width: '100%',
  },
  rowThumbnail: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  rowText: {
    width: '100%',
    marginTop: 10,
    marginLeft: 20,
  },
  separator: {
    width: '100%',
    borderBottomColor: Color.separator,
    borderBottomWidth: 1,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderColor: 'black',
    borderWidth: 5,
  },
  modalTextInput: {
    borderBottomColor: Color.separator,
    borderBottomWidth: 1,
    padding: 10,
    width: '80%',
  },
  modalExtraComponenContainer: {
    minHeight: '30%',
    maxHeight: '50%',
    width: '80%',
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddModal;

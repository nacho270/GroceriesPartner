import React, {useState} from 'react';
import {View, StyleSheet, Button, Modal, TextInput} from 'react-native';
import {translate} from '../../lang/language';

import Color from '../../shared/Colors';

const AddModal = props => {
  const [data, setData] = useState('');
  const onEnteredData = enteredData => {
    setData(enteredData);
  };

  const handleSubmit = enteredData => {
    let addedOk = props.onAdd(enteredData);
    if (addedOk) {
      setData(undefined);
    }
  };

  const handleCancel = () => {
    setData(undefined);
    props.onCancel();
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.modalContainer}>
        <TextInput
          clearButtonMode="always"
          style={styles.modalTextInput}
          placeholder={props.placeholder}
          maxLength={30}
          autoFocus={true}
          onChangeText={onEnteredData}
          value={data}
        />
        <View style={styles.modalExtraComponenContainer}>
          {props.extraComponent}
        </View>
        <View style={styles.modalButtonsContainer}>
          <Button
            title={translate('ADDMODAL_add')}
            onPress={() => handleSubmit(data)}
          />
          <Button title={translate('ADDMODAL_cancel')} onPress={handleCancel} />
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
    minHeight: '40%',
    maxHeight: '50%',
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '60%',
  },
});

export default AddModal;

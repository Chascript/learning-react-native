import React, {useState} from 'react';
import { View, Modal, TextInput, Button, StyleSheet } from 'react-native';

const NoteInput = props => {

  const [newNotes, setNewNotes] = useState('');
  const noteInputHandler = enteredText => {
    setNewNotes(enteredText);
  };

  const addNoteHandler = () => {
    if(newNotes.length > 0){
      props.onAddNote(newNotes);
      setNewNotes('')
    } else {
      alert(`You haven't made a note`)
    }
  }


  return (
    <Modal visible={props.visible} animationType="slide">
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Have any notes...?"
        style={styles.input}
        onChangeText={noteInputHandler}
        value={newNotes}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="CANCEL" color='red' onPress={props.closeNoteModal} />
        </View>
        <View style={styles.button}>
          <Button title="ADD" onPress={addNoteHandler} />
        </View>
      </View>
    </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'50%'
  },
  button:{
    width: '40%'
  }
})
  
export default NoteInput




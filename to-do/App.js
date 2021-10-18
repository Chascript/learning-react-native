import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList
} from 'react-native';
import NoteInput from './src/components/NoteInput';
import TheNote from './src/components/NoteItem';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [addNoteModal, setAddNoteModel] = useState(false)

  const removeNoteHandler = noteId => {
    setNotes(notes => {
      return notes.filter((note)=> note.id !== noteId)
    })
  }

  const closeInputModal = () => {
    setAddNoteModel(false);
  }

  const addNoteHandler = noteValue => {
    setNotes(notes => [
      ...notes,
      { id: Math.random().toString(), value: noteValue }
    ]);
    setAddNoteModel(false)
  };

  return (
    <View style={styles.screen}>
      <Button title={'add new note'} onPress={()=>setAddNoteModel(true)} />
      <NoteInput
        visible={addNoteModal}
        onAddNote={addNoteHandler}
        closeNoteModal={closeInputModal}
      />
      <FlatList
        data={notes}
        renderItem={itemData => (<TheNote id={itemData.item.id} onDelete={removeNoteHandler}  value={itemData.item.value} />   )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});

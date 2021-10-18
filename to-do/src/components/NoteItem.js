import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';

const TheNote = props => {

  return (
    <TouchableOpacity
      onPress={props.onDelete.bind(this, props.id)}
      activeOpacity={0.4}
    >
      <View style={styles.listItem}>
        <Text>{props.value}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  }
})
  
export default TheNote




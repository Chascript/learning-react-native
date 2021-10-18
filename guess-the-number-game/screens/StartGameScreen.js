import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if(isNaN(chosenNumber)  || chosenNumber <=0 || chosenNumber > 99){
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setEnteredValue('')
    setSelectedNumber(chosenNumber)
    Keyboard.dismiss();
  };

  let confirmOutput;

  if(confirmed) {
    confirmOutput = (
      <Card style={styles.confirmedOutput}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <View style={styles.confirmedButton} >
          <Button title='Start The Game!' color={Colors.primary} onPress={() => props.onStartGame(selectedNumber)}></Button>
        </View>
      </Card>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>{props.someText}</Text>
        <Card>
          <Text>Select a Number</Text>
          <Input
          style={styles.input}
          blurOnSubmit
          autoCorrect={false} 
          keyboardType="number-pad" 
          maxLength={2}
          onChangeText={numberInputHandler}
          value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="reset" onPress={resetInputHandler} color={Colors.primary}/>
            </View>
            <View style={styles.button}>
              <Button title="confirm" onPress={confirmInputHandler} color={Colors.secondary}/>
            </View>
          </View>
        </Card>    
        {confirmOutput}    
      </View>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title:{
    fontSize: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonContainer:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button:{
    width: 100,
  },
  input:{
    width: 75,
    textAlign: 'center',
  },
  confirmedOutput: {
    marginTop: 20,
  },
  confirmedButton:{
    marginTop:10
  }
})

export default StartGameScreen;
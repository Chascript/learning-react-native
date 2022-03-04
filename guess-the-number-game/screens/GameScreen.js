import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card'

//this function will generate a random number between 1 & 100, the number will never be the same as the users chosen number
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  //gets a random number between the min and max
  const randomNumber = Math.floor(Math.random()* (max - min)) + min; 
  // if the random number is equal to the chosen number then generate a new random number
  //This is recursion
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};


const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.usersChoice)
  );

  const [rounds, setRounds] = useState(0);
  const currentLowNumber = useRef(1);
  const currentMaxNumber = useRef(100);

  const { usersChoice, onGameOver } = props;

  const nextGuessHandler = direction => {
    if(direction === 'lower' && currentGuess < usersChoice || direction === 'greater' && currentGuess > props.usersChoice) {
      Alert.alert('Don\'t lie!', 'You know this is the incorrect choice', [
        {text: 'I\'ll try again', style: 'cancel'}
      ]);
      return;
    }
    if (direction === 'lower') {
      currentMaxNumber.current = currentGuess;
    } else {
      currentLowNumber.current = currentGuess;
    }
    const nextNumber = generateRandomBetween( currentLowNumber.current, currentMaxNumber.current, currentGuess );
    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1)
  }

  useEffect(() => {
    if(currentGuess === props.usersChoice) {
      onGameOver(rounds);
    }

  },[currentGuess, usersChoice, onGameOver]);

  return(
    <View style={styles.screen}>
      <Text>Opponents Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="lower" onPress={nextGuessHandler.bind(this, 'lower')}/>
        <Button title="greater" onPress={nextGuessHandler.bind(this, 'greater')}/>
      </Card>
    </View>
  )
};

const styles = StyleSheet.create ({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop:20,
    width: 300,
    maxWidth: '80%'
  }
})

export default GameScreen;
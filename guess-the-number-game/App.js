import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import StartGameScreen from './screens/StartGameScreen';
import Header from './components/Header';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }
  // default start screen
  let content = <StartGameScreen onStartGame={startGameHandler} someText="Start Screen" />
  // if the user has chosen a number then change the screen to the GameScreen
  if (userNumber) {
    content = <GameScreen usersChoice={userNumber}/>
  }

  return (
    <View style={styles.container}>
      <Header title="Number Game"/>
      {content}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

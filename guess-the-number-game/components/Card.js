import React from "react";
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>
}

const styles = StyleSheet.create ({
  card:{
    width: 300,
    maxWidth:'80%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    //IOS Shadow Only
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    // Andriod Only
    elevation: 10, 
  }
})

export default Card;
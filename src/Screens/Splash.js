import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const getUser = async () => {
    let usersString = await AsyncStorage.getItem('User');
    console.log(usersString, 'Fazzy');
    if (!usersString) {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 4000);
    }
  };

  useEffect(() => {
    console.log('AAA');
    getUser();
  }, []);
  return (
    <ImageBackground
      source={require('../Assets/Images/splash.jpg')}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../Assets/Images/logo.png')}
        style={{width: 250, height: 250}}
        resizeMode="contain"
      />
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({});

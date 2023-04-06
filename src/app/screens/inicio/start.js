import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Login from './login';
import Home from './home';
import { AuthenticationContext } from '../../context/authentication';

function Start() {

  const { isLoggedin } = useContext(AuthenticationContext)
  
    return (
        <View>        
         { isLoggedin? <Home/> : <Login/>}
        </View>
    );
  };

  export default Start;
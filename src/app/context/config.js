import React, { createContext, useState, useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ConfigContext = createContext()

export const ConfigProvider = ({ children }) => {

  const [baseUrl, setBaseUrl] = useState('');
  const [appInfo, setAppInfo] = useState('');
  SplashScreen.preventAutoHideAsync();

  
  useEffect(() => {

    async function getData() {    
      const base = await AsyncStorage.getItem('@base_url');
      const app = await AsyncStorage.getItem('@app_info');
      if(base !== null){ setBaseUrl(base) }
      if(app !== null){ setAppInfo(JSON.parse(app)) }
      SplashScreen.hideAsync()
    }
    getData()
  }, []);


  const setApiUrl = async([apiUrl, appInfos]) => {
    
    setBaseUrl(apiUrl)
    setAppInfo(appInfos)
    await AsyncStorage.setItem('@base_url', apiUrl)
    await AsyncStorage.setItem('@app_info', JSON.stringify(appInfos))

    }

    const setInfoApp = async(appInfos) => {
    
      setAppInfo(appInfos)
      await AsyncStorage.setItem('@app_info', JSON.stringify(appInfos))
  
      }


  return (
    <ConfigContext.Provider 
    value={{ setApiUrl, baseUrl, appInfo, setInfoApp }}>
      {children}
    </ConfigContext.Provider>
  )


}
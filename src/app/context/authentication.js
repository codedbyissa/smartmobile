import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthenticationContext = createContext()

export const AuthenticationProvider = ({ children }) => {

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({});
  const [userPermissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    async function getData() {    
      const log = await AsyncStorage.getItem('@is_loggedin');
      const user = await AsyncStorage.getItem('@user');
      const permissions = await AsyncStorage.getItem('@user_permissions');
      if(log !== null){ log == 'true'? setIsLoggedin(true) : null }
      if(user !== null){ 
        const userset = JSON.parse(user)
        setUser(userset) }
      if(permissions !== null){
        const permissionsset = JSON.parse(permissions)
        setUserPermissions(permissionsset) }       
       setLoading(false)
    }
    
    getData()
  }, []);

  const setUserInfos = async(user) => {

    setUser(user)
    setUserPermissions(user.ALTERA_MOBILE.split(","))
    await AsyncStorage.setItem('@user', JSON.stringify(user))
    await AsyncStorage.setItem('@user_permissions', JSON.stringify(user.ALTERA_MOBILE.split(",")))

    }

  const LogIn = async(user) => {
    
    setUser(user)    
    setUserPermissions(user.ALTERA_MOBILE.split(","))
    setIsLoggedin(true)
    await AsyncStorage.setItem('@is_loggedin', 'true')
    await AsyncStorage.setItem('@user', JSON.stringify(user))
    await AsyncStorage.setItem('@user_permissions', JSON.stringify(user.ALTERA_MOBILE.split(",")))

    }

    const LogOut = async() => {

      setUser({})
      setUserPermissions([])
      setIsLoggedin(false)
      await AsyncStorage.removeItem('@is_loggedin')
      await AsyncStorage.removeItem('@user')
      await AsyncStorage.removeItem('@user_permissions')
    
        }
        
  return (
    <AuthenticationContext.Provider 
    value={{ isLoggedin, loading, user, userPermissions, LogIn, LogOut, setUserInfos }}>
      {children}
    </AuthenticationContext.Provider>
  )


}


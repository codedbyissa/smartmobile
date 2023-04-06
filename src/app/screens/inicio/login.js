import React, {useState, useContext, useCallback} from 'react';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { Container, Smartmobile, SmartmobileLogo, PurpleCircle, Entrar, EntrarLab, Inputs, Input, ErrorMensage, SuccessMensage} from "../../styles/inicio/login";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthenticationContext } from '../../context/authentication';
import { ConfigContext } from '../../context/config';

   function Login() {
    const { LogIn } = useContext(AuthenticationContext)    
    const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)
    const [refreshing, setRefreshing] = useState(false); 

    useFocusEffect(
      React.useCallback(() => {
        fetch(`http://${baseUrl}/`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setInfoApp(json)               
          });
      }, [])
    );
    
    const navigation = useNavigation(); // navigation
    const [login, setLogin] = useState(''); 
    const [senha, SetSenha] = useState('');
    const [status, SetStatus] = useState({ status: false, mnsg: ''}); 
  
  const [loaded] = useFonts({
    MajorMonoDisplay: require('./fonts/MajorMonoDisplay-Regular.ttf'),
  });
  
  if (!loaded) {
    return null;
  }

  const Authenticator = () => {

    setRefreshing(true)

    if( login == '' || senha == '' ) {

      SetStatus({ status: true, mnsg: 'Os campos de login e senha são obrigatórios'})
      setRefreshing(false)

    }

    else {
     
    fetch(`http://${baseUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        password: senha
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {

        if(json.status == 1) {

          SetStatus({ status: true, mnsg: 'acesso não autorizado, login inexistente'}) 
          setRefreshing(false)         
        }

        if(json.status == 2) {         
          SetStatus({ status: true, mnsg: 'acesso não autorizado, senha incorreta'})
          setRefreshing(false)
        }

        if(json.status == 0) {
          SetStatus({ status: false, mnsg: 'Bem Vindo' + ' ' + json.infos.NOME })
          LogIn(json.infos)
          
        }
      });
    }
      
  }
  
    return (
        <Container style={{ backgroundColor: appInfo.cor_de_fundo }}>
          
          <StatusBar backgroundColor={appInfo.cor_principal}/>
          <PurpleCircle style={{backgroundColor: appInfo.cor_principal }}/>
          

          <SmartmobileLogo source={{ uri: appInfo.imagem_do_app, }}/> 
 
          {/* <Smartmobile style={{ color: appInfo.cor_principal, fontFamily: 'MajorMonoDisplay' }}> {appInfo.nome_do_app} </Smartmobile> */}

         <Inputs>
         {status.status == true? <ErrorMensage> {status.mnsg} </ErrorMensage> : null}
         {status.status == false? <SuccessMensage> {status.mnsg} </SuccessMensage> : null}
         
          <Input
          style={{ backgroundColor: appInfo.cor_de_fundo, borderColor: appInfo.cor_de_fundo, color: appInfo.cor_principal }}
          name={login}
          onChangeText={(t) => setLogin(t)}
          placeholder="Usuário"
          placeholderTextColor={appInfo.cor_principal}
          >{login}</Input>

        <Input
          style={{ backgroundColor: appInfo.cor_de_fundo, borderColor: appInfo.cor_de_fundo, color: appInfo.cor_principal }}
          name={senha}
          secureTextEntry={true}
          onChangeText={(t) => SetSenha(t)}
          placeholder="Senha"
          placeholderTextColor={appInfo.cor_principal}
          >{senha}</Input>   
          
          { refreshing == true? <ActivityIndicator style={{ marginBottom: 10 }} size="large" color={appInfo.cor_segundaria} /> : 

         <Entrar style={{ backgroundColor: appInfo.cor_segundaria }} onPress={Authenticator}>     
          <EntrarLab style={{ color: appInfo.cor_principal }}> Entrar </EntrarLab>
         </Entrar> }  
          
         </Inputs> 
        </Container>
    );
  };


  export default Login;
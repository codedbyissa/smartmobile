import React, { useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Content, ContainerInput, Input, ContainerLab, InputLab, Save, SaveLab, ErrorMensage} from "../styles/config/config";
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRightFromBracket, faUsers, faUserTie, faCommentsDollar,
faMobileScreenButton, faCoins, faCartShopping, faFileInvoiceDollar, faRotate } from "@fortawesome/free-solid-svg-icons";
import { AuthenticationContext } from '../context/authentication';
import { ConfigContext } from '../context/config';
import { QueryClient, useQuery, QueryClientProvider } from "react-query";


function Config() {
  
  const navigation = useNavigation(); // navigation
  const [refreshing, setRefreshing] = useState(false); 
  const { isLoggedin, user, setUserInfos, userPermissions} = useContext(AuthenticationContext)
  const { setApiUrl, baseUrl, appInfo } = useContext(ConfigContext)
  const [erroMensag, setErroMensag] = useState({status: false, mensag: ''});

  const styles = StyleSheet.create({
    input: {
    color: appInfo.cor_principal,
    borderColor: appInfo.cor_principal,
    backgroundColor: appInfo.cor_de_fundo,
    },
  });
  

  {/* PARA CASO NÃO HAJA UM USUARIO LOGADO */}

  if(!isLoggedin) {
 
  const [alteraApiUrl, setAlteraApiUrl] = useState(baseUrl);

  const ToUpdateApiUrl = () => {

    setRefreshing(true)

    if(alteraApiUrl == '') {

      setRefreshing(false)
      setErroMensag({status: true, mensag: 'Insira a URL de acesso a api'})

    } else {

      setErroMensag({status: false, mensag: ''})

      fetch(`http://${alteraApiUrl}/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => { 
        if(json.nome_do_app && json.cor_principal && json.cor_segundaria) {
          setRefreshing(false)
          setErroMensag({status: false, mensag: 'URL de acesso alterada com sucesso'})
          setApiUrl([alteraApiUrl, json])

        } else {
          setRefreshing(false)
          setErroMensag({status: true, mensag: 'URL de acesso invalida'})
        }
      })
      .catch(error => { setErroMensag({status: true, mensag: 'URL de acesso não encontrada'}) })

    } 
  }

    return (
      <Container style={{ backgroundColor: appInfo.cor_de_fundo }}>
      <Content contentContainerStyle={{ alignItems: 'center' }}>
        <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> URL API </InputLab>
          </ContainerLab>
          <Input
          style={styles.input}
          onChangeText={newText => setAlteraApiUrl(newText)}
          placeholder='URL de acesso a api'
          placeholderTextColor={appInfo.cor_principal}>{alteraApiUrl}</Input>
          </ContainerInput> 
          { erroMensag.status? <ErrorMensage> {erroMensag.mensag} </ErrorMensage> : null }
          { !erroMensag.status? <ErrorMensage style={{ color: '#46b367'}}> {erroMensag.mensag} </ErrorMensage> : null }
          { refreshing && !erroMensag.status? <ActivityIndicator size="large" color={appInfo.cor_segundaria} /> : null}
          </Content>

          <Save style={{backgroundColor: appInfo.cor_principal }} onPress={ToUpdateApiUrl}>
          <SaveLab style={{ color: appInfo.cor_de_fundo }}> Salvar </SaveLab>
          </Save>  
        
      </Container> ) 
    
  } 

    {/* PARA CASO HAJA UM USUARIO LOGADO */}
  
  if(isLoggedin) {

  const [alteraNome, setAteraNome] = useState(user.NOME);
  const [alteraLogin, setAlteraLogin] = useState(user.LOGIN);
  const [alteraSenha, setAlteraSenha] = useState(user.SENHA_MOBILE);

  const ToUpdate = () => {

    if(alteraNome == '' || alteraLogin == ''  || alteraSenha == '' ) {
    
      setErroMensag(true)

    } else {

    fetch(`http://${baseUrl}/C000008/${user.CODIGO}`, {
    method: 'PUT',
    body: JSON.stringify({
      NOME: alteraNome,
      LOGIN: alteraLogin,
      SENHA_MOBILE: alteraSenha,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => setUserInfos(json))
    .catch(error => console.log(error))

    Alert.alert(
      "Atualização bem sucedida",
      'As informações foram atualizadas com sucesso.',
      [ 
        { text: "Voltar", onPress: () => navigation.navigate('Start') }
      ]
    );
  }
}

    return (
        <Container style={{ backgroundColor: appInfo.cor_de_fundo }}>

        { erroMensag.status == true? <ErrorMensage> os campos destacados são obrigatórios </ErrorMensage> : null }

           <Content contentContainerStyle={{ alignItems: 'center' }}>      

           {userPermissions.includes('AlterarNome')? <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Nome { erroMensag.status == true? <ErrorMensage> * </ErrorMensage> : null }  </InputLab>
          </ContainerLab>
          <Input
          style={styles.input}
          onChangeText={newText => setAteraNome(newText)}
          placeholder='Nome de exibição'
          placeholderTextColor={appInfo.cor_principal}>{alteraNome}</Input>
          </ContainerInput> : null }

          {userPermissions.includes('AlterarLogin')? <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Login { erroMensag.status == true? <ErrorMensage> * </ErrorMensage> : null }  </InputLab>
          </ContainerLab>
          <Input
          style={styles.input}
          onChangeText={newText => setAlteraLogin(newText)}
          placeholder='Login de acesso'
          placeholderTextColor={appInfo.cor_principal}>{alteraLogin}</Input>
          </ContainerInput> : null }

          {userPermissions.includes('AlterarSenha')? <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Senha { erroMensag.status == true? <ErrorMensage> * </ErrorMensage> : null }  </InputLab>
          </ContainerLab>
          <Input
          style={styles.input}
          secureTextEntry={true}
          onChangeText={newText => setAlteraSenha(newText)}
          placeholder='Senha de acesso'
          placeholderTextColor={appInfo.cor_principal}>{alteraSenha}</Input>
          </ContainerInput> : null }

          </Content>

          <Save style={{backgroundColor: appInfo.cor_principal }} onPress={ToUpdate}>
          <SaveLab style={{color: appInfo.cor_de_fundo }}> Salvar </SaveLab>
          </Save>
          
          
        </Container>
    );
          
        }
  };

  export default Config;
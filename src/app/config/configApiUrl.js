import React, { useContext, useState} from 'react';
import { Container, Content, ContainerInput, Input, ContainerLab, InputLab, Save, SaveLab, ErrorMensage} from "../styles/config/configApiUrl";
import { useNavigation } from '@react-navigation/native';
import { ConfigContext } from '../context/config';
import { ActivityIndicator } from "react-native";

function ConfigApiUrl() {
  
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false); 
  const { setApiUrl } = useContext(ConfigContext)
  const [erroMensag, setErroMensag] = useState({status: false, mensag: ''});

  const [alteraApiUrl, setAlteraApiUrl] = useState('');

    const ToUpdateApiUrl = () => {

      setRefreshing(true)
      
      if(alteraApiUrl == '') {

        setRefreshing(false)
        setErroMensag({status: true, mensag: 'Insira a URL de acesso a api'})
  
      } else {

        setErroMensag({status: false, mensag: ''})

        fetch(`http://${alteraApiUrl}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => { 
          if(json.nome_do_app && json.cor_principal && json.cor_segundaria) {
              
            setErroMensag({status: false, mensag: ''})
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
      <Container>

      <Content contentContainerStyle={{ alignItems: 'center' }}>
        <ContainerInput>
          <ContainerLab>
          <InputLab> URL API </InputLab>
          </ContainerLab>
          <Input
          onChangeText={newText => setAlteraApiUrl(newText)}
          placeholder='URL de acesso a api'/>
          </ContainerInput> 
          { erroMensag.status? <ErrorMensage> {erroMensag.mensag} </ErrorMensage> : null }
         { refreshing && !erroMensag.status? <ActivityIndicator size="large" color="#3b566e" /> : null}
          </Content>
          

          <Save onPress={ ToUpdateApiUrl }>
          <SaveLab> Salvar </SaveLab>
          </Save>  
        
      </Container> ) 
  
  };

  export default ConfigApiUrl;
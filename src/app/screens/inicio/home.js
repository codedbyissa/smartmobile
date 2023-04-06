import React, {useContext, useState, useEffect, useCallback} from 'react';
import { StatusBar } from 'expo-status-bar';
import { RefreshControl } from 'react-native';
import { Container, Content, SquaresContainer, Square, Lab, ExitContainer, ExitContent,
   DuoIcon, DuoLab } from "../../styles/inicio/home";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { AuthenticationContext } from '../../context/authentication'
import { ConfigContext } from '../../context/config'
import { faRightFromBracket, faUsers, faUserTie, faCommentsDollar,
faMobileScreenButton, faCoins, faCartShopping, faFileInvoiceDollar, faRotate } from "@fortawesome/free-solid-svg-icons";


function Home() {
  const [refreshing, setRefreshing] = useState(false); 
  const { LogOut, user, setUserInfos, userPermissions } = useContext(AuthenticationContext) 
  const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)
  const navigation = useNavigation(); // navigation

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    fetch(`http://${baseUrl}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setInfoApp(json)               
      }).catch(error => console.log(error))

    fetch(`http://${baseUrl}/C000008/${user.CODIGO}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      setUserInfos(json)                
    }).catch(error => console.log(error))

    setTimeout(() => {
      setRefreshing(false)
    }, 2000); 
  }, [refreshing])


  useFocusEffect(
    React.useCallback(() => {

        fetch(`http://${baseUrl}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => {
            setInfoApp(json)               
          }).catch(error => console.log(error))

        fetch(`http://${baseUrl}/C000008/${user.CODIGO}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setUserInfos(json)                
        }).catch(error => console.log(error))
        
    }, [])
  );

  
    return (
        <Container style={{ backgroundColor: appInfo.cor_de_fundo }}>
          <StatusBar backgroundColor={appInfo.cor_principal}/>        
          <Content
          refreshControl={<RefreshControl colors={[ appInfo.cor_segundaria ]}  refreshing={refreshing} onRefresh={onRefresh}/>}>
          <SquaresContainer>
          <Square style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('Preco')}>
            <FontAwesomeIcon icon={faCommentsDollar} size={ 100 } color={ appInfo.cor_segundaria }/>
            <Lab style={{color: appInfo.cor_segundaria }}> Preços </Lab>
          </Square>          
          <Square style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('Cliente')}>           
            <FontAwesomeIcon icon={faUsers} size={ 100 } color={ appInfo.cor_segundaria }/>
            <Lab style={{color: appInfo.cor_segundaria }}> Clientes </Lab>         
          </Square>

          {userPermissions.includes('CadastrarPreVenda')?
          <Square style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('Atendimento')}>
            <DuoIcon>
            <FontAwesomeIcon icon={faUserTie} size={ 80 } color={ appInfo.cor_segundaria }/>
            <FontAwesomeIcon icon={faMobileScreenButton} size={ 40 } color={ appInfo.cor_segundaria }/>
            </DuoIcon>
            <DuoLab style={{color: appInfo.cor_segundaria }}> Atendimento </DuoLab>       
          </Square> : null }
          
          
          <Square style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('Vendas')}>
            <DuoIcon>
            <FontAwesomeIcon icon={faCartShopping} size={ 80 } color={ appInfo.cor_segundaria }/>
            <FontAwesomeIcon icon={faCoins} size={ 40 } color={ appInfo.cor_segundaria }/>
            </DuoIcon>
            <DuoLab style={{color: appInfo.cor_segundaria }}> Vendas </DuoLab>        
          </Square>      
          
          {userPermissions.includes('EditarPreVenda')? 
          <Square style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('Reabertura')}>
          <DuoIcon>
            <FontAwesomeIcon icon={faCartShopping} size={ 80 } color={ appInfo.cor_segundaria }/>
            <FontAwesomeIcon icon={faRotate} size={ 40 } color={ appInfo.cor_segundaria }/>
            </DuoIcon>        
            <DuoLab style={{color: appInfo.cor_segundaria }}> Reabertura </DuoLab>      
          </Square> : null }

          {userPermissions.includes('CadastrarOrçamento')? 
          <Square style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('AtendimentoOrcamentos')}>
            <DuoIcon>
            <FontAwesomeIcon icon={faUserTie} size={ 80 } color={ appInfo.cor_segundaria }/>
            <FontAwesomeIcon icon={faFileInvoiceDollar} size={ 40 } color={ appInfo.cor_segundaria }/>
            </DuoIcon>
            <DuoLab style={{color: appInfo.cor_segundaria }}> Atendimento (Orçamentos) </DuoLab>       
          </Square> : null }   
          
          <Square style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('Orcamentos')}>
            <DuoIcon>
            <FontAwesomeIcon icon={faFileInvoiceDollar} size={ 80 } color={ appInfo.cor_segundaria }/>
            <FontAwesomeIcon icon={faCoins} size={ 40 } color={ appInfo.cor_segundaria }/>
            </DuoIcon>
            <DuoLab style={{color: appInfo.cor_segundaria }}> Orçamentos </DuoLab>        
          </Square>
          
          {userPermissions.includes('EditarOrçamento')? 
          <Square style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('ReaberturaOrcamentos')}>
          <DuoIcon>
            <FontAwesomeIcon icon={faFileInvoiceDollar} size={ 80 } color={ appInfo.cor_segundaria }/>
            <FontAwesomeIcon icon={faRotate} size={ 40 } color={ appInfo.cor_segundaria }/>
            </DuoIcon>        
            <DuoLab style={{color: appInfo.cor_segundaria }}> Reabertura (Orçamentos)</DuoLab>      
          </Square> : null }
                   
          </SquaresContainer>

          </Content>

          <ExitContainer>
            <ExitContent  style={{ backgroundColor: appInfo.cor_de_fundo }} onPress={() => LogOut()}>             
            <FontAwesomeIcon icon={faRightFromBracket} size={ 52 } color={ appInfo.cor_principal }/>
            </ExitContent>
          </ExitContainer>
        </Container>
    );
  };

  export default Home;
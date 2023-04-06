import React, { useContext, useState } from "react";
import { ActivityIndicator, View, Modal } from 'react-native';
import { Container, Content, BackContainer, BackContent, TopContainer, SearchInput, 
  ContainerSearch, Filter, DataContent, DataLab, DataReplyLab, DataLimiter, IconsContent,
   IconContent, ContainerSearchtype, SearchtypeContent, Close, ContainerRadio, RadioLab, 
   RadioMessage, RadioCont  } from "./../../styles/crud";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ConfigContext } from '../../context/config'
import { faRightFromBracket, faHouse, faArrowUpAZ, faMagnifyingGlass, faEye, faPen, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { RadioButton } from 'react-native-paper';
import { QueryClient, useQuery, useInfiniteQuery, QueryClientProvider } from "react-query";
import { useNavigation } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
import { AuthenticationContext } from '../../context/authentication'

function Cliente() {

  return (  
    <QueryClientProvider client={queryClient}>
      <Conteudo/>
    </QueryClientProvider>
   
  )
}

const queryClient = new QueryClient()

// checando se a api esta online

async function get(baseUrl) {
  const response = await fetch(
    `http://${baseUrl}`
  );

   return response.json(); 

}

// listando clientes

async function getClientes([pageParam, searchParam, searchtype, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000007?s=${searchParam}&searchtype=${searchtype}&page=${pageParam}`
  );
   return response.json(); 
}

function Conteudo() {
  const { LogOut, user, setUserInfos, userPermissions } = useContext(AuthenticationContext)
  const navigation = useNavigation(); // navigation
  const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)
  const [searchText, setSearchText] = useState('');
  const [searchtype, setSearchtype] = useState('NOME');
  const [modalSearchtype, setModalSearchtype] = useState(false);

        // query checar se a api esta online
        const check = useQuery( 
          ["check", baseUrl], () => get(baseUrl), {
            staleTime: 2000, cacheTime: 10
          },
        );
  
        // query clientes
        const clientes = useInfiniteQuery(    
          ["clientes", searchText, searchtype, baseUrl], ({ pageParam = 1 }) => getClientes([pageParam, searchText, searchtype, baseUrl]), 
          { getNextPageParam: (page) => (page.current_page === page.last_page ? null : page.current_page + 1 ) },
          { staleTime: 2000, cacheTime: 10 },
        );

        // load clientes
        const loadMoreClientes = () => {  if (clientes.hasNextPage) {  clientes.fetchNextPage();  }  };

        const renderSpinner = () => { return <View style={{flex:1,
          backgroundColor: appInfo.cor_de_fundo,
          alignItems:'center',
          justifyContent:'center', }}>   
          <ActivityIndicator size="large" color={appInfo.cor_segundaria} />
          </View>;  }

      if (check.isLoading) {
        return (
          <View style={{flex:1,
          backgroundColor: appInfo.cor_de_fundo,
          alignItems:'center',
          justifyContent:'center', }}>   
          <ActivityIndicator size="large" color={appInfo.cor_segundaria} />
          </View>
        )
      }
      if (check.isError) {
        return (
          <View style={{flex:1,
            backgroundColor: appInfo.cor_de_fundo,
            alignItems:'center',
            justifyContent:'center', }}>   
          <DataLab style={{color: appInfo.cor_principal }}> Tente Novamente </DataLab>
          </View>
        )
  
      }
      if (check.isSuccess) {
        
    return (
        <Container style={{ backgroundColor: appInfo.cor_de_fundo }}>

          <TopContainer style={{ backgroundColor: appInfo.cor_de_fundo }}>
          <ContainerSearch style={{ color: appInfo.cor_principal, backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={ 25 } color={appInfo.cor_principal}/>
          </ContainerSearch>                       
          <SearchInput
          style={{color: appInfo.cor_principal, backgroundColor: appInfo.cor_de_fundo, borderColor: appInfo.cor_principal }}
          placeholder='Buscar Cliente'
          placeholderTextColor={appInfo.cor_principal}
          name={searchText}
          onChangeText={(t) => setSearchText(t)}/>
          <Filter style={{ backgroundColor: appInfo.cor_de_fundo, borderColor: appInfo.cor_principal }} onPress={() => setModalSearchtype(true)}>                               
          <FontAwesomeIcon icon={faArrowUpAZ}  size={ 25 } color={ appInfo.cor_principal }/>
          </Filter>

          <Modal         
          visible={modalSearchtype}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalSearchtype(false)}>

          <ContainerSearchtype>

          <SearchtypeContent style={{ backgroundColor: appInfo.cor_de_fundo, height: '35%' }}>

      <ContainerRadio>

      <RadioMessage style={{color: appInfo.cor_principal }}> Informe o tipo de busca : </RadioMessage>

      <RadioCont>
      <RadioButton
      color={appInfo.cor_principal }
      value="CODIGO"
      status={ searchtype === 'CODIGO' ? 'checked' : 'unchecked' }
      onPress={() => setSearchtype('CODIGO') } />
      <RadioLab style={{color: appInfo.cor_principal }}> Código do cliente </RadioLab>
      </RadioCont>

      <RadioCont>
      <RadioButton
      color={appInfo.cor_principal}
      value="NOME"
      status={ searchtype === 'NOME' ? 'checked' : 'unchecked' }
      onPress={() => setSearchtype('NOME') } />
      <RadioLab style={{color: appInfo.cor_principal }}> Nome do cliente </RadioLab>
      </RadioCont>

      <RadioCont>
      <RadioButton
      color={appInfo.cor_principal}
      value="APELIDO"
      status={ searchtype === 'APELIDO' ? 'checked' : 'unchecked' }
      onPress={() => setSearchtype('APELIDO') } />
      <RadioLab style={{color: appInfo.cor_principal }}> Apelido do cliente </RadioLab>
      </RadioCont>

      <RadioCont>
      <RadioButton
      color={appInfo.cor_principal}
      value="CPF"
      status={ searchtype === 'CPF' ? 'checked' : 'unchecked' }
      onPress={() => setSearchtype('CPF') } />
      <RadioLab style={{color: appInfo.cor_principal }}> CPF do cliente </RadioLab>
      </RadioCont>

      </ContainerRadio>

          <Close onPress={() => setModalSearchtype(false)}>       
          <FontAwesomeIcon icon={faCircleXmark}  size={ 25 } color={ '#e95361' }/>
          </Close>

          </SearchtypeContent>

          </ContainerSearchtype>
      
          </Modal>   

          </TopContainer>
            
          <Content Style={{ backgroundColor: appInfo.cor_de_fundo, alignItems: 'center' }}>

          {clientes.isSuccess? <FlashList
        onEndReached={loadMoreClientes}
        estimatedItemSize={200}
        onEndReachedThreshold={0.5}
        ListFooterComponent={clientes.isFetching ? renderSpinner : null}
        data={(clientes.data.pages.map((page) => page.data)).flat()}    
        keyExtractor={(item) => item.CODIGO}    
        renderItem={({ item }) => {
          return <DataContent style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}>
               
          <DataLimiter>
          <DataLab style={{color: appInfo.cor_principal }}> Codigo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.CODIGO} </DataReplyLab> </DataLab>
          <DataLab style={{color: appInfo.cor_principal }}> Cliente: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.NOME} {item.APELIDO} </DataReplyLab> </DataLab>
          <DataLab style={{color: appInfo.cor_principal }}> CPF: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.CPF} </DataReplyLab> </DataLab>
          </DataLimiter>

          <IconsContent>
          <IconContent style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('ShowCliente', { cod: item.CODIGO, })}>
          <FontAwesomeIcon icon={faEye} size={ 21 } color={ appInfo.cor_de_fundo } />  
          </IconContent>
          {userPermissions.includes('EditarCliente')? 
          <IconContent style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('EditCliente', { cod: item.CODIGO, })}>
          <FontAwesomeIcon icon={faPen} size={ 15 } color={ appInfo.cor_de_fundo } />  
          </IconContent> : null }
          </IconsContent>

          </DataContent>;
        }}/> : <View style={{flex:1,
          backgroundColor: appInfo.cor_de_fundo,
          alignItems:'center',
          justifyContent:'center', }}>   
          <ActivityIndicator size="large" color={appInfo.cor_segundaria}/>
          </View>  }
          
          </Content> 

          <BackContainer style={{ backgroundColor: appInfo.cor_de_fundo }}>
            <BackContent style={{ backgroundColor: appInfo.cor_de_fundo }} onPress={() => navigation.navigate('Start')}>             
            <FontAwesomeIcon icon={faHouse} size={ 52 } color={appInfo.cor_principal}/>
            </BackContent>
            <BackContent style={{ backgroundColor: appInfo.cor_de_fundo }} onPress={() => {LogOut(); navigation.navigate('Start')}}>             
            <FontAwesomeIcon icon={faRightFromBracket} size={ 52 } color={appInfo.cor_principal}/>
            </BackContent>
          </BackContainer>
          
        </Container>
    )
      }
  }

  export default Cliente;
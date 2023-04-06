import React, { useContext, useState } from "react";
import { View, Button, ActivityIndicator, Modal } from 'react-native';
import { Container, Content, BackContainer,  BackContent, TopContainer, ContainerSearch,
   DataContent, DataLab, DataReplyLab, DataLimiter, IconsContent, IconContent, ContainerSearchtype,
  SearchtypeContent, Close, Filter, ContainerRadio, RadioLab, RadioMessage, RadioCont } from "./../../styles/crud";
import { SearchInput, BarCode } from "./styles/custom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket, faHouse, faBarcode, faMagnifyingGlass, faEye, faPen, faCircleXmark, faArrowUpAZ } from "@fortawesome/free-solid-svg-icons";
import { QueryClient, useQuery, useInfiniteQuery, QueryClientProvider } from "react-query";
import { AuthenticationContext } from '../../context/authentication';
import { RadioButton } from 'react-native-paper';
import { ConfigContext } from '../../context/config';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
import Scanner from "./scanner";

function Preco() {
  
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

// listando produtos

async function getProdutos([pageParam, searchParam, searchtype, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000025/?s=${searchParam}&searchtype=${searchtype}&page=${pageParam}`
  );
  return response.json();
}

function Conteudo() {
  const { LogOut, userPermissions } = useContext(AuthenticationContext) 
  const { baseUrl, appInfo } = useContext(ConfigContext)
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchtype, setSearchtype] = useState('PRODUTO');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSearchtype, setModalSearchtype] = useState(false);

      // query checando se a api esta online
      const check = useQuery( 
        ["check", baseUrl], () => get(baseUrl), {
          staleTime: 5000, cacheTime: 4000
        },
      );
      
      // query listando produtos
      const produtos = useInfiniteQuery( 
        ["produtos", searchText, searchtype, baseUrl], ({ pageParam = 1 }) => getProdutos([pageParam, searchText, searchtype, baseUrl]), 
        { getNextPageParam: (page) => (page.current_page === page.last_page ? null : page.current_page + 1 ) },
        {  staleTime: 5000, cacheTime: 4000 },
      );

      // load produtos
      const loadMoreProdutos = () => {  if (produtos.hasNextPage) {  produtos.fetchNextPage();  }  };
         
    
      const onCodeScanned = (type, data) => {       
        setModalVisible(false);
        setSearchtype('CODBARRA');
        setSearchText(data);
            
      };

      const renderSpinner = () => { return <View style={{flex:1,
        backgroundColor: appInfo.cor_de_fundo,
        alignItems:'center',
        justifyContent:'center', }}>   
        <ActivityIndicator size="large" color={appInfo.cor_segundaria} />
        </View>;  };

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
          <Modal         
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>

          <View style={{ flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: appInfo.cor_de_fundo, }}>
          <Scanner onCodeScanned={onCodeScanned} />
          <Button title="Cancelar" color={appInfo.cor_principal} onPress={() => setModalVisible(false)} />
          </View>
          </Modal>

          <TopContainer style={{ backgroundColor: appInfo.cor_de_fundo }}>
          <ContainerSearch style={{ color: appInfo.cor_principal, backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={ 25 } color={ appInfo.cor_principal }/>
          </ContainerSearch>                       
          <SearchInput
          style={{ color: appInfo.cor_principal, backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
          placeholder='Buscar Produto'
          placeholderTextColor={appInfo.cor_principal}
          name={searchText}
          onChangeText={(t) => setSearchText(t)}>{searchText}</SearchInput>
          <BarCode style={{backgroundColor: appInfo.cor_principal,  borderColor: appInfo.cor_principal }} onPress={() => setModalVisible(true)}>                               
          <FontAwesomeIcon icon={faBarcode}  size={ 25 } color={ appInfo.cor_de_fundo }/>
          </BarCode>
          <Filter style={{ backgroundColor: appInfo.cor_de_fundo, borderColor: appInfo.cor_principal }} onPress={() => setModalSearchtype(true)}>                               
          <FontAwesomeIcon icon={faArrowUpAZ}  size={ 25 } color={ appInfo.cor_principal }/>
          </Filter> 

          <Modal         
          visible={modalSearchtype}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalSearchtype(false)}>

          <ContainerSearchtype>

          <SearchtypeContent style={{ backgroundColor: appInfo.cor_de_fundo }}>

      <ContainerRadio>

      <RadioMessage style={{color: appInfo.cor_principal }}> Informe o tipo de busca : </RadioMessage>

      <RadioCont>
      <RadioButton
      color={appInfo.cor_principal }
      value="CODIGO"
      status={ searchtype === 'CODIGO' ? 'checked' : 'unchecked' }
      onPress={() => setSearchtype('CODIGO') } />
      <RadioLab style={{color: appInfo.cor_principal }}> Código do produto </RadioLab>
      </RadioCont>

      <RadioCont>
      <RadioButton
      color={appInfo.cor_principal}
      value="PRODUTO"
      status={ searchtype === 'PRODUTO' ? 'checked' : 'unchecked' }
      onPress={() => setSearchtype('PRODUTO') } />
      <RadioLab style={{color: appInfo.cor_principal }}> Nome do Produto </RadioLab>
      </RadioCont>

      <RadioCont>
      <RadioButton
      color={appInfo.cor_principal}
      value="CODBARRA"
      status={ searchtype === 'CODBARRA' ? 'checked' : 'unchecked' }
      onPress={() => setSearchtype('CODBARRA') } />
      <RadioLab style={{color: appInfo.cor_principal }}> Codbarra do Produto </RadioLab>
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

          {produtos.isSuccess? <FlashList
        onEndReached={loadMoreProdutos}
        estimatedItemSize={200}
        onEndReachedThreshold={0.5}
        ListFooterComponent={produtos.isFetching ? renderSpinner : null}
        data={(produtos.data.pages.map((page) => page.data)).flat()}            
        keyExtractor={item => item.CODIGO}
        renderItem={({ item }) => {
          return <DataContent style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}>
               
          <DataLimiter>
          <DataLab style={{color: appInfo.cor_principal }}> Codigo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.CODIGO} </DataReplyLab> </DataLab>
          <DataLab style={{color: appInfo.cor_principal }}> Produto: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.PRODUTO} </DataReplyLab> </DataLab>
          <DataLab style={{color: appInfo.cor_principal }}> Preço: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.PRECOVENDA} </DataReplyLab> </DataLab>
          </DataLimiter>

          <IconsContent>
          <IconContent style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('ShowPreco', {cod: item.CODIGO})}>
          <FontAwesomeIcon icon={faEye} size={ 21 } color={ appInfo.cor_de_fundo } />  
          </IconContent>
          {userPermissions.includes('EditarProduto')? 
          <IconContent style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('EditPreco', { cod: item.CODIGO })}>
          <FontAwesomeIcon icon={faPen} size={ 15 } color={ appInfo.cor_de_fundo } />  
          </IconContent> : null }
          </IconsContent>

          </DataContent>;
        }}/> : <View style={{flex:1,
          backgroundColor: appInfo.cor_de_fundo,
          alignItems:'center',
          justifyContent:'center', }}>   
          <ActivityIndicator size="large" color={appInfo.cor_segundaria} />
          </View>  }
          
          </Content> 

          <BackContainer style={{ backgroundColor: appInfo.cor_de_fundo }}>
            <BackContent style={{ backgroundColor: appInfo.cor_de_fundo }} onPress={() => navigation.navigate('Start')}>             
            <FontAwesomeIcon icon={faHouse} size={ 52 } color={ appInfo.cor_principal }/>
            </BackContent>
            <BackContent  style={{ backgroundColor: appInfo.cor_de_fundo }} onPress={() => {LogOut(); navigation.navigate('Start')}}>             
            <FontAwesomeIcon icon={faRightFromBracket} size={ 52 } color={ appInfo.cor_principal }/>
            </BackContent>
          </BackContainer>
          
        </Container>
    )
          }
  }

  export default Preco;
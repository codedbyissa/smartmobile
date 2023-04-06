import React, { useContext, useState } from "react";
import { ActivityIndicator, View, Modal } from 'react-native';
import { Container, Content, BackContainer, BackContent, TopContainer, SearchInput, 
  ContainerSearch, Filter, DataContent, DataLab, DataReplyLab, DataLimiter, IconsContent, 
  IconContent } from "./../../../styles/crud";
import { TopContainerModal, SearchInputModal, ContainerFilterModal, FilterContent, FilterForm,
   Close, BackModal, DataInput } from "./../../../styles/atendimento/list";
import { ContainerControlCliente, ContainerLabCliente, ContainerSelectCliente, InputLab,
   LabSelect, SetSelect, ContainerModal, BackLab, DataView, Selected } from "./../../../styles/atendimento";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket, faHouse, faArrowUpAZ, faMagnifyingGlass, 
  faPen, faCircleXmark, faCaretDown, faCircleCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { QueryClient, useQuery, useInfiniteQuery, QueryClientProvider } from "react-query";
import { useNavigation } from '@react-navigation/native';
import { AuthenticationContext } from '../../../context/authentication';
import { FlashList } from "@shopify/flash-list";
import { ConfigContext } from '../../../context/config';

function ReaberturaOrcamentos() {
  
  return (  
    <QueryClientProvider client={queryClient}>
      <Conteudo/>
    </QueryClientProvider>
   
  )
}

const queryClient = new QueryClient()

// checar se a api esta online

async function get(baseUrl) {
  const response = await fetch(
    `http://${baseUrl}`
  );

   return response.json(); 

}

// listar orcamentos

async function getOrcamentos([pageParam, searchParam, cliente, data, baseUrl, codvendedor]) {
  const response = await fetch(
    `http://${baseUrl}/C000056?codvendedor=${codvendedor}&s=${searchParam}&c=${cliente}&d=${data}&page=${pageParam}`
  );
   return response.json(); 
}

// listar clientes

async function getClientes([pageParam, searchParam, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000007?s=${searchParam}&page=${pageParam}`
  );

   return response.json(); 

}

function Conteudo() {
  const { LogOut, user, userPermissions } = useContext(AuthenticationContext)
  const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)
  const navigation = useNavigation(); // navigation
  const [searchText, setSearchText] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [clientModal, setClientModal] = useState(false); // modal clientes
  const [selectedCliente, setSelectedCliente] = useState({cod: '', cliente: '', }); // cliente selecionada
  const [data, setData] = useState('');
  const [searchClient, setSearchClient] = useState(''); // buscar clientes

  const codvendedor = userPermissions.includes('PermissãoGeralVendas')? 'geral' : user.CODIGO;

        // query checar se a api esta online
        const check = useQuery( 
          ["check", baseUrl], () => get(baseUrl), {
            staleTime: 5000, cacheTime: 4000
          },
        );
  
        // query orcamentos
        const orcamentos = useInfiniteQuery(    
          ["orcamentos", searchText, selectedCliente.cod, data, baseUrl, codvendedor ], ({ pageParam = 1 }) => getOrcamentos([pageParam, searchText, selectedCliente.cod, data, baseUrl, codvendedor]), 
          { getNextPageParam: (page) => (page.current_page === page.last_page ? null : page.current_page + 1 ) },
          {  staleTime: 5000, cacheTime: 4000 },
        );

        // load orcamentos
        const loadMoreOrcamentos = () => {  if (orcamentos.hasNextPage) {  orcamentos.fetchNextPage();  }  };

        
        // query clientes
        const clientes = useInfiniteQuery(    
          ["clientes", searchClient, baseUrl ], ({ pageParam = 1 }) => getClientes([pageParam, searchClient, baseUrl]), 
          { getNextPageParam: (page) => (page.current_page === page.last_page ? null : page.current_page + 1 ) },
          {  staleTime: 5000, cacheTime: 4000 },
        );

        // load clientes
        const loadMoreClientes = () => {  if (clientes.hasNextPage) {  clientes.fetchNextPage();  }  };

        const renderSpinner = () => { return <View style={{flex:1,
        backgroundColor:appInfo.cor_de_fundo,
        alignItems:'center',
        justifyContent:'center', }}>   
        <ActivityIndicator size="large" color={ appInfo.cor_segundaria } />
        </View>;  };

      if (check.isLoading) {
        return (
          <View style={{flex:1,
          backgroundColor:appInfo.cor_de_fundo,
          alignItems:'center',
          justifyContent:'center', }}>   
          <ActivityIndicator size="large" color={ appInfo.cor_segundaria } />
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

       // console.log(selectedCliente.cod)
        
    return (
        <Container style={{ backgroundColor: appInfo.cor_de_fundo }}>     
          <TopContainer style={{ backgroundColor: appInfo.cor_de_fundo }}>
          <ContainerSearch style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={ 25 } color={ appInfo.cor_principal }/>
          </ContainerSearch>                       
          <SearchInput
          style={{ backgroundColor: appInfo.cor_de_fundo, width: '60%', color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
          placeholder='Buscar Orcamentos'
          placeholderTextColor={appInfo.cor_principal}
          name={searchText}
          onChangeText={(t) => setSearchText(t)}/>
          <Filter style={{ backgroundColor: appInfo.cor_de_fundo, borderColor: appInfo.cor_principal }} onPress={() => setFilterModal(true)}>                               
          <FontAwesomeIcon icon={faArrowUpAZ}  size={ 25 } color={ appInfo.cor_principal }/>
          </Filter>                             
          </TopContainer>
            
          <Content>

          {orcamentos.isSuccess? <FlashList
        onEndReached={loadMoreOrcamentos}
        estimatedItemSize={200}
        onEndReachedThreshold={0.5}
        ListFooterComponent={orcamentos.isFetching ? renderSpinner : null}
        data={(orcamentos.data.pages.map((page) => page.data)).flat()}    
        keyExtractor={(item) => item.CODIGO}    
        renderItem={({ item }) => {
          return <View>
          {item.cliente? <DataContent style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}>
               
          <DataLimiter>
          <DataLab style={{color: appInfo.cor_principal }}> Codigo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.CODIGO} </DataReplyLab> </DataLab>
          <DataLab style={{color: appInfo.cor_principal }}> Cliente: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.cliente.NOME} {item.cliente.APELIDO} </DataReplyLab> </DataLab> 
          <DataLab style={{color: appInfo.cor_principal }}> Data: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.DATA} </DataReplyLab> </DataLab>
          </DataLimiter>

          <IconsContent>
          <IconContent style={{backgroundColor: appInfo.cor_principal }} onPress={() => navigation.navigate('ReabrirOrcamento', { cod: item.CODIGO, })}>
          <FontAwesomeIcon icon={faPen} size={ 15 } color={ appInfo.cor_de_fundo } />
          </IconContent>
          </IconsContent>

          </DataContent> : null}
          </View>;
        }}/> : <View style={{flex:1,
          backgroundColor: appInfo.cor_de_fundo,
          alignItems:'center',
          justifyContent:'center', }}>   
          <ActivityIndicator size="large" color={ appInfo.cor_segundaria } />
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

          <Modal         
      visible={filterModal}
      statusBarTranslucent={true} 
      transparent={true}
      animationType="fade"
      onRequestClose={() => setFilterModal(false)}>
        <ContainerFilterModal>
      
        <FilterContent style={{ backgroundColor: appInfo.cor_de_fundo }}>

        <Close onPress={() => setFilterModal(false)}>       
        <FontAwesomeIcon icon={faCircleXmark}  size={ 25 } color={ '#e95361' }/>
        </Close>
        
        <FilterForm>

        <ContainerControlCliente>
        <ContainerLabCliente>
        <InputLab style={{ color: appInfo.cor_principal }}> Cliente </InputLab>
        </ContainerLabCliente>         
      <ContainerSelectCliente style={{ borderColor: appInfo.cor_principal }} onPress={() => setClientModal(true)}>
        
     
      {selectedCliente.cod == ''?
      <LabSelect style={{ color: appInfo.cor_principal }}> Selecione por favor </LabSelect> : 
      <LabSelect style={{ color: appInfo.cor_principal }}> {selectedCliente.cliente} </LabSelect> } 
      
      <SetSelect>
      <FontAwesomeIcon icon={faCaretDown}  size={ 15 } color={ appInfo.cor_principal }/>
      </SetSelect>


        </ContainerSelectCliente>

        </ContainerControlCliente>
        <ContainerControlCliente>
        <ContainerLabCliente >
        <InputLab style={{ color: appInfo.cor_principal }}> Data </InputLab>
        </ContainerLabCliente> 
           
        <DataInput style={{ color: appInfo.cor_principal, borderColor: appInfo.cor_principal }} onChangeText={(t) => setData(t)}
        placeholder='dd.mm.aaaa'
        placeholderTextColor={appInfo.cor_principal}>{data}</DataInput> 
       
        </ContainerControlCliente>

        </FilterForm>

        </FilterContent>

        </ContainerFilterModal> 

      </Modal>

      <Modal
      statusBarTranslucent={true}        
      visible={clientModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setClientModal(false)}>

      <ContainerModal style={{ backgroundColor: appInfo.cor_de_fundo }}>

      
      <TopContainerModal style={{ backgroundColor: appInfo.cor_de_fundo }}>
      <ContainerSearch style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}>
      <FontAwesomeIcon icon={faMagnifyingGlass} size={ 25 } color={ appInfo.cor_principal }/>
      </ContainerSearch>                       
      <SearchInput
      style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
      placeholder='Buscar Cliente'
      placeholderTextColor={appInfo.cor_principal}
      name={searchClient}
      onChangeText={(t) => setSearchClient(t)}/>                          
      </TopContainerModal>
      
      <DataView> 

            <View key={0} style={{ margin: 10 }}>

    <DataLab style={{color: appInfo.cor_principal }}> Selecione por favor </DataLab>

    {selectedCliente.cod == ''? 
    <Selected>
    <FontAwesomeIcon icon={faCircleCheck}  size={ 35 } color={ appInfo.cor_segundaria }/>       
    </Selected> :
    <Selected onPress={() => setSelectedCliente({cod: '', cliente: '', })}>
    <FontAwesomeIcon icon={faCircle}  size={ 35 } color={ '#c7c7c752' }/>       
    </Selected>
    }

    </View> 

   {clientes.isSuccess? <FlashList
        onEndReached={loadMoreClientes}
        estimatedItemSize={200}
        onEndReachedThreshold={0.5}
        ListFooterComponent={clientes.isFetching ? renderSpinner : null}
        data={(clientes.data.pages.map((page) => page.data)).flat()}    
        keyExtractor={(item) => item.CODIGO}    
        renderItem={({ item }) => {
          return <View style={{ margin: 10 }}>
          <DataLab style={{color: appInfo.cor_principal }}> Codigo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.CODIGO} </DataReplyLab> </DataLab>
          <DataLab style={{color: appInfo.cor_principal }}> Cliente: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.NOME} {item.APELIDO} </DataReplyLab> </DataLab>
          <DataLab style={{color: appInfo.cor_principal }}> CPF: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.CPF} </DataReplyLab> </DataLab>
        
        {item.CODIGO == selectedCliente.cod? <Selected>
        <FontAwesomeIcon icon={faCircleCheck}  size={ 35 } color={ appInfo.cor_segundaria }/>       
        </Selected> : <Selected onPress={() => setSelectedCliente({cod: item.CODIGO, cliente: item.NOME + ' ' + item.APELIDO, })}>
        <FontAwesomeIcon icon={faCircle}  size={ 35 } color={ '#c7c7c752' }/>       
        </Selected> }
        </View>;
        }}/> : <View style={{flex:1,
          backgroundColor: appInfo.cor_de_fundo,
          alignItems:'center',
          justifyContent:'center', }}>   
          <ActivityIndicator size="large" color={ appInfo.cor_segundaria } />
          </View>  }

    </DataView>

    </ContainerModal>       
    <BackModal style={{backgroundColor: appInfo.cor_principal }} onPress={() => setClientModal(false)}>
    <BackLab style={{ color: appInfo.cor_de_fundo }}> Voltar </BackLab>
    </BackModal>

    </Modal>
          
        </Container>
    )
      }
  }

  export default ReaberturaOrcamentos;
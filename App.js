import React, {useContext} from 'react';
import { View, ActivityIndicator } from 'react-native';
import { IconContent } from "./src/app/styles/crud";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faGear } from "@fortawesome/free-solid-svg-icons";

import Start from './src/app/screens/inicio/start';
import Config from './src/app/config/config';
import ConfigApiUrl from './src/app/config/configApiUrl';

import Preco from './src/app/screens/preco';
import CreatePreco from './src/app/screens/preco/create';
import EditPreco from './src/app/screens/preco/edit';
import ShowPreco from './src/app/screens/preco/show';

import Cliente from './src/app/screens/cliente';
import CreateCliente from './src/app/screens/cliente/create';
import EditCliente from './src/app/screens/cliente/edit';
import ShowCliente from './src/app/screens/cliente/show';

import Atendimento from './src/app/screens/vendas/atendimento';
import Vendas from './src/app/screens/vendas/vendas';
import ShowVendas from './src/app/screens/vendas/show';
import Reabertura from './src/app/screens/vendas/reabertura';
import ReabrirVenda from './src/app/screens/vendas/reabertura/reabrir';

import AtendimentoOrcamentos from './src/app/screens/orcamentos/atendimento';
import Orcamentos from './src/app/screens/orcamentos/orcamentos';
import ShowOrcamento from './src/app/screens/orcamentos/show';
import ReaberturaOrcamentos from './src/app/screens/orcamentos/reabertura';
import ReabrirOrcamento from './src/app/screens/orcamentos/reabertura/reabrir';
import { AuthenticationProvider } from './src/app/context/authentication';
import { AuthenticationContext } from './src/app/context/authentication'
import { ConfigProvider } from './src/app/context/config';
import { ConfigContext } from './src/app/context/config';

function App() {
  
  return ( 
    <ConfigProvider>
    <AuthenticationProvider>
      <Conteudo/>     
    </AuthenticationProvider>
    </ConfigProvider>
   
  )
}

const Stack = createNativeStackNavigator();

function Conteudo() {

  const { userPermissions, loading } = useContext(AuthenticationContext)
  const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)

  if(baseUrl == '') {

    return (
      
      <NavigationContainer>
        <ConfigApiUrl/>
      </NavigationContainer>

    );

  }

  if(baseUrl !== '') {

    if(loading) {

      return(
        <View style={{flex:1,
          backgroundColor: appInfo.cor_de_fundo,
          alignItems:'center',
          justifyContent:'center', }}>   
          <ActivityIndicator size="large" color={appInfo.cor_segundaria} />
          </View>
      )
    }

  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
        headerStyle: {
          backgroundColor: appInfo.cor_principal,
        },
        headerTintColor: appInfo.cor_de_fundo,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} initialRouteName="Start"> 

       {/* INICIO */}

       <Stack.Screen name="Start" component={Start} options={({ navigation }) => {  return { title: appInfo.nome_do_app, headerRight: () => (<IconContent onPress={() => navigation.navigate('Config')}>
       <FontAwesomeIcon icon={faGear} size={ 25 } color={ appInfo.cor_de_fundo } />  
       </IconContent>) } }}/>

       {/* CONFIG */}

       <Stack.Screen name="Config" component={Config} options={{ title: 'Configurações' }}/>

       {/* PREÇO */}

       <Stack.Screen name="Preco" component={Preco} options={({ navigation }) => { 
        
        if(userPermissions.includes('CadastrarProduto')) { return { title: 'Produtos', headerRight: () => (
        
       <IconContent onPress={() => navigation.navigate('CreatePreco')}>
       <FontAwesomeIcon icon={faPlus} size={ 25 } color={ appInfo.cor_de_fundo } />  
       </IconContent> 
       
       
       ) }}

       if(!userPermissions.includes('CadastrarProduto')) { return { title: 'Produtos' }}
       
       
       }}/>
       <Stack.Screen name="ShowPreco" component={ShowPreco} options={{ title: 'Visualizar Produto' }}/>
       <Stack.Screen name="CreatePreco" component={CreatePreco} options={{ title: 'Cadastrar Produto' }}/>
       <Stack.Screen name="EditPreco" component={EditPreco} options={{ title: 'Editar Produto' }}/>

       {/* CLIENTE */}

       <Stack.Screen name="Cliente" component={Cliente} options={({ navigation }) => {  
        
        
        if(userPermissions.includes('CadastrarCliente')) { return { title: 'Clientes', headerRight: () => (
       
       <IconContent onPress={() => navigation.navigate('CreateCliente')}>
       <FontAwesomeIcon icon={faPlus} size={ 25 } color={ appInfo.cor_de_fundo } />  
       </IconContent> 
      
       ) } } 

       if(!userPermissions.includes('CadastrarCliente')) { return { title: 'Clientes' }}
       
       
       }}/>
       <Stack.Screen name="ShowCliente" component={ShowCliente} options={{ title: 'Visualizar Cliente' }}/>
       <Stack.Screen name="CreateCliente" component={CreateCliente}  options={{ title: 'Cadastrar Cliente' }}/>
       <Stack.Screen name="EditCliente" component={EditCliente} options={{ title: 'Editar Cliente' }}/>

       {/* PRE-VENDAS */}
    
       <Stack.Screen name="Atendimento" component={Atendimento} options={{ title: 'Atendimento' }}/>
       <Stack.Screen name="Vendas" component={Vendas} options={{ title: 'Suas Vendas' }}/>
       <Stack.Screen name="ShowVendas" component={ShowVendas} options={{ title: 'Visualizar Venda' }}/>
       <Stack.Screen name="Reabertura" component={Reabertura} options={{ title: 'Reabertura' }}/>
       <Stack.Screen name="ReabrirVenda" component={ReabrirVenda} options={{ title: 'Reabrir Venda' }}/>

       {/* ORÇAMENTOS */}

       <Stack.Screen name="AtendimentoOrcamentos" component={AtendimentoOrcamentos} options={{ title: 'Atendimento (Orçamentos)' }}/>
       <Stack.Screen name="Orcamentos" component={Orcamentos} options={{ title: 'Seus Orçamentos' }}/>
       <Stack.Screen name="ShowOrcamento" component={ShowOrcamento} options={{ title: 'Visualizar Orçamento' }}/>
       <Stack.Screen name="ReaberturaOrcamentos" component={ReaberturaOrcamentos} options={{ title: 'Reabertura (Orçamentos)' }}/>
       <Stack.Screen name="ReabrirOrcamento" component={ReabrirOrcamento} options={{ title: 'Reabrir Orçamento' }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

export default App;

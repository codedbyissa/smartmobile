import * as Clipboard from 'expo-clipboard';
import React, { useState, useContext } from "react";
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { QueryClient, useQuery, useInfiniteQuery, QueryClientProvider } from "react-query";
import { Container, CartContent, DataLab, DataLimiter, Copy, CopyLab, CopyConteiner, DataReplyLab, Copied, CopiedLab, SetSelect, Select } from "./../../styles/atendimento/show";
import { faCaretDown, faCaretUp, faCircle ,faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ProductContent, DataLabC, DataReplyLabC } from "../../styles/atendimento";
import { ScrollView } from 'react-native-gesture-handler';
import { FlashList } from "@shopify/flash-list";
import { ConfigContext } from '../../context/config';


function ShowVendas({route}) {
  
  return (  
    <QueryClientProvider client={queryClient}>
      <Conteudo cod={route.params.cod}/>
    </QueryClientProvider>
   
  )
}

const queryClient = new QueryClient()

async function getVendas([cod, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000074/${cod}`
  );

   return response.json(); 

}

const Conteudo = (props) => {

  const [alertCopy, setAlertCopy] = useState(false);
  const [alertMensag, setAlertMensag] = useState('');
  const [viewProds, setViewProds] = useState(false);
  const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)

  const vendas = useQuery( 
    ["vendas", props.cod, baseUrl], () => getVendas([props.cod, baseUrl]), {
      staleTime: 5000, cacheTime: 4000
    },
  );

  const copyItem = ([info, data]) => {
    
    setAlertMensag(info)
    Clipboard.setString(''+data+'')
    setAlertCopy(true)

    setTimeout(() => {
      setAlertCopy(false);
    }, 2000);
       
  };

  const copy = () => {

    setAlertMensag('')
    Clipboard.setString('Código : ' + vendas.data.CODIGO + 
    '\n\nCliente : ' +  vendas.data.cliente.NOME + ' ' + vendas.data.cliente.APELIDO + 
    '\n\nData : ' + vendas.data.DATA +
    '\n\nObs : ' + vendas.data.OBS + 
    '\n\nSubTotal : ' + vendas.data.SUBTOTAL + 
    '\n\nDesconto : ' + vendas.data.DESCONTO + 
    '\n\nAcrescimo : ' + vendas.data.ACRESCIMO +		
    '\n\nTotal : ' + vendas.data.TOTAL ) 
    setAlertCopy(true)

    setTimeout(() => {
      setAlertCopy(false);
    }, 2000);      
  };

  if (vendas.isLoading) {
    return (
      <View style={{flex:1,
      backgroundColor: appInfo.cor_de_fundo,
      alignItems:'center',
      justifyContent:'center', }}>   
      <ActivityIndicator size="large" color={ appInfo.cor_segundaria } />
      </View>
    )
  }
  if (vendas.isError) {
    return (
      <View style={{flex:1,
        backgroundColor: appInfo.cor_de_fundo,
        alignItems:'center',
        justifyContent:'center', }}>   
        <ActivityIndicator size="large" color={appInfo.cor_segundaria} />
      <DataLab style={{color: appInfo.cor_principal }}> Tente Novamente </DataLab>
      </View>
    )

  }
  if (vendas.isSuccess) {

    //console.log(vendas.data)
    
return (
    <Container style={{ backgroundColor: appInfo.cor_de_fundo }}>

      <ScrollView>

      <CopyConteiner>
      <Copy style={{backgroundColor: appInfo.cor_principal }} onPress={() => copy()}>
      <FontAwesomeIcon icon={faCopy} size={ 25 } color={ appInfo.cor_de_fundo }/>
      </Copy>
      </CopyConteiner>

    <DataLimiter>

    <TouchableOpacity onPress={() => copyItem(['Código', vendas.data.CODIGO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Código: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {vendas.data.CODIGO} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Cliente', vendas.data.cliente.NOME + ' ' + vendas.data.cliente.APELIDO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Cliente: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {vendas.data.cliente.NOME} {vendas.data.cliente.APELIDO} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Data', vendas.data.DATA])}>
    <DataLab style={{color: appInfo.cor_principal }}> Data: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {vendas.data.DATA} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    {vendas.data.OBS == null || vendas.data.OBS == ""? null :
    <TouchableOpacity onPress={() => copyItem(['Obs', vendas.data.OBS])}>
    <DataLab style={{color: appInfo.cor_principal }}> Obs: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {vendas.data.OBS} </DataReplyLab> </DataLab>
    </TouchableOpacity> }

    <TouchableOpacity onPress={() => copyItem(['Subtotal', vendas.data.SUBTOTAL])}>
    <DataLab style={{color: appInfo.cor_principal }}> Subtotal: <DataReplyLab style={{color: appInfo.cor_segundaria }}> R$ {vendas.data.SUBTOTAL} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Desconto', vendas.data.DESCONTO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Desconto: <DataReplyLab style={{color: appInfo.cor_segundaria }}> R$ -{vendas.data.DESCONTO} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Acrescimo', vendas.data.ACRESCIMO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Acrescimo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> R$ +{vendas.data.ACRESCIMO} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Total', vendas.data.TOTAL])}>
    <DataLab style={{color: appInfo.cor_principal }}> Total: <DataReplyLab style={{color: appInfo.cor_segundaria }}> R$ {vendas.data.TOTAL} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    
    <View>
    { viewProds == false?
    <Select onPress={() => setViewProds(true)}>
    <DataLab style={{color: appInfo.cor_principal }}> Conteudo da venda </DataLab>
    <SetSelect>
    
    <FontAwesomeIcon icon={faCaretDown} size={ 15 } color={ appInfo.cor_segundaria } /> 
    </SetSelect>
    </Select> :
    <Select onPress={() => setViewProds(false)}>
    <DataLab style={{color: appInfo.cor_principal }}> Conteudo da venda </DataLab>
    <SetSelect>
    
    <FontAwesomeIcon icon={faCaretUp} size={ 15 } color={ appInfo.cor_segundaria } /> 
    </SetSelect>
    </Select> }

  { viewProds == true? <CartContent>


        <FlashList
        estimatedItemSize={200}
        data={vendas.data.vendas} 
        keyExtractor={(item) => item.CODIGO}    
        renderItem={({ item }) => {       
        return <View>

        <ProductContent style={{backgroundColor: '#0000006b' }}>
        <DataLabC style={{color: appInfo.cor_principal }}> Produto: <DataReplyLabC style={{color: appInfo.cor_segundaria }}> {item.produto.PRODUTO} </DataReplyLabC> </DataLabC>
        <DataLabC style={{color: appInfo.cor_principal }}> Setor: <DataReplyLabC style={{color: appInfo.cor_segundaria }}> {item.setor.SETOR} </DataReplyLabC> </DataLabC>
        <DataLabC style={{color: appInfo.cor_principal }}> Quantidade: <DataReplyLabC style={{color: appInfo.cor_segundaria }}> {item.QTDE} </DataReplyLabC> </DataLabC>
        <DataLabC style={{color: appInfo.cor_principal }}> Desconto: <DataReplyLabC style={{color: appInfo.cor_segundaria }}> R$ -{item.DESCONTO} </DataReplyLabC> </DataLabC>
        <DataLabC style={{color: appInfo.cor_principal }}> Acrescimo: <DataReplyLabC style={{color: appInfo.cor_segundaria }}> R$ +{item.ACRESCIMO} </DataReplyLabC> </DataLabC>
        <DataLabC style={{color: appInfo.cor_principal }}> Total: <DataReplyLabC style={{color: appInfo.cor_segundaria }}> {item.TOTAL} </DataReplyLabC> </DataLabC>
        </ProductContent>

        </View> }}/>


    </CartContent> : null }
    </View>

    </DataLimiter>

    </ScrollView>

    
     {alertCopy == true?
      <Copied style={{backgroundColor: appInfo.cor_principal }}>
       <CopiedLab style={{ color: appInfo.cor_de_fundo }}> {alertMensag} Copiado </CopiedLab> 
      </Copied> : null }
    

    </Container>
 
    )
  }
}

export default ShowVendas;
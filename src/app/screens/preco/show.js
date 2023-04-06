import * as Clipboard from 'expo-clipboard';
import React, { useContext, useState } from "react";
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import { Container, DataLab, DataLimiter, Copy, CopyConteiner, DataReplyLab, Copied, CopiedLab } from "./../../styles/crud/show";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ConfigContext } from '../../context/config';
import { ScrollView } from 'react-native-gesture-handler';

function ShowPreco({route}) {
  
  return (  
    <QueryClientProvider client={queryClient}>
      <Conteudo cod={route.params.cod}/>
    </QueryClientProvider>
   
  )
}

const queryClient = new QueryClient()

async function getProd([cod, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000025/${cod}`
  );

   return response.json(); 

}

const Conteudo = (props) => {

  const [alertCopy, setAlertCopy] = useState(false);
  const [alertMensag, setAlertMensag] = useState('');
  const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)

  const produto = useQuery( 
    ["produto", props.cod, baseUrl], () => getProd([props.cod, baseUrl]), {
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
    Clipboard.setString('Código : ' + produto.data.CODIGO +
    '\n\n Produto : ' + produto.data.PRODUTO +
    '\n\n CodGrupo : ' + produto.data.CODGRUPO +
    '\n\n CodSubGrupo : ' + produto.data.CODSUBGRUPO +
    '\n\n CodFornecedor : ' + produto.data.CODFORNECEDOR +
    '\n\n CodMarca : ' + produto.data.CODMARCA +
    '\n\n Data da Ultima Compra : ' + produto.data.DATA_ULTIMACOMPRA +
    '\n\n Preço de Custo : ' + produto.data.PRECOCUSTO +
    '\n\n Preço de Venda : ' + produto.data.PRECOVENDA +
    '\n\n Data da Ultima Venda : ' + produto.data.DATA_ULTIMAVENDA +
    '\n\n Aplicação : ' + produto.data.APLICACAO +
    '\n\n Localização : ' + produto.data.LOCALICAZAO +
    '\n\n Foto : ' + produto.data.FOTO +
    '\n\n CST : ' + produto.data.CST +
    '\n\n Classificação Fiscal : ' + produto.data.CLASSIFICACAO_FISCAL +
    '\n\n Aliquota : ' + produto.data.ALIQUOTA +
    '\n\n Situação : ' + produto.data.SITUACAO +
    '\n\n Preço de Venda(1) : ' + produto.data.PRECOVENDA1 +
    '\n\n Preço de Venda(2) : ' + produto.data.PRECOVENDA2 +
    '\n\n Referencia do Fornecedor : ' +  produto.data.REFERENCIA_FORNECEDOR +
    '\n\n CSOSN : ' + produto.data.CSOSN +
    '\n\n CEST : ' + produto.data.CEST + 
    '\n\n ind_cfop_nfce : ' + produto.data.IND_CFOP_NFCE + 
    '\n\n CodBarra : ' + produto.data.CODBARRA + 
    '\n\n Unidade : ' + produto.data.UNIDADE +		
    '\n\n Ecommerce : ' + produto.data.ECOMMERCE ) 
    setAlertCopy(true)

    setTimeout(() => {
      setAlertCopy(false);
    }, 4000);      
  };

  if (produto.isLoading) {
    return (
      <View style={{flex:1,
        backgroundColor: appInfo.cor_de_fundo,
        alignItems:'center',
        justifyContent:'center', }}>   
      <ActivityIndicator size="large" color={appInfo.cor_segundaria} />
      </View>
    )
  }
  if (produto.isError) {
    return (
      <View style={{flex:1,
        backgroundColor: appInfo.cor_de_fundo,
        alignItems:'center',
        justifyContent:'center', }}>
      <DataLab style={{color: appInfo.cor_principal }}> Tente Novamente </DataLab>
      </View>
    )

  }
  if (produto.isSuccess) {
    
return (
    <Container style={{ backgroundColor: appInfo.cor_de_fundo }}>

      <ScrollView>

      <CopyConteiner>
      <Copy style={{backgroundColor: appInfo.cor_principal }} onPress={() => copy()}>
      <FontAwesomeIcon icon={faCopy} size={ 25 } color={ appInfo.cor_de_fundo }/>
      </Copy>
      </CopyConteiner>

    <DataLimiter>

    <TouchableOpacity onPress={() => copyItem(['Código', produto.data.CODIGO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Código: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.CODIGO} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Produto', produto.data.PRODUTO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Produto: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.PRODUTO} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['CodGrupo', produto.data.CODGRUPO])}>
    <DataLab style={{color: appInfo.cor_principal }}> CodGrupo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.CODGRUPO} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['CodSubGrupo', produto.data.CODSUBGRUPO])}>
    <DataLab style={{color: appInfo.cor_principal }}> CodSubGrupo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.CODSUBGRUPO} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['CodFornecedor', produto.data.CODFORNECEDOR])}>
    <DataLab style={{color: appInfo.cor_principal }}> CodFornecedor: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.CODFORNECEDOR} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['CodMarca', produto.data.CODMARCA])}>
    <DataLab style={{color: appInfo.cor_principal }}> CodMarca: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.CODMARCA} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Data da Ultima Compra', produto.data.DATA_ULTIMACOMPRA])}>
    <DataLab style={{color: appInfo.cor_principal }}> Data da Ultima Compra: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.DATA_ULTIMACOMPRA} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Preço de Custo', produto.data.PRECOCUSTO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Preço de Custo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.PRECOCUSTO} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Preço de Venda', produto.data.PRECOVENDA])}>
    <DataLab style={{color: appInfo.cor_principal }}> Preço de Venda: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.PRECOVENDA} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Data da Ultima Venda', produto.data.DATA_ULTIMAVENDA])}>
    <DataLab style={{color: appInfo.cor_principal }}> Data da Ultima Venda: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.DATA_ULTIMAVENDA} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Aplicação', produto.data.APLICACAO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Aplicação: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.APLICACAO} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Localização', produto.data.LOCALICAZAO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Localização: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.LOCALICAZAO} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Foto', produto.data.FOTO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Foto: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.FOTO} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['CST', produto.data.CST])}>
    <DataLab style={{color: appInfo.cor_principal }}> CST: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.CST} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Classificação Fiscal', produto.data.CLASSIFICACAO_FISCAL])}>
    <DataLab style={{color: appInfo.cor_principal }}> Classificação Fiscal: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.CLASSIFICACAO_FISCAL} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Aliquota', produto.data.ALIQUOTA])}>
    <DataLab style={{color: appInfo.cor_principal }}> Aliquota: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.ALIQUOTA} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Situação', produto.data.SITUACAO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Situação: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.SITUACAO} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Preço de Venda(2)', produto.data.PRECOVENDA1])}>
    <DataLab style={{color: appInfo.cor_principal }}> Preço de Venda(1): <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.PRECOVENDA1} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Preço de Venda(2)', produto.data.PRECOVENDA2])}>
    <DataLab style={{color: appInfo.cor_principal }}> Preço de Venda(2): <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.PRECOVENDA2} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Referencia do Fornecedor', produto.data.REFERENCIA_FORNECEDOR])}>
    <DataLab style={{color: appInfo.cor_principal }}> Referencia do Fornecedor: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.REFERENCIA_FORNECEDOR} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['CSOSN', produto.data.CSOSN])}>
    <DataLab style={{color: appInfo.cor_principal }}> CSOSN: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.CSOSN} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['CEST', produto.data.CEST])}>
    <DataLab style={{color: appInfo.cor_principal }}> CEST: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.CEST} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['ind_cfop_nfce', produto.data.IND_CFOP_NFCE])}>
    <DataLab style={{color: appInfo.cor_principal }}> ind_cfop_nfce: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.IND_CFOP_NFCE} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['CodBarra', produto.data.CODBARRA])}>
    <DataLab style={{color: appInfo.cor_principal }}> CodBarra: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.CODBARRA} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Unidade', produto.data.UNIDADE])}>
    <DataLab style={{color: appInfo.cor_principal }}> Unidade: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.UNIDADE} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Ecommerce', produto.data.ECOMMERCE])}>
    <DataLab style={{color: appInfo.cor_principal }}> Ecommerce: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {produto.data.ECOMMERCE} </DataReplyLab> </DataLab>
    </TouchableOpacity> 


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

export default ShowPreco;
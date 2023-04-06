import * as Clipboard from 'expo-clipboard';
import React, { useContext, useState } from "react";
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import { Container, DataLab, DataLimiter, Copy, CopyConteiner, DataReplyLab, Copied, CopiedLab } from "./../../styles/crud/show";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ConfigContext } from '../../context/config';
import { ScrollView } from 'react-native-gesture-handler';

function ShowCliente({route}) {
  
  return (  
    <QueryClientProvider client={queryClient}>
      <Conteudo cod={route.params.cod}/>
    </QueryClientProvider>
   
  )
}

const queryClient = new QueryClient()

async function getClient([cod, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000007/${cod}`
  );

   return response.json(); 

}

const Conteudo = (props) => { 

  const [alertCopy, setAlertCopy] = useState(false);
  const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)
  const [alertMensag, setAlertMensag] = useState('');

  const cliente = useQuery( 
    ["cliente", props.cod, baseUrl], () => getClient([props.cod, baseUrl]), {
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
    Clipboard.setString('Código : ' + cliente.data.CODIGO +
    '\n\n Nome : ' + cliente.data.NOME +
    '\n\n Apelido : ' + cliente.data.APELIDO +
    '\n\n Numero : ' + cliente.data.NUMERO +
    '\n\n Complemento : ' + cliente.data.COMPLEMENTO +
    '\n\n Endereço : ' + cliente.data.ENDERECO +
    '\n\n Bairro : ' + cliente.data.BAIRRO +
    '\n\n Cidade : ' + cliente.data.CIDADE +
    '\n\n UF : ' + cliente.data.UF +
    '\n\n CEP : ' + cliente.data.CEP +
    '\n\n Tipo : ' + cliente.data.TIPO +
    '\n\n Situação : ' + cliente.data.SITUACAO +
    '\n\n Telefone(1) : ' + cliente.data.TELEFONE1 +
    '\n\n Telefone(2) : ' + cliente.data.TELEFONE2 +
    '\n\n Telefone(3) : ' + cliente.data.TELEFONE3 +
    '\n\n Celular : ' + cliente.data.CELULAR +
    '\n\n Email : ' + cliente.data.EMAIL +
    '\n\n RG : ' + cliente.data.RG +
    '\n\n CPF : ' + cliente.data.CPF +
    '\n\n Data de Cadastro : ' + cliente.data.DATA_CADASTRO +
    '\n\n OBS(1) : ' + cliente.data.OBS1 +
    '\n\n OBS(2) : ' + cliente.data.OBS2 +
    '\n\n OBS(3) : ' + cliente.data.OBS3 +
    '\n\n OBS(4) : ' + cliente.data.OBS4 +
    '\n\n OBS(5) : ' + cliente.data.OBS5+ 
    '\n\n OBS(6) : ' + cliente.data.OBS6 + 
    '\n\n Consumidor Final : ' + cliente.data.CONSUMIDOR_FINAL + 
    '\n\n ATB : ' + cliente.data.ATB ) 
    setAlertCopy(true)

    setTimeout(() => {
      setAlertCopy(false);
    }, 4000);      
  };

  if (cliente.isLoading) {
    return (
      <View style={{flex:1,
      backgroundColor: appInfo.cor_de_fundo,
      alignItems:'center',
      justifyContent:'center', }}>   
      <ActivityIndicator size="large" color={appInfo.cor_segundaria}  />
      </View>
    )
  }
  if (cliente.isError) {
    return (
      <View style={{flex:1,
      backgroundColor: appInfo.cor_de_fundo,
      alignItems:'center',
      justifyContent:'center', }}>
      <DataLab style={{color: appInfo.cor_principal }}> Tente Novamente </DataLab>
      </View>
    )

  }
  if (cliente.isSuccess) {

  return (
    <Container style={{ backgroundColor: appInfo.cor_de_fundo }}>

      <ScrollView>

      <CopyConteiner>
      <Copy style={{backgroundColor: appInfo.cor_principal }} onPress={() => copy()}>
      <FontAwesomeIcon icon={faCopy} size={ 25 } color={ appInfo.cor_de_fundo }/>
      </Copy>
      </CopyConteiner>

    <DataLimiter>

    <TouchableOpacity onPress={() => copyItem(['Código', cliente.data.CODIGO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Código: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.CODIGO} </DataReplyLab> </DataLab>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => copyItem(['Nome', cliente.data.NOME])}>
    <DataLab style={{color: appInfo.cor_principal }}> Nome: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.NOME} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Apelido', cliente.data.APELIDO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Apelido: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.APELIDO} </DataReplyLab> </DataLab>
    </TouchableOpacity>   

    <TouchableOpacity onPress={() => copyItem(['Numero', cliente.data.NUMERO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Numero: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.NUMERO} </DataReplyLab> </DataLab>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={() => copyItem(['Complemento', cliente.data.COMPLEMENTO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Complemento: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.COMPLEMENTO} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Endereço', cliente.data.ENDERECO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Endereço: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.ENDERECO} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Bairro', cliente.data.BAIRRO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Bairro: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.BAIRRO} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Cidade', cliente.data.CIDADE])}>
    <DataLab style={{color: appInfo.cor_principal }}> Cidade: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.CIDADE} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['UF', cliente.data.UF])}>
    <DataLab style={{color: appInfo.cor_principal }}> UF: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.UF} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['CEP', cliente.data.CEP])}>
    <DataLab style={{color: appInfo.cor_principal }}> CEP: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.CEP} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Tipo', cliente.data.TIPO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Tipo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.TIPO} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Situação', cliente.data.SITUACAO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Situação: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.SITUACAO} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Telefone(1)', cliente.data.TELEFONE1])}>
    <DataLab style={{color: appInfo.cor_principal }}> Telefone(1): <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.TELEFONE1} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Telefone(2)', cliente.data.TELEFONE2])}>
    <DataLab style={{color: appInfo.cor_principal }}> Telefone(2): <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.TELEFONE2} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Telefone(3)', cliente.data.TELEFONE3])}>
    <DataLab style={{color: appInfo.cor_principal }}> Telefone(3): <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.TELEFONE3} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Celular', cliente.data.CELULAR])}>
    <DataLab style={{color: appInfo.cor_principal }}> Celular: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.CELULAR} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Email', cliente.data.EMAIL])}>
    <DataLab style={{color: appInfo.cor_principal }}> Email: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.EMAIL} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['RG', cliente.data.RG])}>
    <DataLab style={{color: appInfo.cor_principal }}> RG: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.RG} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['CPF', cliente.data.CPF])}>
    <DataLab style={{color: appInfo.cor_principal }}> CPF: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.CPF} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Data de Cadastro', cliente.data.DATA_CADASTRO])}>
    <DataLab style={{color: appInfo.cor_principal }}> Data de Cadastro: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.DATA_CADASTRO} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['OBS(1)', cliente.data.OBS1])}>
    <DataLab style={{color: appInfo.cor_principal }}> OBS(1): <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.OBS1} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['OBS(2)', cliente.data.OBS2])}>
    <DataLab style={{color: appInfo.cor_principal }}> OBS(2): <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.OBS2} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['OBS(3)', cliente.data.OBS3])}>
    <DataLab style={{color: appInfo.cor_principal }}> OBS(3): <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.OBS3} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['OBS(4)', cliente.data.OBS4])}>
    <DataLab style={{color: appInfo.cor_principal }}> OBS(4): <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.OBS4} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['OBS(5)', cliente.data.OBS5])}>
    <DataLab style={{color: appInfo.cor_principal }}> OBS(5): <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.OBS5} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['OBS(6)', cliente.data.OBS6])}>
    <DataLab style={{color: appInfo.cor_principal }}> OBS(6): <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.OBS6} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['Consumidor Final', cliente.data.CONSUMIDOR_FINAL])}>
    <DataLab style={{color: appInfo.cor_principal }}> Consumidor Final: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.CONSUMIDOR_FINAL} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => copyItem(['ATB', cliente.data.ATB])}>
    <DataLab style={{color: appInfo.cor_principal }}> ATB: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {cliente.data.ATB} </DataReplyLab> </DataLab>
    </TouchableOpacity>

    </DataLimiter>

    </ScrollView>

    {alertCopy == true?
      <Copied style={{backgroundColor: appInfo.cor_principal }}>
       <CopiedLab style={{color: appInfo.cor_de_fundo }}> {alertMensag} Copiado </CopiedLab> 
      </Copied> : null }

    </Container>
  )
  }
}

export default ShowCliente;
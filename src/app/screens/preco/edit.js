import { Alert, ActivityIndicator, View } from 'react-native';
import React, { useContext, useState } from "react";
import { Container, Form, ContainerInput, Input, ContainerLab, InputLab, Save, SaveLab } from "./../../styles/crud/form";
import { ErrorMensage } from "./../../styles/atendimento";
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import { ConfigContext } from '../../context/config';
import { useNavigation } from '@react-navigation/native';

function EditPreco({route}) {
  
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

const navigation = useNavigation(); // navigation
const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)

  const produto = useQuery( 
    ["produto", props.cod, baseUrl], () => getProd([props.cod, baseUrl]), {
      staleTime: 5000, cacheTime: 4000
    },
  );

  const [produto_nome, setProduto_nome] = useState('');
  const [codgrupo, setCodgrupo] = useState('');
  const [codsubgrupo, setCodsubgrupo] = useState('');
  const [codfornecedor, setCodfornecedor] = useState('');
  const [codmarca, setCodmarca] = useState('');
  const [precocusto, setPrecocusto] = useState('');
  const [precovenda, setPrecovenda] = useState('');
  const [aplicacao, setAplicacao] = useState('');
  const [localicazao, setLocalicazao] = useState('');
  const [foto, setFoto] = useState('');
  const [cst, setCst] = useState('');
  const [classificacao_fiscal, setClassificacao_fiscal] = useState('');
  const [aliquota, setAliquota] = useState('');
  const [referencia_fornecedor, setReferencia_fornecedor] = useState('');
  const [csosn, setCsosn] = useState('');
  const [cest, setCest] = useState('');
  const [ind_cfop_nfce, setInd_cfop_nfce] = useState('');
  const [codbarra, setCodbarra] = useState('');
  const [unidade, setUnidade] = useState('');
  const [erroMensag, setErroMensag] = useState(false);

  const DefaultValueForm = () => { 

    produto.isSuccess? setProduto_nome(produto.data.PRODUTO) : null
    produto.isSuccess? setCodgrupo(produto.data.CODGRUPO) : null
    produto.isSuccess? setCodsubgrupo(produto.data.CODSUBGRUPO) : null
    produto.isSuccess? setCodfornecedor(produto.data.CODFORNECEDOR) : null
    produto.isSuccess? setCodmarca(produto.data.CODMARCA) : null
    produto.isSuccess? setPrecocusto(produto.data.PRECOCUSTO) : null
    produto.isSuccess? setPrecovenda(produto.data.PRECOVENDA) : null
    produto.isSuccess? setAplicacao(produto.data.APLICACAO) : null
    produto.isSuccess? setLocalicazao(produto.data.LOCALICAZAO) : null
    produto.isSuccess? setFoto(produto.data.FOTO) : null
    produto.isSuccess? setCst(produto.data.CST) : null
    produto.isSuccess? setClassificacao_fiscal(produto.data.CLASSIFICACAO_FISCAL) : null
    produto.isSuccess? setAliquota(produto.data.ALIQUOTA) : null
    produto.isSuccess? setReferencia_fornecedor(produto.data.REFERENCIA_FORNECEDOR) : null
    produto.isSuccess? setCsosn(produto.data.CSOSN) : null
    produto.isSuccess? setCest(produto.data.CEST) : null
    produto.isSuccess? setInd_cfop_nfce(produto.data.IND_CFOP_NFCE) : null
    produto.isSuccess? setCodbarra(produto.data.CODBARRA) : null
    produto.isSuccess? setUnidade(produto.data.UNIDADE) : null

  }



React.useEffect(() => {

  DefaultValueForm()
  
},[produto.isSuccess]);

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
      <DataLab style={{color: appInfo.cor_segundaria }}> Tente Novamente </DataLab>
      </View>
    )

  }
  if (produto.isSuccess) {

    const ToUpdate = () => {

      if(produto_nome == '') {
      
        setErroMensag(true)
  
      } else {
  
      fetch(`http://${baseUrl}/C000025/${props.cod}`, {
      method: 'PUT',
      body: JSON.stringify({
        PRODUTO: produto_nome,
        CODGRUPO: codgrupo,
        CODSUBGRUPO: codsubgrupo,
        CODFORNECEDOR: codfornecedor,
        CODMARCA: codmarca,
        PRECOCUSTO: precocusto,
        PRECOVENDA: precovenda,
        APLICACAO: aplicacao,
        LOCALICAZAO: localicazao,
        FOTO: foto,
        CST: cst,
        CLASSIFICACAO_FISCAL: classificacao_fiscal,
        ALIQUOTA: aliquota,
        REFERENCIA_FORNECEDOR: referencia_fornecedor,
        CSOSN: csosn,
        CEST: cest,
        IND_CFOP_NFCE: ind_cfop_nfce,
        CODBARRA: codbarra,
        UNIDADE: unidade
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      Alert.alert(
        "Atualização bem sucedida",
        'O produto foi atualizado com sucesso.',
        [ 
          { text: "Voltar", onPress: () => navigation.navigate('Preco') }
        ]
      );
    }
  }
    
    return (

      <Container style={{ backgroundColor: appInfo.cor_de_fundo }}>

      <Form contentContainerStyle={{ alignItems: 'center' }}>

      { erroMensag == true? <ErrorMensage> os campos destacados são obrigatórios </ErrorMensage> : null }

      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Produto { erroMensag == true? <ErrorMensage> * </ErrorMensage> : null } </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.PRODUTO}
        onChangeText={newText => setProduto_nome(newText)}
        placeholder='nome do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
      
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Código do Grupo </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.CODGRUPO}
        onChangeText={newText => setCodgrupo(newText)}
        placeholder='código do grupo do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>

      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Código do Subgrupo </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}       
        defaultValue={produto.data.CODSUBGRUPO}  
        onChangeText={newText => setCodsubgrupo(newText)}   
        placeholder='código do subgrupo do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>

      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Código do Fornecedor </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.CODFORNECEDOR}
        onChangeText={newText => setCodfornecedor(newText)}
        placeholder='código do fornecedor do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>

      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Código da Marca </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.CODMARCA}
        onChangeText={newText => setCodmarca(newText)}
        placeholder='código da marca do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
    
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Preço de custo </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.PRECOCUSTO}
        onChangeText={newText => setPrecocusto(newText)}
        placeholder='preço de custo do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
           
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Preço de Venda </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.PRECOVENDA}
        onChangeText={newText => setPrecovenda(newText)}
        placeholder='preço de venda do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
      
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Aplicação </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.APLICACAO}
        onChangeText={newText => setAplicacao(newText)}
        placeholder='aplicação do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
            
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Localização </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.LOCALICAZAO}
        onChangeText={newText => setLocalicazao(newText)}
        placeholder='localização do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
          
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Foto </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.FOTO}
        onChangeText={newText => setFoto(newText)}
        placeholder='foto do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
      
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> CST </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.CST}
        onChangeText={newText => setCst(newText)}
        placeholder='cst do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
            
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Classificação Fiscal </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.CLASSIFICACAO_FISCAL}
        onChangeText={newText => setClassificacao_fiscal(newText)}
        placeholder='classificação fiscal do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
      
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Aliquota </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.ALIQUOTA}
        onChangeText={newText => setAliquota(newText)}
        placeholder='aliquota do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
      
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Referencia do Fornecedor </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.REFERENCIA_FORNECEDOR}
        onChangeText={newText => setReferencia_fornecedor(newText)}
        placeholder='referencia_fornecedor do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
      
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> CSOSN </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.CSOSN}
        onChangeText={newText => setCsosn(newText)}
        placeholder='csosn do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
      
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> CEST </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.CEST}
        onChangeText={newText => setCest(newText)}
        placeholder='cest do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
      
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Ind_cfop_nfce </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.IND_CFOP_NFCE}
        onChangeText={newText => setInd_cfop_nfce(newText)}
        placeholder='ind_cfop_nfce do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
      
      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Código de Barras </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.CODBARRA}
        onChangeText={newText => setCodbarra(newText)}
        placeholder='código de barras do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>

      <ContainerInput>
      <ContainerLab>
      <InputLab style={{color: appInfo.cor_principal }}> Unidade </InputLab>
      </ContainerLab>
        <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
        defaultValue={produto.data.UNIDADE}
        onChangeText={newText => setUnidade(newText)}
        placeholder='unidade do produto'
        placeholderTextColor={appInfo.cor_principal}/>
      </ContainerInput>
      

      </Form>

        <Save style={{ backgroundColor: appInfo.cor_principal }} onPress={ToUpdate}>
        <SaveLab style={{color: appInfo.cor_de_fundo }}> Salvar </SaveLab>
      </Save>
                  
    </Container> 
      
    )

  }


  }

  export default EditPreco;
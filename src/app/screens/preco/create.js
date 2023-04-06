import { Alert } from 'react-native';
import React, { useState, useContext } from "react";
import { Container, Form, ContainerInput, Input, ContainerLab, InputLab, Save, SaveLab } from "./../../styles/crud/form";
import { ErrorMensage } from "./../../styles/atendimento";
import { useNavigation } from '@react-navigation/native';
import { ConfigContext } from '../../context/config';

function CreatePreco() { 
  return (  
      <Conteudo/>  
  )
}

const Conteudo = () => {

  const navigation = useNavigation(); // navigation
  const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)

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


const ToCreate = () => {

  if(produto_nome == '') {
  
    setErroMensag(true)

  } else {

  fetch(`http://${baseUrl}/C000025`, {
  method: 'POST',
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
    UNIDADE: unidade,
    SITUACAO: '1'
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
.then((response) => response.json())
  Alert.alert(
    "Cadastro bem sucedida",
    'O produto foi cadastro com sucesso.',
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
 onChangeText={newText => setProduto_nome(newText)}
 placeholder='nome do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Código do Grupo </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setCodgrupo(newText)}
 placeholder='código do grupo do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Código do Subgrupo </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}       
 onChangeText={newText => setCodsubgrupo(newText)}   
 placeholder='código do subgrupo do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Código do Fornecedor </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setCodfornecedor(newText)}
 placeholder='código do fornecedor do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Código da Marca </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setCodmarca(newText)}
 placeholder='código da marca do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Preço de custo </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setPrecocusto(newText)}
 placeholder='preço de custo do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>
    
<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Preço de Venda </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setPrecovenda(newText)}
 placeholder='preço de venda do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Aplicação </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setAplicacao(newText)}
 placeholder='aplicação do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>
     
<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Localização </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setLocalicazao(newText)}
 placeholder='localização do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>
   
<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Foto </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setFoto(newText)}
 placeholder='foto do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> CST </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setCst(newText)}
 placeholder='cst do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>
     
<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Classificação Fiscal </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setClassificacao_fiscal(newText)}
 placeholder='classificação fiscal do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Aliquota </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setAliquota(newText)}
 placeholder='aliquota do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Referencia do Fornecedor </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setReferencia_fornecedor(newText)}
 placeholder='referencia_fornecedor do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> CSOSN </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setCsosn(newText)}
 placeholder='csosn do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> CEST </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setCest(newText)}
 placeholder='cest do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Ind_cfop_nfce </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setInd_cfop_nfce(newText)}
 placeholder='ind_cfop_nfce do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Código de Barras </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setCodbarra(newText)}
 placeholder='código de barras do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>

<ContainerInput>
<ContainerLab>
<InputLab style={{color: appInfo.cor_principal }}> Unidade </InputLab>
</ContainerLab>
 <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
 onChangeText={newText => setUnidade(newText)}
 placeholder='unidade do produto'
 placeholderTextColor={appInfo.cor_principal}/>
</ContainerInput>


</Form>
  

    <Save style={{ backgroundColor: appInfo.cor_principal }} onPress={ToCreate}>
    <SaveLab style={{color: appInfo.cor_de_fundo }}> Salvar </SaveLab>
  </Save>
              
</Container> 
    
)
  }

  export default CreatePreco;
import { Alert, ActivityIndicator, View } from 'react-native';
import React, { useContext, useState } from "react";
import {Picker} from '@react-native-picker/picker';
import { Container, Form, ContainerInput, Input, ContainerLab, InputLab, Save, SaveLab } from "./../../styles/crud/form";
import { ErrorMensage } from "./../../styles/atendimento";
import { useNavigation } from '@react-navigation/native';
import { ConfigContext } from '../../context/config'
import { QueryClient, useQuery, QueryClientProvider } from "react-query";

function EditCliente({route}) { 
  return (  
    <QueryClientProvider client={queryClient}>
    <Conteudo cod={route.params.cod}/>
    </QueryClientProvider>
  )
}

const queryClient = new QueryClient()

async function getCliente([cod, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000007/${cod}`
  );

   return response.json(); 

}


const Conteudo = (props) => {

  const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)
  const navigation = useNavigation(); // navigation

  const cliente = useQuery( 
    ["cliente", props.cod, baseUrl], () => getCliente([props.cod, baseUrl]), {
      staleTime: 5000, cacheTime: 4000
    },
  );


  const date = new Date();
  const data_cadastro = date.getDate() + '.0' + (date.getMonth() + 1 ) + '.' + date.getFullYear();
  const [erroMensag, setErroMensag] = useState(false);

  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numero, setNumero] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [selectedUF, setSelectedUF] = useState();
  const [cep, setCEP] = useState('');
  const [telefone1, setTelefone1] = useState('');
  const [telefone2, setTelefone2] = useState('');
  const [telefone3, setTelefone3] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [rg, setRG] = useState('');
  const [cpf, setCPF] = useState('');
  const [obs1, setObs1] = useState('');
  const [obs2, setObs2] = useState('');
  const [obs3, setObs3] = useState('');
  const [obs4, setObs4] = useState('');
  const [obs5, setObs5] = useState('');
  const [obs6, setObs6] = useState('');
  const [selectedTipo, setSelectedTipo] = useState();

  const DefaultValueForm = () => { 

    cliente.isSuccess? setNome(cliente.data.NOME) : null
    cliente.isSuccess? setApelido(cliente.data.APELIDO) : null
    cliente.isSuccess? setNumero(cliente.data.NUMERO) : null
    cliente.isSuccess? setEndereco(cliente.data.ENDERECO) : null
    cliente.isSuccess? setBairro(cliente.data.BAIRRO) : null
    cliente.isSuccess? setCidade(cliente.data.CIDADE) : null
    cliente.isSuccess? setSelectedUF(cliente.data.UF) : null
    cliente.isSuccess? setCEP(cliente.data.CEP) : null
    cliente.isSuccess? setComplemento(cliente.data.COMPLEMENTO) : null
    cliente.isSuccess? setTelefone1(cliente.data.TELEFONE1) : null
    cliente.isSuccess? setTelefone2(cliente.data.TELEFONE2) : null
    cliente.isSuccess? setTelefone3(cliente.data.TELEFONE3) : null
    cliente.isSuccess? setCelular(cliente.data.CELULAR) : null
    cliente.isSuccess? setEmail(cliente.data.EMAIL) : null
    cliente.isSuccess? setRG(cliente.data.RG) : null
    cliente.isSuccess? setCPF(cliente.data.CPF) : null
    cliente.isSuccess? setObs1(cliente.data.OBS1) : null
    cliente.isSuccess? setObs2(cliente.data.OBS2) : null
    cliente.isSuccess? setObs3(cliente.data.OBS3) : null
    cliente.isSuccess? setObs4(cliente.data.OBS4) : null
    cliente.isSuccess? setObs5(cliente.data.OBS5) : null
    cliente.isSuccess? setObs6(cliente.data.OBS6) : null
    cliente.isSuccess? setSelectedTipo(cliente.data.TIPO) : null

  }

  React.useEffect(() => {

    DefaultValueForm()
    
  },[cliente.isSuccess]);

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
        <ActivityIndicator size="large" color={appInfo.cor_segundaria} />
      <DataLab style={{color: appInfo.cor_principal }}> Tente Novamente </DataLab>
      </View>
    )

  }
  if (cliente.isSuccess) {

 
  const ToUpdate = () => {

    if(nome == '' || apelido == '' ) {
    
      setErroMensag(true)
  
    } else {

      fetch(`http://${baseUrl}/C000007/${props.cod}`, {
        method: 'PUT',
        body: JSON.stringify({
          NOME: nome,
          APELIDO: apelido,
          COMPLEMENTO: complemento,
          NUMERO: numero,
          ENDERECO: endereco,
          BAIRRO: bairro,
          CIDADE: cidade,
          UF: selectedUF,
          CEP: cep,
          TELEFONE1: telefone1,
          TELEFONE2: telefone2,
          TELEFONE3: telefone3,
          CELULAR: celular,
          EMAIL: email,
          RG: rg,
          CPF: cpf,
          OBS1: obs1,
          OBS2: obs2,
          OBS3: obs3,
          OBS4: obs4,
          OBS5: obs5,
          OBS6: obs6,
          TIPO: selectedTipo
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
        Alert.alert(
          "Atualização bem sucedida",
          'O cliente foi atualizado com sucesso.',
          [ 
            { text: "Voltar", onPress: () => navigation.navigate('Cliente') }
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
          <InputLab style={{color: appInfo.cor_principal }}> Nome { erroMensag == true? <ErrorMensage> * </ErrorMensage> : null } </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.NOME}
            onChangeText={newText => setNome(newText)}
            placeholder='Nome do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Apelido { erroMensag == true? <ErrorMensage> * </ErrorMensage> : null } </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.APELIDO}
            onChangeText={newText => setApelido(newText)}
            placeholder='apelido do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Complemento </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.COMPLEMENTO}
            onChangeText={newText => setComplemento(newText)}
            placeholder='complemento do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput> 

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Numero </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.NUMERO}
            onChangeText={newText => setNumero(newText)}
            placeholder='numero do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Endereço </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.ENDERECO}
            onChangeText={newText => setEndereco(newText)}
            placeholder='endereço do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Bairro </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.BAIRRO}
            onChangeText={newText => setBairro(newText)}
            placeholder='bairro do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Cidade </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.CIDADE}
            onChangeText={newText => setCidade(newText)}
            placeholder='cidade do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Estado </InputLab>
          </ContainerLab>
          <ContainerLab style={{ width: "100%", backgroundColor: appInfo.cor_de_fundo, borderWidth: 2, borderRadius: 2, borderColor: appInfo.cor_principal }}>
          <Picker
            selectedValue={selectedUF}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedUF(itemValue)
            }>
            <Picker.Item label="Selecione por favor" value="" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Tocantins" value="TO" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="São Paulo" value="SP" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Sergipe" value="SE" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Santa Catarina" value="SC" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Roraima" value="RR" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Rondônia" value="RO" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Rio Grande do Sul" value="RS" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Rio Grande do Norte" value="RN" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Rio de Janeiro" value="RJ" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Piauí" value="PI" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Pernambuco" value="PE" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Pará" value="PA" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Paraíba" value="PB" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Paraná" value="PR" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Minas Gerais" value="MG" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Mato Grosso do Sul" value="MS" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Mato Grosso" value="MT" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Maranhão" value="MA" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Goiás" value="GO" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Espírito Santo" value="ES" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Distrito Federal" value="DF" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Ceará" value="CE" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Bahia" value="BA" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Amazonas" value="AM" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Amapá" value="AP" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Alagoas" value="AL" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Acre" value="AC" style={{color: appInfo.cor_principal}} />
          </Picker>
          </ContainerLab>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> CEP </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.CEP}
            onChangeText={newText => setCEP(newText)}
            placeholder='cep do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>        

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Telefone(1) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.TELEFONE1}
            onChangeText={newText => setTelefone1(newText)}
            placeholder='telefone(1) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>  

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Telefone(2) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.TELEFONE2}
            onChangeText={newText => setTelefone2(newText)}
            placeholder='telefone(2) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Telefone(3) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.TELEFONE3}
            onChangeText={newText => setTelefone3(newText)}
            placeholder='telefone(3) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Celular </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.CELULAR}
            onChangeText={newText => setCelular(newText)}
            placeholder='celular do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Email </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.EMAIL}
            onChangeText={newText => setEmail(newText)}
            placeholder='email do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> RG </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.RG}
            onChangeText={newText => setRG(newText)}
            placeholder='rg do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> CPF </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.CPF}
            onChangeText={newText => setCPF(newText)}
            placeholder='cpf do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
         <ContainerInput>
         <ContainerLab>
         <InputLab style={{color: appInfo.cor_principal }}> Tipo </InputLab>
         </ContainerLab>
          <ContainerLab style={{ width: "100%", backgroundColor: appInfo.cor_de_fundo, borderWidth: 2, borderRadius: 2, borderColor: appInfo.cor_principal}}>
          <Picker 
            selectedValue={selectedTipo}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTipo(itemValue)
            }>
            <Picker.Item label="Selecione por favor" value="" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Pessoa Física" value="1" style={{color: appInfo.cor_principal}} />
            <Picker.Item label="Pessoa Jurídica" value="2" style={{color: appInfo.cor_principal}} />
          </Picker>
          </ContainerLab>
         </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> OBS(1) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.OBS1}
            onChangeText={newText => setObs1(newText)}
            placeholder='obs(1) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> OBS(2) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.OBS2}
            onChangeText={newText => setObs2(newText)}
            placeholder='obs(2) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> OBS(3) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.OBS3}
            onChangeText={newText => setObs3(newText)}
            placeholder='obs(3) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> OBS(4) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.OBS4}
            onChangeText={newText => setObs4(newText)}
            placeholder='obs(4) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> OBS(5) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.OBS5}
            onChangeText={newText => setObs5(newText)}
            placeholder='obs(5) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> OBS(6) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            defaultValue={cliente.data.OBS6}
            onChangeText={newText => setObs6(newText)}
            placeholder='obs(6) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
                  
          </Form>

            <Save style={{backgroundColor: appInfo.cor_principal }} onPress={ToUpdate}>
            <SaveLab style={{ color: appInfo.cor_de_fundo }}> Salvar </SaveLab>
          </Save>
                      
        </Container>       
        
    )
   }
  }

  export default EditCliente;
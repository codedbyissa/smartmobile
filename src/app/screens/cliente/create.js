import { Alert } from 'react-native';
import React, { useContext, useState } from "react";
import {Picker} from '@react-native-picker/picker';
import { Container, Form, ContainerInput, Input, ContainerLab, InputLab, Save, SaveLab } from "./../../styles/crud/form";
import { ConfigContext } from '../../context/config'
import { ErrorMensage } from "./../../styles/atendimento";
import { useNavigation } from '@react-navigation/native';

function CreateCliente() { 
  return (  
      <Conteudo/>  
  )
}

const Conteudo = () => {

  
  const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)
  const navigation = useNavigation(); // navigation

  const date = new Date();
  const data_cadastro = date.getDate() + '.0' + (date.getMonth() + 1 ) + '.' + date.getFullYear();
  const [erroMensag, setErroMensag] = useState(false);

  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [numero, setNumero] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [selectedUF, setSelectedUF] = useState();
  const [cep, setCEP] = useState('');
  const [complemento, setComplemento] = useState('');
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
  const [obs6, set0bs6] = useState('');
  const [selectedTipo, setSelectedTipo] = useState();

 
  const ToCreate = () => {

    if(nome == '' || apelido == '' ) {
    
      setErroMensag(true)
  
    } else {
  
      fetch(`http://${baseUrl}/C000007`, {
        method: 'POST',
        body: JSON.stringify({
          NOME: nome,
          APELIDO: apelido,
          NUMERO: numero,
          ENDERECO: endereco,
          BAIRRO: bairro,
          CIDADE: cidade,
          UF: selectedUF,
          CEP: cep,
          COMPLEMENTO: complemento,
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
          DATA_CADASTRO: data_cadastro,
          TIPO: selectedTipo,
          SITUACAO: '1',
          CONSUMIDOR_FINAL: 'S',
          ATB: '000001'
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
        Alert.alert(
          "Cadastro bem sucedido",
          'O cliente foi cadastro com sucesso.',
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
            onChangeText={newText => setNome(newText)}
            placeholder='Nome do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput> 
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Apelido { erroMensag == true? <ErrorMensage> * </ErrorMensage> : null } </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setApelido(newText)}
            placeholder='apelido do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Numero </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setNumero(newText)}
            placeholder='numero do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Endereço </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setEndereco(newText)}
            placeholder='endereço do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Bairro </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setBairro(newText)}
            placeholder='bairro do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Cidade </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
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
            onChangeText={newText => setCEP(newText)}
            placeholder='cep do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Complemento </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setComplemento(newText)}
            placeholder='complemento do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>         

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Telefone(1) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setTelefone1(newText)}
            placeholder='telefone(1) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>  

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Telefone(2) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setTelefone2(newText)}
            placeholder='telefone(2) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Telefone(3) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setTelefone3(newText)}
            placeholder='telefone(3) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Celular </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setCelular(newText)}
            placeholder='celular do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> Email </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setEmail(newText)}
            placeholder='email do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> RG </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setRG(newText)}
            placeholder='rg do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> CPF </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setCPF(newText)}
            placeholder='cpf do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
         <ContainerInput>
         <ContainerLab>
         <InputLab style={{color: appInfo.cor_principal }}> Tipo </InputLab>
         </ContainerLab>
          <ContainerLab style={{ width: "100%", backgroundColor: appInfo.cor_de_fundo, borderWidth: 2, borderRadius: 2, borderColor: appInfo.cor_principal }}>
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
            onChangeText={newText => setObs1(newText)}
            placeholder='obs(1) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> OBS(2) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setObs2(newText)}
            placeholder='obs(2) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> OBS(3) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setObs3(newText)}
            placeholder='obs(3) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>

          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> OBS(4) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setObs4(newText)}
            placeholder='obs(4) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> OBS(5) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => setObs5(newText)}
            placeholder='obs(5) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
          
          <ContainerInput>
          <ContainerLab>
          <InputLab style={{color: appInfo.cor_principal }}> OBS(6) </InputLab>
          </ContainerLab>
            <Input style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}
            onChangeText={newText => set0bs6(newText)}
            placeholder='obs(6) do cliente'
            placeholderTextColor={appInfo.cor_principal}/>
          </ContainerInput>
                  
          </Form>

            <Save style={{ backgroundColor: appInfo.cor_principal }} onPress={ToCreate}>
            <SaveLab style={{color: appInfo.cor_de_fundo }}> Salvar </SaveLab>
          </Save>
                      
        </Container>       
        
    )
  }

  export default CreateCliente;
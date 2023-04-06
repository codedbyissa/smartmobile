import styled from 'styled-components/native';

export const Selected = styled.TouchableOpacity`
position: absolute;
right: 0;
height: 100%;
align-items: center;
justify-content: center;
`;

export const Container = styled.View`
width: 100%;
height: 102%;
align-items: center;
background-color: #dbdbdb;
`;

export const ContainerControlCliente = styled.View`
color: #677689;
width: 90%;
height: 100px;
font-size: 20px;
font-weight: bold;
justify-content: center;
`;

export const ContainerLabCliente = styled.View` 
color: #677689;
font-size: 20px;
`;

export const ContainerSelectCliente = styled.TouchableOpacity` 
position: relative;
width: 100%;
height: 50px;
font-size: 20px;
font-weight: bold;
align-items: center;
border-width: 2px;
border-radius: 2px; 
flex-direction: row;
`;

export const SetSelect = styled.View` 
position: absolute;
margin: 10px;
right: 0;
`;

export const LabSelect = styled.Text` 
font-size: 15px;
margin-left: 5px;
`;

export const Icons = styled.View` 
width: 100%;
flex-direction: row;
margin-left: 50px;
`;

export const Icon = styled.TouchableOpacity`
background-color: #677689;
color: #dbdbdb;
width: 40px;
height: 40px;
margin: 5px;
border-radius: 2px;
align-items: center;
justify-content: center;
`;

export const Items = styled.ScrollView`
background-color: transparent;
width: 100%;
height: 100%;
margin-bottom: 100px;
`;

export const DataContent = styled.View`
background-color: #dbdbdb;
color: #677689;
width: 90%;
min-height:180px;
border-color: #677689;
border-top-width: 3px;

`;

export const ContainerControl = styled.View`
color: #677689;
flex-direction: row;
width: 100%;
height: 50px;
font-size: 20px;
font-weight: bold;
justify-content: center;
`;

export const ContainerLab = styled.View` 
color: #677689;
font-size: 20px;
width: 40%;
justify-content: center;
text-align: justify;
`;

export const ContainerSelect = styled.TouchableOpacity` 
color: #677689;
width: 60%;
font-weight: bold;
justify-content: center;
border-left-width: 2px;
border-color: #677689;
`;

export const ContainerRadio = styled.View` 
color: #677689;
width: 60%;
border-left-width: 2px;
border-color: #677689;
flex-direction: row;
`;

export const RadioLab = styled.Text` 
color: #677689;
font-size: 15px;
font-weight: bold;
margin-right: 10px;
margin-top: 5px;
`;

export const RadioCont = styled.View` 
flex-direction: row;
margin-top: 10px;
`;

export const ContainerInput = styled.View`
color: #677689;
width: 60%;
font-weight: bold;
justify-content: center;
border-color: #677689;
border-left-width: 2px;
`;

export const Input = styled.TextInput`
background-color: #dbdbdb;
color: #677689;
width: 100%;
height: 45px;
padding: 10px;
`;


export const InputLab = styled.Text` 
min-width: 50%;
font-size: 20px;
font-weight: bold;
text-align: left;
`;

export const EstoqueInputLab = styled.Text` 
color: #677689;
min-width: 50%;
font-size: 15px;
font-weight: bold;
text-align: left;
`;

export const ContainerDisplay = styled.View`
flex-direction: row;
`;

export const DisplayCont = styled.View`
width: 45%;
height: 80px;
margin: 5px;
justify-content: center;
position: relative;
`;

export const DisplayLab = styled.Text` 
color: #677689;
font-size: 15px;
position: absolute;
top: 0;
font-weight: bold;
`;

export const DisplayLabDesc = styled.Text`
position: absolute;
right: 0;
margin-right: 20px;
color: #e95361;
font-size: 15px;
position: absolute;
top: 0;
font-weight: bold;
`;

export const DisplayLabAcrs = styled.Text`
position: absolute;
right: 0;
margin-right: 20px;
color: #3fbb64;
font-size: 15px;
position: absolute;
top: 0;
font-weight: bold;
`;

export const ValueLab = styled.Text` 
color: #677689;
font-size: 30px;
text-align: center;
font-weight: bold;
`;

// Modal

export const TopContainer = styled.View`
background-color: #dbdbdb;
position: absolute;
top: 0;
margin-top: 20px;
align-items: center;
justify-content: center;
width: 100%;
height: 90px;
flex: 1;
flex-direction: row;
`;

export const DataView = styled.View`
width: 100%;
margin-top: 80px;
margin-bottom: 10px;
height: 89%;
`;

export const ContainerModal = styled.View`
width: 100%;
height: 95%;
align-items: center;
background-color: #dbdbdb;
position: relative;
`;

// Estoque

export const DataEstoque = styled.View`
width: 100%;
height: 40px;
`;

export const EstoqueLab = styled.Text`
color: #8395ab;
font-size: 15px;
font-weight: bold;
margin: 10px;
`;

export const Back = styled.TouchableOpacity`
background-color: #677689;
width: 100%;
height: 35px;
align-items: center;
justify-content: center;
`;

export const BackLab = styled.Text` 
color: #dbdbdb;
font-size: 15px;
`;

export const Pages = styled.TouchableOpacity`
margin-left: 10px;
`;

export const NLPage = styled.View`
flex-direction: row;
justify-content: flex-end;
padding: 10px;
padding-right: 20px;
background-color: #d9d9d9;
border-radius: 5px;
width: 100%;
height: 40px;
`;

// Save

export const Save = styled.TouchableOpacity`
position: absolute;
bottom: 10px;
width: 100%;
height: 50px;
background-color: #677689;
align-items: center;
justify-content: center;
`;

export const SaveLab = styled.Text` 
color: #dbdbdb;
font-size: 15px;
`;

export const ErrorMensage = styled.Text` 
color: #ff0101;
`;


// Cart

export const CartContent = styled.View`
width: 100%;
height: 90%;
justify-content: center;
padding: 10px;
`;

export const ProductContent = styled.View`
position: relative;
margin: 10px;
padding: 10px;
justify-content: center;
border-radius: 5px;
width: 95%;
min-height: 200px;
`;

export const DataLabC = styled.Text`
color: #677689;
font-size: 20px;
font-weight: bold;
text-align: left;
`;

export const DataReplyLabC = styled.Text`
color: #8395ab;
font-size: 18px;
font-weight: bold;
`;

export const BarContent = styled.View`
margin-top: 30px;
width: 100%;
height: 50px;
background-color: #dbdbdb;
`;

export const CartLength = styled.View`
position: absolute;
right: 0;
width: 10%;
height: 100%;
margin-right: 15px;
align-items: center;
justify-content: center;
`;

export const Length = styled.View`
position: absolute;
right: 20px;
top: 0px;
width: 30px;
height: 100%;
align-items: center;
justify-content: center;
`;

export const LengthLab = styled.Text`
position: absolute;
color: #fff;
font-size: 10px;
text-align: center;
font-weight: bold;
`;

export const Length2 = styled.View`
position: absolute;
left: 22px;
bottom: 18px;
width: 30px;
height: 100%;
align-items: center;
justify-content: center;
`;

export const LengthLab2 = styled.Text`
position: absolute;
color: #fff;
font-size: 10px;
text-align: center;
font-weight: bold;
`;

export const CleanCart = styled.TouchableOpacity`
flex-direction: row;
position: absolute;
left: 0;
width: 80%;
height: 100%;
margin-left: 20px;
align-items: center;
`;

export const CleanLab = styled.Text`
color: #677689;
font-size: 20px;
font-weight: bold;
text-align: left;
text-transform: uppercase;
`;

export const RemoveProd = styled.TouchableOpacity`
position: absolute;
right: 0;
bottom: 0;
margin: 10px;
justify-content: center;
height: 30px;
`;

// Finalizar Pre-Venda

export const ContainerRadioFinal = styled.View` 
color: #677689;
width: 60%;
border-color: #677689;
flex-direction: row;
`;

export const RadioContFinal = styled.View` 
flex-direction: row;
margin-top: 8px;
`;

export const ContainerVendaModal = styled.View`
border-radius: 5px;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
`;

export const Close = styled.TouchableOpacity`
position: absolute;
top: 0;
left: 0;
width: 30px;
height: 30px;
margin: 5px;
justify-content: center;
align-items: center;
`;


export const VendaContent = styled.View`
width: 80%;
height: 70%;
elevation: 3;
justify-content: center;
align-items: center;
background-color: #d9d9d9;
`;

export const Confirm = styled.TouchableOpacity`
position: absolute;
justify-content: center;
align-items: center;
bottom: 0;
border-radius: 2px;
margin: 15px;
margin: 15px;
margin-bottom: 10px;
width: 90%;
height: 40px;
background-color: #677689;
`;

export const SearchInputProd = styled.TextInput`
background-color: #dbdbdb;
color: #677689;
width: 60%;
height: 45px;
padding: 10px;
margin-bottom: 15px;
border-width: 2px;
border-color: #677689;
border-left-width: 0;
elevation: 2;
`;

export const InputFinal = styled.TextInput`
background-color: #dbdbdb;
color: #677689;
width: 100%;
height: 45px;
padding: 10px;
text-align: center;
border-color: #677689;
border-width: 2px;
`;

export const ContainerInputFinal = styled.View`
color: #677689;
width: 100%;
font-weight: bold;
justify-content: center;
`;

export const VendaForm = styled.View`
width:95%;
height: 70%;
`;

export const ObsCart = styled.TouchableOpacity`
flex-direction: row;
margin-left: 5px ;
min-width: 100px;
min-height: 20px;
`;

export const ObsLab = styled.Text`
color: #677689;
font-size: 20px;
font-weight: bold;
text-transform: uppercase;
text-decoration: underline;
`;

// Obs Modal

export const InputObs = styled.TextInput`
position: absolute;
bottom: 0;
background-color: #dbdbdb;
color: #677689;
width: 100%;
height: 80%;
padding: 10px;
`;

export const ObsContents = styled.View`
width: 80%;
height: 40%;
justify-content: center;
align-items: center;
`;

export const ObsContent = styled.View`
position: absolute;
top: 0;
width: 95%;
height: 60%;
elevation: 3;
justify-content: center;
align-items: center;
background-color: #d9d9d9;
`;

// Senha Modal

export const SenhaContent = styled.View`
width: 80%;
height: 40%;
elevation: 3;
justify-content: center;
align-items: center;
background-color: #d9d9d9;
`;

export const InputSenha = styled.TextInput`
background-color: #dbdbdb;
color: #677689;
width: 100%;
height: 45px;
padding: 10px;
text-align: center;
border-color: #677689;
border-width: 2px;
`;

export const ContainerInputSenha = styled.View`
color: #677689;
width: 95%;
font-weight: bold;
justify-content: center;
text-align: left;
margin: 5px;
`;


export const ContainerDisplayFinal = styled.View`
margin-top: 20px;
flex-direction: row;
justify-content: center;
align-items: center;
height: 40px;
width: 100%;
`;

export const DisplayContFinal = styled.View`
width: 45%;
height: 80px;
margin: 5px;
justify-content: center;
align-items: center;
position: relative;
`;

export const ContainDisplay = styled.View`
min-width: 100px;
height: 20px;
`;





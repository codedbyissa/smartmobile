import styled from 'styled-components/native';

export const Container = styled.View`
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
background-color: #dbdbdb;
`;

export const PurpleCircle = styled.View`
position: absolute;
top: 220px;
width: 150%;
height: 100%;
border-radius: 1000px;
`;

export const Smartmobile = styled.Text`
position: absolute;
font-size: 40px;
top: 100px;
`;

export const SmartmobileLogo = styled.Image`
position: absolute;
width: 100%;
height: 20%;
font-size: 100px; 
top: 60px;
`;

export const ErrorMensage = styled.Text` 
color: #ff0101;
`;

export const SuccessMensage = styled.Text` 
color: #46b367;
`;

export const Inputs = styled.View`
position: absolute;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
`;

export const Input = styled.TextInput` 
background-color: #dbdbdb;
width: 90%;
height: 45px;
margin-bottom: 15px;
border-radius: 20px;
border-width: 1px;
text-align: center;
border-color: #ddd;
border-bottom-width: 0;
elevation: 10;
`;

export const Entrar = styled.TouchableOpacity`
border-radius: 2px;
font-size: 20px;
width:80px;
height: 40px;
align-items: center;
justify-content: center;
left: 3px;
bottom: 3px;
`;

export const EntrarLab = styled.Text`
color: #ddd;
font-size: 15px;
text-transform: uppercase;
`;
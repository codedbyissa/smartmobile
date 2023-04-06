import styled from 'styled-components/native';

export const Container = styled.View`
width: 100%;
height: 100%;
background-color: #dbdbdb;
align-items: center;
justify-content: center;
`;

export const Content = styled.ScrollView`
position: absolute;
margin-top: 10px;
margin-bottom: 10px;
width: 100%;
height: 90%;
`;

export const Form = styled.ScrollView`
position: absolute;
margin-top: 10px;
margin-bottom: 10px;
width: 100%;
height: 90%;
`;

export const ContainerInput = styled.View`
width: 90%;
min-height: 40px;
margin-bottom: 10px;
`;

export const Input = styled.TextInput`
background-color: #dbdbdb;
color: #3b566e;
width: 100%;
height: 45px;
padding: 10px;
border-width: 2px;
border-color: #3b566e;
border-radius: 2px;
`;

export const ContainerLab = styled.View` 
color: #3b566e;
height: 45px;
font-size: 20px;
font-weight: bold;
justify-content: center;
`;

export const InputLab = styled.Text` 
color: #3b566e;
min-width: 50%;
font-size: 20px;
font-weight: bold;
`;

export const Save = styled.TouchableOpacity`
position: absolute;
bottom: 0;
width: 100%;
height: 50px;
background-color: #3b566e;
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



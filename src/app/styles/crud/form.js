import styled from 'styled-components/native';

export const Container = styled.View`
width: 100%;
height: 100%;
background-color: #dbdbdb;
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
width: 100%;
height: 45px;
padding: 10px;
border-width: 2px;
border-radius: 2px;
`;

export const ContainerLab = styled.View` 
width: 100%;
height: 45px;
font-size: 20px;
font-weight: bold;
justify-content: center;
`;

export const InputLab = styled.Text`
min-width: 50%;
font-size: 20px;
font-weight: bold;
`;

export const Save = styled.TouchableOpacity`
position: absolute;
bottom: 0;
width: 100%;
height: 50px;
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


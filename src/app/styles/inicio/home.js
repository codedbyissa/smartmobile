import styled from 'styled-components/native';

export const Container = styled.View`
width: 100%;
height: 100%;
background-color: #dbdbdb;
align-items: center;
justify-content: center;
`;

export const Content = styled.ScrollView`
flex: 1;
width: 100%;
height: 80%;
margin-top: 10px;
`;

export const SquaresContainer = styled.View`
flex: 1;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
justify-content: center;
margin-bottom: 10px;
`;

export const DuoIcon = styled.View`
position: relative;
flex: 1;
flex-direction: row;
align-items: center;
justify-content: center;
margin-bottom: -10px;
`;

export const Lab = styled.Text`
font-size: 20px;
font-weight: bold;
`;

export const DuoLab = styled.Text`
position: relative;
font-size: 20px;
font-weight: bold;
margin: 5px;
`;

export const Square = styled.TouchableOpacity`
width: 150px;
height: 150px;
elevation: 9;
align-items: center;
justify-content: center;
border-radius: 5px;
margin: 10px;
`;

export const ExitContainer = styled.View`
align-items: center;
justify-content: center;
width: 100%;
height: 20%;
margin: 10px;
`;

export const ExitContent = styled.TouchableOpacity`
align-items: center;
justify-content: center;
background-color: #d9d9d9;
border-radius: 5px;
width: 80%;
height: 60%;
elevation: 2;
`;
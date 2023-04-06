import styled from 'styled-components/native';

export const Container = styled.View`
width: 100%;
height: 100%;
background-color: #dbdbdb;
align-items: center;
justify-content: center;
`;

export const Content = styled.SafeAreaView`
position: absolute;
width: 100%;
height: 75%;
`;

export const DataContent = styled.View`
background-color: #dbdbdb;
width: 95%;
min-height: 100px;
margin-bottom: 20px;
left: 10px;
align-items: baseline;
justify-content: center;
border-top-width: 10px;
border-width: 2px;
elevation: 2;
`;

export const DataLab = styled.Text`
font-size: 20px;
font-weight: bold;
text-align: left;
`;

export const DataReplyLab = styled.Text`
font-size: 18px;
font-weight: bold;
`;

export const DataLimiter = styled.View`
background-color: transparent;
flex: 1;
width: 93%;
height: 90%;
margin: 10px;
`;

export const IconsContent = styled.View`
background-color: transparent;
flex-direction: row;
flex: 1;
width: 93%;
height: 90%;
margin: 10px;
`;

export const IconContent = styled.TouchableOpacity`
border-radius: 3px;
align-items: center;
justify-content: center;
width: 30px;
height: 25px;
margin: 5px;
`;

export const TopContainer = styled.View`
background-color: #dbdbdb;
position: absolute;
top: 0;
align-items: center;
justify-content: center;
width: 100%;
height: 90px;
flex: 1;
flex-direction: row;
`;

export const ContainerSearch = styled.View`
background-color: #dbdbdb;
width: 15%;
height: 45px;
margin-bottom: 15px;
margin-right: 0px;
align-items: center;
justify-content: center;
border-width: 2px;
border-right-width: 0;
`;

export const SearchInput = styled.TextInput`
background-color: #dbdbdb;
width: 60%;
height: 45px;
padding: 10px;
margin-bottom: 15px;
border-width: 2px;
border-left-width: 0;
`;

export const Filter = styled.TouchableOpacity`
background-color: #dbdbdb;
width: 15%;
height: 40px;
margin-bottom: 15px;
margin-left: 5px;
border-radius: 5px;
align-items: center;
justify-content: center;
border-width: 2px;
elevation: 4;
`;

export const BackContainer = styled.View`
background-color: #dbdbdb;
position: absolute;
bottom: 0;
align-items: center;
justify-content: center;
width: 100%;
height: 90px;
flex: 1;
flex-direction: row;
`;

export const BackContent = styled.TouchableOpacity`
align-items: center;
justify-content: center;
background-color: #d9d9d9;
border-radius: 5px;
width: 40%;
height: 60%;
elevation: 2;
margin-left: 10px;
`;

export const Selected = styled.View`
position: absolute;
right: 0;
height: 100%;
align-items: center;
justify-content: center;
`;

export const ContainerSearchtype = styled.View`
border-radius: 5px;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
`;

export const SearchtypeContent = styled.View`
width: 80%;
height: 30%;
elevation: 3;
justify-content: center;
align-items: center;
background-color: #d9d9d9;
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

export const ContainerRadio = styled.View`
width: 90%;
`;

export const RadioLab = styled.Text` 
color: #677689;
font-size: 15px;
font-weight: bold;
margin-right: 10px;
margin-top: 5px;
`;

export const RadioMessage = styled.Text` 
color: #677689;
font-size: 15px;
font-weight: bold;
margin-top: 30px;
margin-left: 5px;
text-transform: uppercase;
`;

export const RadioCont = styled.View` 
flex-direction: row;
margin-top: 10px;
`;
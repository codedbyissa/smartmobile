import styled from 'styled-components/native';

export const Container = styled.View`
width: 100%;
height: 100%;
background-color: #dbdbdb;
`;

export const DataContent = styled.View`
background-color: #dbdbdb;
color: #677689;
width: 95%;
min-height: 100px;
margin-bottom: 20px;
left: 10px;
align-items: baseline;
justify-content: center;
border-color: #677689;
border-top-width: 10px;
border-width: 2px;
elevation: 2;
`;

export const DataLab = styled.Text`
color: #677689;
font-size: 20px;
font-weight: bold;
text-align: left;
`;

export const DataReplyLab = styled.Text`
color: #8395ab;
font-size: 18px;
font-weight: bold;
`;

export const DataLimiter = styled.ScrollView`
position: relative;
flex: 1;
width: 85%;
height: 70%;
margin: 20px;
`;

export const Copy = styled.TouchableOpacity`
position: absolute;
width: 50px;
height: 50px;
margin: 20px;
right: 0;
border-radius: 100px;
background-color: #677689;
align-items: center;
justify-content: center;
`;

export const CopyLab = styled.Text` 
color: #dbdbdb;
font-size: 15px;
`;

export const Copied = styled.View`
position: absolute;
bottom: 0;
width: 100%;
height: 20px;
align-items: center;
background-color: #677689;
justify-content: center;
`;

export const CopyConteiner = styled.View`
position: absolute;
width: 100%;
height: 50px;
margin: 10px;
align-items: center;
justify-content: center;
elevation: 2;
`;

export const CopiedLab = styled.Text` 
color: #dbdbdb;
font-size: 15px;
`;
import styled from 'styled-components/native';

export const TopContainerModal = styled.View`
background-color: #dbdbdb;
position: absolute;
top: 10px;
align-items: center;
justify-content: center;
width: 100%;
height: 100px;
flex: 1;
flex-direction: row;
`;

export const SearchInputModal = styled.TextInput`
background-color: #dbdbdb;
color: #677689;
width: 70%;
height: 45px;
padding: 10px;
margin-bottom: 15px;
border-width: 2px;
border-color: #677689;
border-left-width: 0;
elevation: 2;
`;

export const ContainerFilterModal = styled.View`
border-radius: 5px;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
`;

export const FilterContent = styled.View`
width: 80%;
height: 50%;
elevation: 3;
justify-content: center;
align-items: center;
background-color: #d9d9d9;
`;

export const FilterForm = styled.View`
width:100%;
height: 70%;
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

export const BackModal = styled.TouchableOpacity`
background-color: #677689;
width: 100%;
height: 40px;
align-items: center;
justify-content: center;
`;

export const DataInput = styled.TextInput`
width: 100%;
height: 45px;
border-width: 2px;
padding: 10px;
color: #677689;
border-color: #677689;
`;
import React from 'react';
import styled from 'styled-components/native';
import {observer} from 'mobx-react-lite';
import {useStore} from '../context/StoreContext.tsx';
import {useAuth} from '../context/AuthProvider.tsx';

const HomeScreen = () => {
  const {logout} = useAuth();
  const {userStore} = useStore();
  const {userInfo} = userStore;

  return (
    <Container>
      <StyledText>Hello {userInfo?.name}</StyledText>
      <StyledButton>
        <ButtonText onPress={logout}>Выход</ButtonText>
      </StyledButton>
    </Container>
  );
};

export default observer(HomeScreen);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

const StyledText = styled.Text`
  color: #333;
  font-size: 18px;
  margin: 10px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

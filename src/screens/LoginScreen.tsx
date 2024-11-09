import React, {useState, useContext} from 'react';
import {Text, TextInput, Button} from 'react-native';
import {AuthContext} from '../context/AuthProvider';
import styled from 'styled-components/native';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // Обработка случая, если контекст не найден
  }

  const handleLogin = async () => {
    try {
      await authContext.login(email, password);
      // Здесь можно добавить навигацию на защищенный экран
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <Container>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </Container>
  );
};

export default LoginScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

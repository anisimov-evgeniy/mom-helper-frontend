import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {AuthContext} from '../context/AuthProvider'; // Используем контекст авторизации
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token && authContext) {
        // Если токен существует, отмечаем, что пользователь залогинен
        // Здесь можно дополнительно проверить валидность токена
        // Например, вызвать `authContext.setLoggedIn(true)` или аналогичную функцию
      } else if (authContext) {
        authContext.logout(); // Сбрасываем состояние, если токена нет
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, [authContext]);

  if (loading) {
    return null; // Можно добавить экран загрузки
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={authContext?.isLoggedIn ? 'Home' : 'Login'}>
        {authContext?.isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Home Screen'}}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: 'Login Screen'}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

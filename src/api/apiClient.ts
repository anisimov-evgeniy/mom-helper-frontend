import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let inMemoryAccessToken: string | null = null;

const API = axios.create({
  baseURL: 'http://localhost:3001', // Замени на актуальный URL
});

// Добавляем токен к каждому запросу
API.interceptors.request.use(
  async config => {
    if (!inMemoryAccessToken) {
      inMemoryAccessToken = await AsyncStorage.getItem('access_token');
    }
    if (inMemoryAccessToken && config.headers) {
      config.headers.Authorization = `Bearer ${inMemoryAccessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Обновление токена при ошибке 401
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest.url !== '/auth/refresh-token' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const {data} = await API.post<{access_token: string}>(
            '/auth/refresh-token',
            {refreshToken},
          );

          if (data.access_token) {
            // Обновляем токен в памяти и в AsyncStorage
            inMemoryAccessToken = data.access_token;
            await AsyncStorage.setItem('access_token', data.access_token);

            // Устанавливаем новый токен в заголовок текущего запроса
            originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
            return API(originalRequest);
          }
        } catch (err) {
          console.error('Ошибка обновления токена', err);
          // Здесь можно перенаправить на страницу логина или сбросить состояние авторизации
        }
      }
    }
    return Promise.reject(error);
  },
);

export default API;

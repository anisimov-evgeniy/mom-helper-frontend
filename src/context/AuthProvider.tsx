import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authAPI} from '../services/auth';
import {observer} from 'mobx-react-lite';
import {useStore} from './StoreContext.tsx';

export interface AuthContextData {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  loading: boolean; // Добавлено для отслеживания состояния загрузки
}

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = observer(
  ({children}) => {
    const {authStore} = useStore();
    const {isLoggedIn} = authStore;
    const [loading, setLoading] = useState<boolean>(true); // Добавлено состояние загрузки

    useEffect(() => {
      const checkToken = async () => {
        try {
          const token = await AsyncStorage.getItem('access_token');
          if (token) {
            authStore.login();
          }
        } catch (error) {
          console.error('Ошибка при проверке токена:', error);
        } finally {
          setLoading(false);
        }
      };
      checkToken();
    }, [authStore]);

    const login = async (email: string, password: string) => {
      try {
        const response = await authAPI.login(email, password);
        if (response.data.access_token && response.data.refresh_token) {
          await AsyncStorage.setItem(
            'access_token',
            response.data.access_token,
          );
          await AsyncStorage.setItem(
            'refresh_token',
            response.data.refresh_token,
          );

          authStore.login();
        } else {
          console.warn('Ошибка: отсутствуют токены');
        }
      } catch (error) {
        console.error('Ошибка входа:', error);
        authStore.logout();
      }
    };

    const logout = async () => {
      try {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
      } catch (error) {
        console.error('Ошибка при выходе из системы:', error);
      } finally {
        authStore.logout();
      }
    };

    const refreshToken = async () => {
      try {
        const currentRefreshToken = await AsyncStorage.getItem('refresh_token');
        if (currentRefreshToken) {
          const response = await authAPI.refreshToken(currentRefreshToken);
          if (response.data.access_token) {
            await AsyncStorage.setItem(
              'access_token',
              response.data.access_token,
            );
          } else {
            console.warn('Не удалось получить новый access_token');
            await logout();
          }
        }
      } catch (error) {
        console.error('Ошибка обновления токена:', error);
        await logout();
      }
    };

    return (
      <AuthContext.Provider
        value={{isLoggedIn, login, logout, refreshToken, loading}}>
        {children}
      </AuthContext.Provider>
    );
  },
);

// Хук для доступа к контексту
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};

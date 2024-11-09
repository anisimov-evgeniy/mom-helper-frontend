import React, {FC} from 'react';
import {StoreProvider} from './context/StoreContext';
import AppNavigator from './navigation/AppNavigator.tsx';
import {AuthProvider} from './context/AuthProvider.tsx';

const App: FC = () => {
  return (
    <StoreProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </StoreProvider>
  );
};

export default App;

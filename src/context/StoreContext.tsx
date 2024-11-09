import React, {createContext, useContext} from 'react';
import {UserStore} from '../store/UserStore';
import {AuthStore} from '../store/AuthStore.ts';
import {ChildrenStore} from '../store/ChildrenStore.ts';
import {ActivityRecordsStore} from '../store/ActivityRecordsStore.ts';

// Корневой стор, содержащий все сторы
class RootStore {
  authStore: AuthStore;
  userStore: UserStore;
  childrenStore: ChildrenStore;
  activityRecordsStore: ActivityRecordsStore;

  constructor() {
    this.authStore = new AuthStore();
    this.userStore = new UserStore(this.authStore);
    this.childrenStore = new ChildrenStore();
    this.activityRecordsStore = new ActivityRecordsStore();
  }
}

// Создание контекста
const StoreContext = createContext<RootStore | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const rootStore = new RootStore();
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

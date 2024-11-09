import {makeAutoObservable, reaction} from 'mobx';
import {userAPI} from '../services/user';
import {AuthStore} from './AuthStore.ts';

export class UserStore {
  private _userInfo: any = undefined;
  private _loading: boolean = false;
  private authStore: AuthStore;

  constructor(authStore: AuthStore) {
    makeAutoObservable(this);
    this.authStore = authStore;

    // Используем reaction для асинхронных операций
    reaction(
      () => this.authStore.isLoggedIn, // Слежение за состоянием авторизации
      isLoggedIn => {
        if (isLoggedIn) {
          this.getUserInfo();
        }
      },
    );
  }

  get userInfo() {
    return this._userInfo;
  }

  get loading() {
    return this._loading;
  }

  public async getUserInfo() {
    this._loading = true;
    try {
      const response = await userAPI.getUserInfo();
      this._userInfo = response.data; // Убедись, что `response.data` используется
    } catch (error) {
      console.error('Ошибка получения информации о пользователе:', error);
    } finally {
      this._loading = false;
    }
  }
}

import {makeAutoObservable, reaction} from 'mobx';
import {userAPI} from '../services/user';
import {AuthContextData} from '../context/AuthProvider';

export class UserStore {
  private _userInfo: any = undefined;
  private _loading: boolean = false;
  private authContext: AuthContextData;

  constructor(authContext: AuthContextData) {
    makeAutoObservable(this);
    this.authContext = authContext;

    // Используем reaction для асинхронных операций
    reaction(
      () => this.authContext.isLoggedIn, // Слежение за состоянием авторизации
      isLoggedIn => {
        if (isLoggedIn) {
          console.log(isLoggedIn, 'isLoggedIn');
          console.log('Fetching user info after login');
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
      console.log(response, 'User info response');
      this._userInfo = response.data; // Убедись, что `response.data` используется
    } catch (error) {
      console.error('Ошибка получения информации о пользователе:', error);
    } finally {
      this._loading = false;
    }
  }
}

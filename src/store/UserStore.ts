import {makeAutoObservable, reaction} from 'mobx';
import {userAPI} from '../services/user';
import {AuthStore} from './AuthStore.ts';
import {UserProps} from '../models/user.ts';

export class UserStore {
  private authStore: AuthStore;

  private _loading: boolean = false;
  private _userInfo?: UserProps = undefined;
  private _users?: UserProps[] = undefined;
  private _selectedUser?: UserProps = undefined;

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

  get users() {
    return this._users;
  }

  get loading() {
    return this._loading;
  }

  public async getUserInfo() {
    this._loading = true;
    try {
      const response = await userAPI.getUserInfo();
      this._userInfo = response.data;
    } catch (error) {
      this._userInfo = undefined;
      console.error('Ошибка получения информации о пользователе:', error);
    } finally {
      this._loading = false;
    }
  }

  public async editUserById(id: number) {
    this._loading = true;
    try {
      await userAPI.editUserById(id);
      await this.getUserInfo();
    } catch (error) {
      console.error(`Ошибка изменения данных пользователя с id:${id}`, error);
    } finally {
      this._loading = false;
    }
  }

  // Только для админа
  public async getUsers() {
    this._loading = true;
    try {
      const response = await userAPI.getUsers();
      this._users = response.data;
    } catch (error) {
      this._users = undefined;
      console.error('Ошибка получения списка пользователей:', error);
    } finally {
      this._loading = false;
    }
  }

  public async getUserById(id: number) {
    this._loading = true;
    try {
      const response = await userAPI.getUserById(id);
      this._selectedUser = response.data;
    } catch (error) {
      this._selectedUser = undefined;
      console.error(`Ошибка получения пользователя с id:${id}`, error);
    } finally {
      this._loading = false;
    }
  }

  public async deleteUser(id: number) {
    this._loading = true;
    try {
      await userAPI.deleteUser(id);
      // Нотификация удаления
    } catch (error) {
      console.error(`Ошибка удаления пользователя c id:${id}`, error);
    } finally {
      this._loading = false;
    }
  }
}

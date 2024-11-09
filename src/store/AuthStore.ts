import {makeAutoObservable} from 'mobx';

export class AuthStore {
  isLoggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
}

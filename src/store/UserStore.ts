import {makeAutoObservable} from 'mobx';

export class userStore {
  userInfo: any = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setUserInfo(userInfo?: any) {
    this.userInfo = userInfo;
  }
}

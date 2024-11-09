import {makeAutoObservable} from 'mobx';
import {ChildrenProps} from '../models/children.ts';
import {childrenAPI} from '../services/children.ts';

export class ChildrenStore {
  private _loading: boolean = false;
  private _children?: ChildrenProps[] = undefined;
  private _selectedChild?: ChildrenProps = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get children() {
    return this._children;
  }

  get selectedChild() {
    return this._selectedChild;
  }

  get loading() {
    return this._loading;
  }

  public async getChildren() {
    this._loading = true;
    try {
      const response = await childrenAPI.getChildren();
      this._children = response.data;
    } catch (error) {
      this._children = undefined;
      console.error('Ошибка получения информации о детях:', error);
    } finally {
      this._loading = false;
    }
  }

  public async getChildById(id: number) {
    this._loading = true;
    try {
      const response = await childrenAPI.getChildById(id);
      this._selectedChild = response.data;
    } catch (error) {
      this._selectedChild = undefined;
      console.error(`Ошибка получения ребенка с id:${id}`, error);
    } finally {
      this._loading = false;
    }
  }

  public async deleteChild(id: number) {
    this._loading = true;
    try {
      await childrenAPI.deleteChild(id);
      // Нотификация удаления
    } catch (error) {
      console.error(`Ошибка получения ребенка с id:${id}`, error);
    } finally {
      this._loading = false;
    }
  }
}

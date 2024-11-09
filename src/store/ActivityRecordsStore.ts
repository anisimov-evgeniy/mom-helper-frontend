import {makeAutoObservable} from 'mobx';
import {ActivityRecordsProps} from '../models/activityRecords.ts';
import {activityRecordsAPI} from '../services/activityRecords.ts';

export class ActivityRecordsStore {
  private _loading: boolean = false;
  private _activityRecords?: ActivityRecordsProps[] = undefined;
  private _selectedActivityRecord?: ActivityRecordsProps = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get activityRecords() {
    return this._activityRecords;
  }

  get selectedActivityRecord() {
    return this._selectedActivityRecord;
  }

  get loading() {
    return this._loading;
  }

  public async getActivityRecords() {
    this._loading = true;
    try {
      const response = await activityRecordsAPI.getActivityRecords();
      this._activityRecords = response.data;
    } catch (error) {
      this._activityRecords = undefined;
      console.error('Ошибка получения информации об активностях:', error);
    } finally {
      this._loading = false;
    }
  }

  public async getActivityRecordById(id: number) {
    this._loading = true;
    try {
      const response = await activityRecordsAPI.getActivityRecordById(id);
      this._selectedActivityRecord = response.data;
    } catch (error) {
      this._selectedActivityRecord = undefined;
      console.error(`Ошибка получения активности с id:${id}`, error);
    } finally {
      this._loading = false;
    }
  }

  public async deleteActivityRecord(id: number) {
    this._loading = true;
    try {
      await activityRecordsAPI.deleteActivityRecord(id);
      // Нотификация удаления
    } catch (error) {
      console.error(`Ошибка получения активности с id:${id}`, error);
    } finally {
      this._loading = false;
    }
  }
}

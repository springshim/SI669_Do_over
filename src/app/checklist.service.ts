import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ItemManager } from './model/itemManager';
import { Item } from './model/item';
import { Detail } from './model/detail';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  private itemManager: ItemManager;
  private testing: boolean = true;
  private DATA_KEY: string = 'nothing';
  private itemBundle: Object;
  //private detailBundle: Object;
  private theObservable: Observable<Object>;
  private theObserver: Observer<Object>;

  constructor(private storage: Storage) {
    this.itemManager = new ItemManager(storage);
    //this.updateObservers();
    this.storage.get(this.DATA_KEY).then(what => {
      this.itemBundle = what;
      console.log("Retrieved itemBundle: " + this.itemBundle);
      this.itemManager.initFromBundle(this.itemBundle);
      this.updateObservers();
    });

  }

  public getItems(): Item[] {
    return this.itemManager.getItems();
  }

  public getItemById(id: number): Item {
    return this.itemManager.getItemById(id);
  }

  public addItem(title: string): Item {
    let detailList = [];
    let newitem = this.itemManager.createItem(title,detailList);
    console.log("Added item: " + newitem);
    return newitem;
  }

  public removeItem(item: Item) {
    this.itemManager.removeItem(item);
    console.log("Deleted item: " + item);
  }

  public sortItems(sort: string): Item[] {
    return this.itemManager.sortItems(sort);
  }

  public saveData(): void {
    this.itemBundle = this.itemManager.getItems();
    this.storage.set(this.DATA_KEY, this.itemBundle);
    this.updateObservers();
    console.log("Saved itemBundle: " + this.itemBundle);
  }

  public getObservable(): Observable<Object> {
    if (this.theObservable === undefined) {
      this.theObservable = Observable.create(observer =>
        this.theObserver = observer);
    }
    return this.theObservable;

  }

  private updateObservers() {
    if (this.theObserver) {
      this.theObserver.next(true);
    }
  }
}

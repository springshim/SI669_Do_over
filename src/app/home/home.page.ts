import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ChecklistService } from '../checklist.service';
import { Item } from '../model/item';
import { Detail } from '../model/detail';
import { Router } from '@angular/router';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  private checklist: Item[];
  private itemTitle: string;
  private remainSort: string;

  public constructor(private storage: Storage, private checklistService: ChecklistService, public router: Router) {
    this.checklistService.getObservable().subscribe(() => {
      this.checklist = this.checklistService.getItems();
      console.log("in HomePage constructor, checklist updated " + this.checklist);
    });
    this.storage.get("sortsetting").then((data) => {
      this.remainSort = data["remainSort"];
    });
  }

  public ngOnInit() {
    //this.checklist = this.checklistService.getItems();
    // this.storage.get("sortsetting").then((data) => {
    //   this.remainSort = data["remainSort"];
    // });
    this.checklist = this.checklistService.sortItems(this.remainSort);
    console.log("in HomePage ngOnInit, checklist updated " + this.checklist);
  }

  private addItem(): void {
    this.checklistService.addItem(this.itemTitle);
    this.checklistService.saveData();
    this.itemTitle = "";
    this.ngOnInit();
  }

  private deleteItem(item: Item): void {
    this.checklistService.removeItem(item);
    this.checklistService.saveData();
    this.ngOnInit();
  }

  private selectItem(item: Item): void {
    this.router.navigate(['/detail', item.getId()]);
  }

  private sortByremian(): void {
    //this.checklist = this.checklistService.sortItems();
    let data = {
                 "remainSort": this.remainSort
                };
    this.storage.set("sortsetting", data);
    this.checklistService.saveData();
    this.ngOnInit();
  }



}

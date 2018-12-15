import { Component, OnInit } from '@angular/core';
import { ChecklistService } from '../checklist.service';
import { Detail } from '../model/detail';
import { Item } from '../model/item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  private item: Item;
  private itemId: string;
  private itemTitle: string;
  private itemDetail: Object;
  private somedetail: string;
  private itemDetailList: any;
  private selectedDetail: any;
  private newdetail: string;
  private priority: string;
  private isToggled: Boolean;
  private completed: any;
  //editdetail: Boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private checklistService: ChecklistService) {
      this.route.params.subscribe((params) => {
      this.itemId = params['itemId'];
      this.item = this.checklistService.getItemById(parseInt(this.itemId));
      this.itemTitle = this.item.getTitle();
      this.itemDetail = this.item.sortDetail();
    })
  }

  public ngOnInit() {

    this.itemTitle = this.item.getTitle();
    this.itemDetail = this.item.sortDetail();
    this.completed = this.item.getCompleted();
    console.log("details: " + this.itemDetail);
  }

  private addDetail(): void {
    this.item.createDetail(this.somedetail);
    this.checklistService.saveData();
    this.somedetail = "";
    this.ngOnInit();
  }

  private editDetail(detail: Detail) {
    this.selectedDetail = detail;
    this.newdetail = "";
  }

  private deleteDetail(detail: Detail) {
    this.item.removeDetail(detail);
    this.checklistService.saveData();
    this.selectedDetail = false;
    this.ngOnInit();
  }

  private changeDetail(detail: Detail) {
    this.item.removeDetail(detail);
    this.item.createDetail(this.newdetail);
    this.checklistService.saveData();
    this.ngOnInit();
  }

  private hideEdit(detail: Detail) {
    this.selectedDetail = false;
    this.newdetail = "";
    this.ngOnInit();
  }

  private toggleDetail(detail: Detail){
    this.item.toggleDetail(detail);
    this.checklistService.saveData();
    this.selectedDetail = false;
    this.ngOnInit();
  }

  private setPriority(detail: Detail, priority: string){
    this.item.setPriority(detail,detail.priority);
    this.checklistService.saveData();
    this.selectedDetail = false;
    this.ngOnInit();
  }

  private hideCompleted(item: Item){
    this.item.isToggled = item.isToggled;
    this.checklistService.saveData();
    this.ngOnInit();
  }

  private sortDetail(item: Item){
    this.item.isSorted = item.isSorted;
    this.checklistService.saveData();
    this.ngOnInit();
  }

}

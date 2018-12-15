import { Detail } from './detail';

var nextDetailId: number = 0;

export class Item {

    public constructor(private itemTitle: string,
                        private itemId: number,
                        private itemDetail: any[],
                        public isToggled: Boolean,
                        public isSorted: string) {

    }

    public setTitle(newTitle: string): void {
        this.itemTitle = newTitle;
    }

    public getTitle(): string {
        return this.itemTitle;
    }

    public getId(): number {
        return this.itemId;
    }

    public setDetails(newDetails: Detail[]): void {
        this.itemDetail = newDetails;
    }

    public getDetails(): Detail[] {
        return this.itemDetail;
    }

    public getCompleted(): Detail[] {
      let detaillist = this.getDetails();
      let completed = [];
      for (let i in detaillist) {
          if (detaillist[i].checked) {
              completed.push(detaillist[i]);
          }
      }
      return completed;
    }

    //////////////
    public createDetailWithId(detailTitle: string,
      detailId: number,
      detailChecked: Boolean,
      detailPriority: string): Detail {
        let detail = new Detail(detailTitle, detailId, detailChecked, detailPriority);
        //this.details[detailId] = detail;
        this.itemDetail.push(detail);
        return detail;
    }

    public createDetail(detailTitle: string): Detail {
        let detailChecked = false;
        let detailPriority = "1";
        let detailId = this.getNextDetailId();
        return this.createDetailWithId(detailTitle, detailId, detailChecked, detailPriority);
    }

    public getNextDetailId(): number {
        return nextDetailId++;
    }

    public getDetailById(id: number): Detail {
        let detaillist = this.getDetails();
        for (let i in detaillist) {
            if (detaillist[i].getId() === id) {
                return detaillist[i];
            }
        }
        return undefined;
    }
    ///////////////////
    public toggleDetail(detail: Detail) : void {
        detail.checked = !detail.checked;
    }

    public setPriority(detail: Detail, newpriority: string) : void {
        detail.priority = newpriority;
    }

    public sortDetail(): Detail[] {
        if(this.isSorted == "Priority")
        {
          //this.heroes = heroes.sort(function(a, b){return a.id - b.id});
          this.itemDetail.sort(function(a, b){return parseInt(a.priority) - parseInt(b.priority)});
          console.log("haha");
        };
        if(this.isSorted == "ABC")
        {
          this.itemDetail.sort(function(a, b){
              var x = a.detailTitle.toLowerCase();
              var y = b.detailTitle.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
          });
        };
        return this.itemDetail;
    }

    ///////////////////
    public removeDetail(detail: Detail) : void {
        if (this.itemDetail.indexOf(detail) != -1) {
            this.itemDetail.splice(this.itemDetail.indexOf(detail), 1);
        }
    }

}

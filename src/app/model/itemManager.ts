import { Storage } from '@ionic/storage';
import { Item } from './item';
import { Detail } from './detail';

var nextItemId: number = 1;

export class ItemManager {

    private items: Object = {};
    private remainSort: string;

    public constructor(private storage: Storage) {
      this.storage.get("sortsetting").then((data) => {
        this.remainSort = data["remainSort"];
      });

    }

    public initFromBundle(itemBundle: Object /*Hero[]*/) {
        console.log(itemBundle);
        for (let i in itemBundle) {
            let title:string = itemBundle[i]['itemTitle'];
            let id: number = parseInt(itemBundle[i]['itemId']);
            let details: Detail[] = itemBundle[i]['itemDetail'];
            let isToggled: Boolean = itemBundle[i]['isToggled'];
            let isSorted:string = itemBundle[i]['isSorted'];
            this.createItemWithId(title, id, details, isToggled, isSorted);
        }
        console.log(this.getItems());
    }

    public createItemWithId(itemTitle: string, itemId: number, itemDetail: Detail[], isToggled: Boolean, isSorted: string): Item {
        let item = new Item(itemTitle, itemId, itemDetail, isToggled, isSorted);
        this.items[itemId] = item;
        return item;
    }

    public createItem(itemTitle: string, itemDetail: Detail[]): Item {
        let itemId = this.getNextItemId();
        let isToggled = false;
        let isSorted = "";
        return this.createItemWithId(itemTitle, itemId, itemDetail, isToggled, isSorted);
    }

    public getNextItemId(): number {
        return nextItemId++;
    }

    public getItemById(id: number): Item {
        return this.items[id];
    }

    public getItemByTitle(title: string): Item {
        let checklist = this.getItems();
        for (let i in checklist) {
            if (checklist[i].getTitle() === title) {
                return checklist[i];
            }
        }
        return undefined;
    }

    public getItems(): Item[] {
        let itemslist: Item[] = [];
        for (let key in this.items) {
            itemslist.push(this.items[key]);
        }
        return itemslist;
    }

    public sortItems(sort: string): Item[] {
        let itemslist = this.getItems();
        //let length = itemslist.length;
        if(sort == "ascending")
        {
          itemslist.sort(function(a, b){
            return (a.getDetails().length - a.getCompleted().length) - (b.getDetails().length - b.getCompleted().length)
          });
        };
        if(sort == "Descending")
        {
          itemslist.sort(function(a, b){
            return (b.getDetails().length - b.getCompleted().length) - (a.getDetails().length - a.getCompleted().length)
          });
        };
        return itemslist;
    }

    public removeItem(item: Item) {
        delete this.items[item.getId()];
    }

    public removeItemById(id: number) {
        delete this.items[id];
    }
}

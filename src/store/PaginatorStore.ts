import { observable, reaction, action, computed } from "mobx";
import { v4 as uuid } from "uuid";
import { IPaginateItem } from "../interfaces/Item";

class PaginatorStore {
    constructor() {
        //reaction(() => this.itemsWidth, _ => console.log("WIDTH", this.itemsWidth))
    }

    @observable items: IPaginateItem[] = [
        {
            id: uuid(),
            title: 'one',
            active: true
        },
        {
            id: uuid(),
            title: 'two',
            active: false
        },
        {
            id: uuid(),
            title: 'three',
            active: false
        },
        {
            id: uuid(),
            title: 'four',
            active: false
        },
        {
            id: uuid(),
            title: 'five',
            active: false
        },
        {
            id: uuid(),
            title: 'six',
            active: false
        },
        {
            id: uuid(),
            title: 'seven',
            active: false
        },
        {
            id: uuid(),
            title: 'eight',
            active: false
        },
        {
            id: uuid(),
            title: 'nine',
            active: false
        },
        {
            id: uuid(),
            title: 'ten',
            active: false
        },
        {
            id: uuid(),
            title: 'eleven',
            active: false
        },
        {
            id: uuid(),
            title: 'twelve',
            active: false
        },
        {
            id: uuid(),
            title: 'thirteen',
            active: false
        },
        {
            id: uuid(),
            title: 'fourteen',
            active: false
        },
        {
            id: uuid(),
            title: 'fifteen',
            active: false
        },
        {
            id: uuid(),
            title: 'sixteen',
            active: false
        },
        {
            id: uuid(),
            title: 'seventeen',
            active: false
        },
        {
            id: uuid(),
            title: 'eighteen',
            active: false
        },
        {
            id: uuid(),
            title: 'nineteen',
            active: false
        },
        {
            id: uuid(),
            title: 'twenty',
            active: false
        },
    ];

    @observable itemsWidth: number[] = [];
    @observable wrapperWidth: number = window.innerWidth * 0.5;
    @observable limit: number = this.items.length;
    @observable offset: number = 0;
    @observable reverseOffset: number = 0;
    @observable lastReverseItem: number = 0;
    @observable activeItemIndex: number = 0;
    @observable limitCounter: number = 0;
    @observable summaryItemWidth: number = 0;

    // cuts visible items during resize
    cutVisibleItems() {
        let lastIndex = this.info.visible.length-1;
         //if last item is active, cuts from left to right
        if (this.info.visible[lastIndex].active) {
            this.lastReverseItem = this.items.findIndex(item => item.active) + 1;
            this.reverseOffset = this.items.reverse().findIndex(item => item.active);
            this.getVisibleItems(true);
            return;
        }

        this.getVisibleItems(false);
        return;
    }

    //screen resize
    @action resizeScreenWidth = (e: any) => {
        const newScreenWidth = e.target.innerWidth * 0.5;
       
        if( this.wrapperWidth > newScreenWidth) {
            this.wrapperWidth = newScreenWidth;
            this.cutVisibleItems();
            
        } else if(this.wrapperWidth < newScreenWidth) {
            this.wrapperWidth = newScreenWidth;
            this.getVisibleItems(false);
        };
    };

    //set item width
    @action getItemCurrentWidth = (item: any) => {
        this.itemsWidth.push(item.width);
    }

    //gets the number of elements for the new screen size
    @action getVisibleItems = (reverse: boolean) => {
        this.summaryItemWidth = 0;
        this.limitCounter = 0;
       
        const copy = [...this.itemsWidth];
       
        if (reverse) {
            this.offset = this.reverseOffset;
            copy.reverse();
        }

        copy.slice(this.offset).forEach((width) => {
            if (this.summaryItemWidth < this.wrapperWidth) {
                this.summaryItemWidth += width + 40;
                this.limitCounter++;
                this.limit = this.limitCounter;
            }
        });
        if (reverse) {
            this.offset = this.lastReverseItem - this.limit;
        }
    }

    //click any item on screen
    @action toggleItem = (id: string) => {
        this.items = this.items.map((item, index) => {
            if (item.id === id) {
                this.activeItemIndex = index;
                return {
                    ...item,
                    active: true
                }
            } else {
                return {
                    ...item,
                    active: false
                }
            };
        });
    };

    // prev/next button click
    @action changeActiveItem = (idx: number) => {
        this.items = this.items.map((item, index, arr) => {

            //last item right click
            if (idx === arr.length) {
                this.offset = 0;
                this.limit = 0;
                this.activeItemIndex = 0;
                idx = 0;
                this.getVisibleItems(false);
            }
            //first item left click
            if (idx < 0) {
                this.activeItemIndex = idx = arr.length - 1;
                this.lastReverseItem = arr.length;
                this.reverseOffset = 0;
                this.getVisibleItems(true)
            }
            //next offset
            if (this.limit + this.offset === idx) {
                this.offset = idx;
                this.getVisibleItems(false);
            }
            //prev offset
            if (idx < this.offset) {
                this.reverseOffset = arr.length - this.offset
                this.lastReverseItem = idx + 1
                this.getVisibleItems(true);
            }
            //prev/next button click
            if (index === idx) {
                return {
                    ...item,
                    active: true
                }
            }
            return {
                ...item,
                active: false
            }
        });

        this.activeItemIndex = idx;
    }

    //get visible items at this moment
    @computed get info() {
        return {
            visible: this.items.slice(this.offset, this.limit + this.offset)
        }
    }

}

export const paginatorStore = new PaginatorStore()
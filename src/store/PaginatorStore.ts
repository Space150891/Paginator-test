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
            active: true,
            width: 0
        },
        {
            id: uuid(),
            title: 'two',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'three',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'four',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'five',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'six',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'seven',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'eight',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'nine',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'ten',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'eleven',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'twelve',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'thirteen',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'fourteen',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'fifteen',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'sixteen',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'seventeen',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'eighteen',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'nineteen',
            active: false,
            width: 0
        },
        {
            id: uuid(),
            title: 'twenty',
            active: false,
            width: 0
        },
    ];

    @observable itemsWidth: number[] = []
    @observable wrapperWidth: number = window.innerWidth * 0.5;
    @observable limit: number = this.items.length;
    @observable offset: number = 0;
    @observable reverseOffset: number = 0;
    @observable lastReverseItem: number = 0;
    @observable activeItemIndex: number = 0;
    @observable limitCounter: number = 0;
    @observable summaryItemWidth: number = 0;

    cutVisibleItems() {
        let lastIndex = this.items.slice(this.offset, this.limit).length-1;
        console.log("CUT LIMIT", this.limit);
        console.log("CUT OFFSET", this.offset)
        if (this.items.slice(this.offset, this.limit)[lastIndex].active) {
            console.log("THIS IS ACTIVE ______________________")
            this.offset++;

            return;
        }
        this.limit--;
        return;
        
    }

    @action resizeScreenWidth = (e: any) => {
        const newScreenWidth = e.target.innerWidth * 0.5;
        console.log("NEW WIDTH", newScreenWidth);

        if( this.wrapperWidth > newScreenWidth) {
            this.wrapperWidth = newScreenWidth;
            this.cutVisibleItems();
            this.getVisibleItems(false);
            
            console.log("VISIBLE", this.items.slice(this.offset, this.limit))
        } else if(this.wrapperWidth < newScreenWidth) {
            this.wrapperWidth = newScreenWidth;
            this.getVisibleItems(false);
            console.log("DONE+++++++")
            console.log("VISIBLE DONE", this.items.slice(this.offset, this.limit))
        } 
    }

    @action getItemCurrentWidth = (item: any) => {
        this.itemsWidth.push(item.width);
    }

    @action getVisibleItems = (reverse: boolean) => {
        this.summaryItemWidth = 0;
        this.limitCounter = 0;
        console.log("-----------------------------------")
        const copy = [...this.itemsWidth];
        console.log("REVERSE OFFSET", this.reverseOffset)

        if (reverse) {
            console.log("FIRST REVERSE_________-----______")
            this.offset = this.reverseOffset
            copy.reverse()
        }
        copy.slice(this.offset).forEach((width) => {
            //  console.log("ITEM", width)
            //  console.log("SUMARTY BEFORE", this.summaryItemWidth)
            if (this.summaryItemWidth < this.wrapperWidth) {
                this.summaryItemWidth += width + 40;
                this.limitCounter++;
                this.limit = this.limitCounter;

                // console.log("IF LIMIT COUNTER", this.limitCounter)
                //  console.log("SUMARTY AFTER", this.summaryItemWidth)
            }
        })

        if (reverse) {
            console.log("SECOND REVERSE ++++______-------");
            this.offset = this.lastReverseItem - this.limit;
            
        }
        console.log("LAST REVERSE ITEM", this.lastReverseItem);
        console.log("LIMIT", this.limit);
        console.log("OFFSET", this.offset);
    }

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
            }
        })
    }

    @action changeActiveItem = (idx: number) => {
        this.items = this.items.map((item, index, arr) => {
            //last item right click
            if (idx === arr.length) {
                this.offset = 0;
                this.limit = 0;
                this.activeItemIndex = 0;
                idx = 0;
                this.getVisibleItems(false)
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

    @computed get info() {
        return {
            visible: this.items.slice(this.offset, this.limit)
        }
    }

}

export const paginatorStore = new PaginatorStore()
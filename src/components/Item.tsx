import React from "react";
import { observer } from "mobx-react";
import { IPaginateItem } from "../interfaces/Item";

interface ItemProps {
    item: IPaginateItem,
    toggleItem(id: string): void
}


const PaginateItem: React.FC<ItemProps> = (props) => {
    const { item, toggleItem } = props

    return (
        <>
            <span
                className={item.active ? 'item active' : 'item'}
                onClick={() => toggleItem(item.id)}
            >
                {item.title}
            </span>
        </>
    );
};

export default observer(PaginateItem);
import React from "react";
import { observer } from "mobx-react";
import { paginatorStore } from "../store/PaginatorStore";
import PaginateItem from "./Item";

const PaginateContainer: React.FC = () => {
    const {
        items,
        limit,
        offset,
        activeItemIndex,
        toggleItem,
        changeActiveItem

    } = paginatorStore;

    return (
        <div className="btn-wrapper">
            <button className="btn prev-btn" onClick={() => changeActiveItem(activeItemIndex - 1)}> {`<`} </button>
            <div className='item-wrapper'>
                {items.slice(offset, limit + offset).map((item, index) => {
                    return (
                        <PaginateItem
                            key={index + item.id}
                            item={item}
                            toggleItem={toggleItem}
                        />
                    )
                })}
            </div>
            <button className="btn next-btn" onClick={() => changeActiveItem(activeItemIndex + 1)}> {`>`} </button>
        </div>


    );
};

export default observer(PaginateContainer);
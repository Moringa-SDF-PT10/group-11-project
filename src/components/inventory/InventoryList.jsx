import React from "react";
import InventoryItem from "./InventoryItem";

function InventoryList({ items, onDeleteItem }) {
  return (
    <div className="inventory-list">
      {items.map((item) => (
        <InventoryItem
          key={item.id}
          {...item}
          onDelete={() => onDeleteItem(item.id)}
        />
      ))}
    </div>
  );
}

export default InventoryList;

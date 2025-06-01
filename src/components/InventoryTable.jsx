import React from "react";
import InventoryItem from "./InventoryItem";

function InventoryTable({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="inventory-list">
      {items.map((item) => (
        <InventoryItem
          key={item.id}
          id={item.id}
          name={item.name}
          quantity={item.quantity}
          category={item.category}
          onDeleteItem={onDeleteItem}
          onUpdateItem={onUpdateItem}
        />
      ))}
    </div>
  );
}

export default InventoryTable;

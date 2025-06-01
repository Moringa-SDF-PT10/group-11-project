import React from "react";
import InventoryItem from "./InventoryItem";

function InventoryList({ items = [] }) {
  return (
    <div>
      <h2>Inventory Items</h2>
      <ul>
        {items.map((item) => (
          <InventoryItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default InventoryList;

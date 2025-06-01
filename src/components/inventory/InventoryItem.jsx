import React from "react";

function InventoryItem({ name, quantity, category }) {
  return (
    <div className="inventory-item">
      <h4>{name}</h4>
      <p>Quantity: {quantity}</p>
      <p>Category: {category}</p>
    </div>
  );
}

export default InventoryItem;

import React from "react";

function InventoryItem({ name, quantity, category, onDelete }) {
  return (
    <div className="inventory-item">
      <h4>{name}</h4>
      <p>Quantity: {quantity}</p>
      <p>Category: {category}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default InventoryItem;

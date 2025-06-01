import React, { useState } from "react";

function InventoryItem({ id, name, quantity, category, onDeleteItem, onUpdateItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedQuantity, setEditedQuantity] = useState(quantity);
  const [editedCategory, setEditedCategory] = useState(category);

  function handleSave() {
    onUpdateItem({
      id,
      name: editedName,
      quantity: parseInt(editedQuantity),
      category: editedCategory,
    });
    setIsEditing(false);
  }

  return (
    <div className="inventory-item">
      {isEditing ? (
        <>
          <input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
          <input
            type="number"
            value={editedQuantity}
            onChange={(e) => setEditedQuantity(e.target.value)}
          />
          <select value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)}>
            <option value="General">General</option>
            <option value="Stationery">Stationery</option>
            <option value="Electronics">Electronics</option>
          </select>
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h4>{name}</h4>
          <p>Quantity: {quantity}</p>
          <p>Category: {category}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => onDeleteItem(id)}>Delete</button>
    </div>
  );
}

export default InventoryItem;

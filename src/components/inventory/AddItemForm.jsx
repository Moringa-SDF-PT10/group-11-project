import React, { useState } from "react";

function AddItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("General");

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(), 
      name,
      quantity: parseInt(quantity),
      category,
    };

    onAddItem(newItem);
    setName("");
    setQuantity("");
    setCategory("General");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Inventory Item</h3>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="General">General</option>
        <option value="Stationery">Stationery</option>
        <option value="Electronics">Electronics</option>
      </select>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;

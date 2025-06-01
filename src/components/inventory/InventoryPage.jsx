import React, { useState } from "react";
import InventoryList from "./InventoryList";
import AddItemForm from "./AddItemForm";

// Initial sample data
const initialInventory = [
  { id: 1, name: "Paper", quantity: 50, category: "Stationery" },
  { id: 2, name: "Staplers", quantity: 15, category: "Stationery" },
  { id: 3, name: "Printer Toner", quantity: 5, category: "Electronics" },
];

function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);

  // Add new item
  function handleAddItem(newItem) {
    setInventory((prevItems) => [...prevItems, newItem]);
  }

  // Delete item by ID
  function handleDeleteItem(id) {
    setInventory((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  // Update item details
  function handleUpdateItem(id, updatedFields) {
    setInventory((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    );
  }

  return (
    <section className="inventory-page">
      <h2>Inventory Management</h2>
      <AddItemForm onAddItem={handleAddItem} />
      <InventoryList
        items={inventory}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
    </section>
  );
}

export default InventoryPage;

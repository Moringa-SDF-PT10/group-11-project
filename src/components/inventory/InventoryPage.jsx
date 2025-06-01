import React, { useState } from "react";
import InventoryList from "./InventoryList";
import AddItemForm from "./AddItemForm";

const initialInventory = [
  { id: 1, name: "Paper", quantity: 50, category: "Stationery" },
  { id: 2, name: "Staplers", quantity: 15, category: "Stationery" },
  { id: 3, name: "Printer Toner", quantity: 5, category: "Electronics" },
];

function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);

  function handleAddItem(newItem) {
    setInventory([...inventory, newItem]);
  }

  function handleDeleteItem(id) {
    const updatedInventory = inventory.filter((item) => item.id !== id);
    setInventory(updatedInventory);
  }

  return (
    <section className="inventory-page">
      <h2>Inventory</h2>
      <AddItemForm onAddItem={handleAddItem} />
      <InventoryList items={inventory} onDeleteItem={handleDeleteItem} />
    </section>
  );
}

export default InventoryPage;

import React, { useState } from "react";
import InventoryList from "./InventoryList";
import AddItemForm from "./AddItemForm";

function InventoryPage() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Paper", quantity: 50, category: "Stationery" },
    { id: 2, name: "Staplers", quantity: 15, category: "Stationery" },
    { id: 3, name: "Printer Toner", quantity: 5, category: "Electronics" },
  ]);

  function handleAddItem(newItem) {
    setInventory((prevInventory) => [...prevInventory, newItem]);
  }

  return (
    <section className="inventory-page">
      <h2>Inventory</h2>
      <AddItemForm onAddItem={handleAddItem} />
      <InventoryList items={inventory} />
    </section>
  );
}

export default InventoryPage;

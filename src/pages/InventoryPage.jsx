import React, { useState } from "react";
import InventoryTable from "../components/InventoryTable"
import ItemForm from "../components/ItemForm";

const initialInventory = [
  { id: 1, name: "Paper", quantity: 50, category: "Stationery" },
  { id: 2, name: "Staplers", quantity: 15, category: "Stationery" },
  { id: 3, name: "Printer Toner", quantity: 5, category: "Electronics" },
];

function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);

  function handleAddItem(newItem) {
    setInventory((prevItems) => [...prevItems, newItem]);
  }

  function handleDeleteItem(id) {
    setInventory((prevItems) => prevItems.filter((item) => item.id !== id));
  }

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
      <ItemForm onAddItem={handleAddItem} />
      <InventoryTable
        items={inventory}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
    </section>
  );
}

export default InventoryPage;

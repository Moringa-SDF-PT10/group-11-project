import React, { useState } from "react";
import InventoryTable from "../components/InventoryTable";
import ItemForm from "../components/ItemForm";

const initialInventory = [
  { id: 1, name: "Paper", quantity: 50, category: "Stationery" },
  { id: 2, name: "Staplers", quantity: 15, category: "Stationery" },
  { id: 3, name: "Printer Toner", quantity: 5, category: "Electronics" },
];

function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddItem = (newItem) => {
    setInventory((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = (id) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id, updatedFields) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const filteredItems = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="inventory-page">
      <h2>Inventory Management</h2>

      <ItemForm onAddItem={handleAddItem} />

      {/* Filter/Search Controls Inline */}
      <div className="search-filter-controls">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Stationery">Stationery</option>
          <option value="Electronics">Electronics</option>
          <option value="General">General</option>
        </select>
      </div>

      <InventoryTable
        items={filteredItems}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
    </section>
  );
}

export default InventoryPage;

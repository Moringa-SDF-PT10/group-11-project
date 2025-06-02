import React, { useState } from "react";
import InventoryTable from "../components/InventoryTable";
import ItemForm from "../components/ItemForm";

function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Optional: Hook this up to a filtering prop if your InventoryTable supports it later
  const handleDeleteItem = (id) => {
    // This is handled internally in InventoryTable's fetch logic
    console.log("Deleted item with ID:", id);
  };

  const handleUpdateItem = (id, updatedFields) => {
    // Reserved for future updates
    console.log("Updated item:", id, updatedFields);
  };

  return (
    <section className="p-6 inventory-page">
      <h2 className="text-2xl font-semibold mb-4">Inventory Management</h2>

      <ItemForm onAddItem={() => window.location.reload()} />

      {/* Search and Filter Controls */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search items..."
          className="border px-3 py-2 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="All">All Categories</option>
          <option value="Stationery">Stationery</option>
          <option value="Electronics">Electronics</option>
          <option value="General">General</option>
        </select>
      </div>

      <InventoryTable
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
    </section>
  );
}

export default InventoryPage;

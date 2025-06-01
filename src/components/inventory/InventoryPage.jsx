import React from "react";
import InventoryList from "./InventoryList";

const mockInventory = [
  { id: 1, name: "Paper", quantity: 50, category: "Stationery" },
  { id: 2, name: "Staplers", quantity: 15, category: "Stationery" },
  { id: 3, name: "Printer Toner", quantity: 5, category: "Electronics" },
];

function InventoryPage() {
  return (
    <section className="inventory-page">
      <h2>Inventory</h2>
      <InventoryList items={mockInventory} />
    </section>
  );
}

export default InventoryPage;

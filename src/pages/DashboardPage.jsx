import React, { useEffect, useState } from "react";

// DashboardPage: Main dashboard for Warehouse Management System
const DashboardPage = () => {
  const [items, setItems] = useState([]);
  const [loadingInventory, setLoadingInventory] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);

  useEffect(() => {
    // Fetch inventory items
    setLoadingInventory(true);
    fetch("http://localhost:3001/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoadingInventory(false));
  }, []);

  useEffect(() => {
    // Fetch suppliers
    setLoadingSuppliers(true);
    fetch("http://localhost:3000/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch(() => setSuppliers([]))
      .finally(() => setLoadingSuppliers(false));
  }, []);

  // Dashboard metrics
  const totalItems = items.length;
  const lowStockItems = items.filter(item => (item.stock ?? item.quantity) < 10).length;
  const totalSuppliers = suppliers.length;

  // Recent activity (example: last 5 added items)
  const recentItems = [...items]
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    .slice(0, 5);

  return (
    <div className="dashboard-container p-8">
      <h1 className="text-3xl font-bold mb-6">Warehouse Dashboard</h1>
      <section className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6 text-center">
          <div className="text-2xl font-bold">{loadingInventory ? "..." : totalItems}</div>
          <div>Total Items</div>
        </div>
        <div className="bg-white shadow rounded p-6 text-center">
          <div className="text-2xl font-bold">{loadingInventory ? "..." : lowStockItems}</div>
          <div>Low Stock (&lt;10)</div>
        </div>
        <div className="bg-white shadow rounded p-6 text-center">
          <div className="text-2xl font-bold">{loadingSuppliers ? "..." : totalSuppliers}</div>
          <div>Suppliers</div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recently Updated Items</h2>
        {loadingInventory ? (
          <div>Loading...</div>
        ) : (
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Stock</th>
                <th className="px-4 py-2 border">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {recentItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    No recent items.
                  </td>
                </tr>
              ) : (
                recentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.id}</td>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.stock ?? item.quantity}</td>
                    <td className="border px-4 py-2">{item.lastUpdated || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Suppliers</h2>
        {loadingSuppliers ? (
          <div>Loading...</div>
        ) : suppliers.length === 0 ? (
          <div>No suppliers found.</div>
        ) : (
          <ul className="list-disc ml-6">
            {suppliers.slice(0, 5).map((supplier) => (
              <li key={supplier.id}>{supplier.name}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
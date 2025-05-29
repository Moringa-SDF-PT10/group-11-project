import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InventoryTable = () => {
  const [items, setItems] = useState([]);

  const fetchItems = () => {
    fetch("http://localhost:3001/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    await fetch(`http://localhost:3001/items/${id}`, {
      method: "DELETE",
    });

    fetchItems();
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4">Inventory</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Last Updated</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.stock}</td>
              <td className="border px-4 py-2">{item.lastUpdated}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/edit-item/${item.id}`}
                  className="text-blue-600 hover:underline mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;

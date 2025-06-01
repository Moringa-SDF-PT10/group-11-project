import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddItemPage = () => {
  const [formData, setFormData] = useState({ name: "", stock: 0 });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    await fetch("http://localhost:3001/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    navigate("/inventory");
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-xl font-bold mb-4">Add New Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Stock</label>
          <input
            name="stock"
            type="number"
            required
            min="0"
            value={formData.stock}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", stock: 0 });

  useEffect(() => {
    fetch(`http://localhost:3001/items/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedItem = {
      ...formData,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    await fetch(`http://localhost:3001/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });

    navigate("/inventory");
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-xl font-bold mb-4">Edit Item</h1>
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
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditItemPage;

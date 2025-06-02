import React, { useState, useEffect } from 'react';
import SupplierCard from '../components/SupplierCard';
import SupplierForm from '../components/SupplierForm';
import './SuppliersPage.css';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // FETCH suppliers from json-server
  useEffect(() => {
    fetch("http://localhost:3000/suppliers")
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(error => console.error("Error fetching suppliers:", error));
  }, []);

  const handleAddSupplier = (newSupplier) => {
    fetch("http://localhost:3000/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSupplier)
    })
      .then(res => res.json())
      .then(addedSupplier => {
        setSuppliers(prev => [...prev, addedSupplier]);
        setEditingSupplier(null);
      })
      .catch(err => console.error("Error adding supplier:", err));
  };

  const handleDeleteSupplier = (id) => {
    fetch(`http://localhost:3000/suppliers/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
      })
      .catch(err => console.error("Error deleting supplier:", err));
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
  };

  const handleUpdateSupplier = (updatedSupplier) => {
    fetch(`http://localhost:3000/suppliers/${updatedSupplier.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedSupplier)
    })
      .then(res => res.json())
      .then(updated => {
        setSuppliers(prev =>
          prev.map(supplier =>
            supplier.id === updated.id ? updated : supplier
          )
        );
        setEditingSupplier(null);
      })
      .catch(err => console.error("Error updating supplier:", err));
  };

  return (
    <div className="suppliers-container">
      <h1>Supplier Management</h1>

      <SupplierForm
        onAddSupplier={handleAddSupplier}
        onUpdateSupplier={handleUpdateSupplier}
        editingSupplier={editingSupplier}
      />

      {suppliers.length > 0 ? (
        suppliers.map(supplier => (
          <SupplierCard
            key={supplier.id}
            supplier={supplier}
            onDelete={handleDeleteSupplier}
            onEdit={handleEditSupplier}
          />
        ))
      ) : (
        <p>No suppliers added yet.</p>
      )}
    </div>
  );
};

export default SuppliersPage;

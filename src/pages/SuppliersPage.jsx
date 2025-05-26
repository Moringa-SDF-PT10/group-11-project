import React, { useState } from 'react';
import SupplierCard from '../components/SupplierCard';
import SupplierForm from '../components/SupplierForm';
import './SuppliersPage.css';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const handleAddSupplier = (newSupplier) => {
    setSuppliers(prev => [...prev, newSupplier]);
    setEditingSupplier(null);
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
  };

  const handleUpdateSupplier = (updatedSupplier) => {
    setSuppliers(prev =>
      prev.map(supplier => (supplier.id === updatedSupplier.id ? updatedSupplier : supplier))
    );
    setEditingSupplier(null);
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

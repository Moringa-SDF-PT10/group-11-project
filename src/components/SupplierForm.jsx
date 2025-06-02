import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SupplierForm = ({ onAddSupplier, onUpdateSupplier, editingSupplier }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [suppliedItems, setSuppliedItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (editingSupplier) {
      setName(editingSupplier.name);
      setContact(editingSupplier.contact);
      setPhone(editingSupplier.phone);
      setSuppliedItems(editingSupplier.suppliedItems || []);
    } else {
      setName('');
      setContact('');
      setPhone('');
      setSuppliedItems([]);
    }
    setNewItem('');
  }, [editingSupplier]);

  const handleAddItem = () => {
    const trimmedItem = newItem.trim();
    if (trimmedItem && !suppliedItems.includes(trimmedItem)) {
      setSuppliedItems([...suppliedItems, trimmedItem]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setSuppliedItems(suppliedItems.filter(item => item !== itemToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !contact || !phone) {
      alert('Please fill in all fields');
      return;
    }

    const supplierData = {
      id: editingSupplier ? editingSupplier.id : uuidv4(),
      name,
      contact,
      phone,
      suppliedItems,
    };

    if (editingSupplier) {
      onUpdateSupplier(supplierData);
    } else {
      onAddSupplier(supplierData);
    }

    setName('');
    setContact('');
    setPhone('');
    setSuppliedItems([]);
    setNewItem('');
  };

  return (
    <form onSubmit={handleSubmit} className="supplier-form">
      <input
        type="text"
        placeholder="Supplier Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Contact Person"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <div className="supplied-items-input-group">
        <input
          type="text"
          placeholder="Add Supplied Item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="button" onClick={handleAddItem} className="add-item-btn">
          Add
        </button>
      </div>

      {suppliedItems.length > 0 && (
        <ul className="supplied-items-list">
          {suppliedItems.map((item, idx) => (
            <li key={idx}>
              {item}
              <button
                type="button"
                onClick={() => handleRemoveItem(item)}
                className="remove-item-btn"
                aria-label={`Remove ${item}`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}

      <button type="submit" className="submit-btn">
        {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
      </button>
    </form>
  );
};

export default SupplierForm;

import React from 'react';

const SupplierCard = ({ supplier, onDelete, onEdit }) => {
  return (
    <div className="supplier-card">
      <h3>{supplier.name}</h3>
      <p><strong>Contact:</strong> {supplier.contact}</p>
      <p><strong>Phone:</strong> {supplier.phone}</p>

      {supplier.suppliedItems && supplier.suppliedItems.length > 0 && (
        <div>
          <div className="supplied-items-title">Supplied Items:</div>
          <ul className="supplied-items-list-card">
            {supplier.suppliedItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="button-group">
        <button onClick={() => onEdit(supplier)} className="button-edit">
          Edit
        </button>
        <button onClick={() => onDelete(supplier.id)} className="button-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default SupplierCard;

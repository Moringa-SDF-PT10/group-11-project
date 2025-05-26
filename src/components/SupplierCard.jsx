import React from 'react';

const SupplierCard = ({ supplier }) => {
  return (
    <div style={styles.card}>
      <h3>{supplier.name}</h3>
      <p><strong>Contact:</strong> {supplier.contact}</p>
      <p><strong>Phone:</strong> {supplier.phone}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: '#f9f9f9',
  }
};

export default SupplierCard;
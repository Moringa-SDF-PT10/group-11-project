import React, { useState, useEffect } from 'react';
import { dummySuppliers } from '../data/dummyData';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Load the suppliers from dummy data
    setSuppliers(dummySuppliers);
  }, []);

  return (
    <div>
      <h1>Suppliers</h1>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            <strong>{supplier.name}</strong><br />
            Contact: {supplier.contact}<br />
            Phone: {supplier.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuppliersPage;
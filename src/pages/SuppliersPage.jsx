import React, { useState, useEffect } from 'react';
import { dummySuppliers } from '../data/dummyData';
import SupplierCard from '../components/SupplierCard';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Load the suppliers from dummy data
    setSuppliers(dummySuppliers);
  }, []);

  return (
    <div>
      <h1>Suppliers</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {suppliers.map((supplier) => (
             <li key={supplier.id}>
               <SupplierCard supplier={supplier} />
            </li>
        ))}
        
      </ul>
    </div>
  );
};

export default SuppliersPage;
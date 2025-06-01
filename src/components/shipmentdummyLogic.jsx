import React, { useState, useEffect } from 'react';
import { Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Plus, Search } from 'lucide-react';

const WarehouseShipmentSystem = () => {
  const [shipments, setShipments] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newShipment, setNewShipment] = useState({
    id: '',
    recipient: '',
    address: '',
    items: '',
    weight: '',
    priority: 'standard'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Shipment statuses
  const statuses = ['pending', 'processing', 'shipped', 'in-transit', 'delivered'];
  
  // Generate dummy tracking ID
  const generateTrackingId = () => {
    return 'WMS' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  // Fetch random addresses for demo purposes
  const fetchRandomAddresses = async () => {
    try {
      setLoading(true);
      // Using JSONPlaceholder for demo addresses
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      
      const formattedAddresses = users.map(user => ({
        id: user.id,
        name: user.name,
        address: `${user.address.street}, ${user.address.city}`,
        zipcode: user.address.zipcode,
        company: user.company.name
      }));
      
      setAddresses(formattedAddresses);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      // Fallback dummy data
      setAddresses([
        { id: 1, name: 'John Doe', address: '123 Main St, New York', zipcode: '10001', company: 'Tech Corp' },
        { id: 2, name: 'Jane Smith', address: '456 Oak Ave, Los Angeles', zipcode: '90210', company: 'Design Studio' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Initialize with sample data
  useEffect(() => {
    fetchRandomAddresses();
    
    // Sample shipments
    const sampleShipments = [
      {
        id: generateTrackingId(),
        recipient: 'Alice Johnson',
        address: '789 Pine St, Chicago, IL 60601',
        items: 'Electronics Package (2 items)',
        weight: '3.5 kg',
        priority: 'express',
        status: 'in-transit',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: generateTrackingId(),
        recipient: 'Bob Wilson',
        address: '321 Elm Dr, Seattle, WA 98101',
        items: 'Office Supplies (5 items)',
        weight: '1.2 kg',
        priority: 'standard',
        status: 'processing',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      }
    ];
    
    setShipments(sampleShipments);
  }, []);

  // Create new shipment
  const createShipment = () => {
    if (!newShipment.recipient || !newShipment.address || !newShipment.items) {
      alert('Please fill in all required fields');
      return;
    }

    const shipment = {
      id: generateTrackingId(),
      ...newShipment,
      status: 'pending',
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + (newShipment.priority === 'express' ? 2 : 5) * 24 * 60 * 60 * 1000)
    };

    setShipments(prev => [shipment, ...prev]);
    setNewShipment({
      id: '',
      recipient: '',
      address: '',
      items: '',
      weight: '',
      priority: 'standard'
    });
  };

  // Update shipment status
  const updateShipmentStatus = (shipmentId) => {
    setShipments(prev => prev.map(shipment => {
      if (shipment.id === shipmentId) {
        const currentIndex = statuses.indexOf(shipment.status);
        const nextStatus = statuses[Math.min(currentIndex + 1, statuses.length - 1)];
        return { ...shipment, status: nextStatus };
      }
      return shipment;
    }));
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'in-transit': return 'text-orange-600 bg-orange-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': case 'in-transit': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Filter shipments
  const filteredShipments = shipments.filter(shipment =>
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Warehouse Management System</h1>
          <p className="text-gray-600">Manage and track shipments efficiently</p>
        </div>

        {/* Create New Shipment */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Create New Shipment
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name *</label>
              <input
                type="text"
                value={newShipment.recipient}
                onChange={(e) => setNewShipment(prev => ({ ...prev, recipient: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter recipient name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
              <input
                type="text"
                value={newShipment.address}
                onChange={(e) => setNewShipment(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter delivery address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Items Description *</label>
              <input
                type="text"
                value={newShipment.items}
                onChange={(e) => setNewShipment(prev => ({ ...prev, items: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Electronics (3 items)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <input
                type="text"
                value={newShipment.weight}
                onChange={(e) => setNewShipment(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2.5 kg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newShipment.priority}
                onChange={(e) => setNewShipment(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="standard">Standard</option>
                <option value="express">Express</option>
                <option value="overnight">Overnight</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={createShipment}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Shipment
              </button>
            </div>
          </div>
        </div>

        {/* Quick Address Selection */}
        {addresses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Quick Address Selection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addresses.slice(0, 6).map(addr => (
                <div
                  key={addr.id}
                  onClick={() => setNewShipment(prev => ({
                    ...prev,
                    recipient: addr.name,
                    address: `${addr.address}, ${addr.zipcode}`
                  }))}
                  className="p-3 border border-gray-200 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-sm">{addr.name}</div>
                  <div className="text-xs text-gray-600">{addr.company}</div>
                  <div className="text-xs text-gray-500 mt-1">{addr.address}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <Search className="w-5 h-5 mr-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by tracking ID, recipient, or address..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Shipments List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Active Shipments ({filteredShipments.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : filteredShipments.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              {searchTerm ? 'No shipments match your search.' : 'No shipments found. Create your first shipment above.'}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredShipments.map(shipment => (
                <div key={shipment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="font-semibold text-lg">{shipment.id}</span>
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(shipment.status)}`}>
                          {getStatusIcon(shipment.status)}
                          <span className="ml-1 capitalize">{shipment.status}</span>
                        </span>
                        {shipment.priority !== 'standard' && (
                          <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full capitalize">
                            {shipment.priority}
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <div className="flex items-center mb-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="font-medium">Recipient:</span> {shipment.recipient}
                          </div>
                          <div className="ml-5">{shipment.address}</div>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-1">
                            <Package className="w-4 h-4 mr-1" />
                            <span className="font-medium">Items:</span> {shipment.items}
                          </div>
                          {shipment.weight && (
                            <div className="ml-5">Weight: {shipment.weight}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-3 text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        Created: {shipment.createdAt.toLocaleDateString()} | 
                        Est. Delivery: {shipment.estimatedDelivery.toLocaleDateString()}
                      </div>
                    </div>
                    
                    {shipment.status !== 'delivered' && (
                      <button
                        onClick={() => updateShipmentStatus(shipment.id)}
                        className="ml-4 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                      >
                        Update Status
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          {statuses.map(status => {
            const count = shipments.filter(s => s.status === status).length;
            return (
              <div key={status} className="bg-white rounded-lg shadow-md p-4 text-center">
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-2 ${getStatusColor(status)}`}>
                  {getStatusIcon(status)}
                </div>
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600 capitalize">{status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WarehouseShipmentSystem;
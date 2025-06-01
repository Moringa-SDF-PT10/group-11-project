import React, { useState, useMemo } from 'react';
import { Search, Filter, Package, Truck, Calendar, MapPin, Eye, Edit, Plus, Download } from 'lucide-react';

const ShipmentUI = () => {
  const [activeTab, setActiveTab] = useState('inbound');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Sample shipment data
  const sampleShipments = {
    inbound: [
      {
        id: 'INB-001',
        reference: 'PO-2024-001',
        supplier: 'Njogawa Suppliers Inc.',
        origin: 'Shanghai, China',
        destination: 'New York, NY',
        status: 'in_transit',
        priority: 'high',
        estimatedArrival: '2025-06-15',
        actualArrival: null,
        items: 150,
        weight: '2,450 kg',
        value: '$45,600',
        carrier: 'DHL Express',
        trackingNumber: 'DHL123456789'
      },
      {
        id: 'INB-002',
        reference: 'PO-2024-002',
        supplier: 'Tech Today Ltd.',
        origin: 'Seoul, South Korea',
        destination: 'Kenya, NRB',
        status: 'delivered',
        priority: 'medium',
        estimatedArrival: '2025-06-10',
        actualArrival: '2025-06-09',
        items: 85,
        weight: '1,200 kg',
        value: '$28,900',
        carrier: 'FedEx',
        trackingNumber: 'FDX987654321'
      },
      {
        id: 'INB-003',
        reference: 'PO-2024-003',
        supplier: 'Global Materials Co.',
        origin: 'Mumbai, India',
        destination: 'Chicago, IL',
        status: 'pending',
        priority: 'low',
        estimatedArrival: '2024-06-20',
        actualArrival: null,
        items: 320,
        weight: '4,800 kg',
        value: '$67,200',
        carrier: 'UPS',
        trackingNumber: 'UPS456789123'
      }
    ],
    outbound: [
      {
        id: 'OUT-001',
        reference: 'SO-2024-001',
        customer: 'RetailCorp Inc.',
        origin: 'Dallas, TX',
        destination: 'Miami, FL',
        status: 'shipped',
        priority: 'high',
        estimatedDelivery: '2024-06-12',
        actualDelivery: null,
        items: 45,
        weight: '680 kg',
        value: '$12,400',
        carrier: 'FedEx',
        trackingNumber: 'FDX111222333'
      },
      {
        id: 'OUT-002',
        reference: 'SO-2024-002',
        customer: 'Wholesale Partners LLC',
        origin: 'Phoenix, AZ',
        destination: 'Denver, CO',
        status: 'preparing',
        priority: 'medium',
        estimatedDelivery: '2024-06-18',
        actualDelivery: null,
        items: 120,
        weight: '1,850 kg',
        value: '$34,700',
        carrier: 'UPS',
        trackingNumber: 'UPS789123456'
      },
      {
        id: 'OUT-003',
        reference: 'SO-2024-003',
        customer: 'Direct Sales Co.',
        origin: 'Atlanta, GA',
        destination: 'Boston, MA',
        status: 'delivered',
        priority: 'low',
        estimatedDelivery: '2024-06-08',
        actualDelivery: '2024-06-07',
        items: 25,
        weight: '340 kg',
        value: '$8,950',
        carrier: 'DHL',
        trackingNumber: 'DHL444555666'
      }
    ]
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    in_transit: 'bg-purple-100 text-purple-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    delayed: 'bg-red-100 text-red-800'
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800'
  };

  const filteredShipments = useMemo(() => {
    const shipments = sampleShipments[activeTab];
    return shipments.filter(shipment => {
      const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           shipment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (activeTab === 'inbound' ? shipment.supplier : shipment.customer)
                             .toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [activeTab, searchTerm, statusFilter, sampleShipments]);

  const getStatusOptions = () => {
    if (activeTab === 'inbound') {
      return ['all', 'pending', 'in_transit', 'delivered', 'delayed'];
    }
    return ['all', 'preparing', 'shipped', 'delivered', 'delayed'];
  };

  const ShipmentCard = ({ shipment }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{shipment.id}</h3>
          <p className="text-sm text-gray-600">{shipment.reference}</p>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[shipment.status]}`}>
            {shipment.status.replace('_', ' ').toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[shipment.priority]}`}>
            {shipment.priority.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-700">
            {activeTab === 'inbound' ? 'Supplier' : 'Customer'}
          </p>
          <p className="text-sm text-gray-600">
            {activeTab === 'inbound' ? shipment.supplier : shipment.customer}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Carrier</p>
          <p className="text-sm text-gray-600">{shipment.carrier}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{shipment.origin} → {shipment.destination}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <p className="font-medium text-gray-700">Items</p>
          <p className="text-gray-600">{shipment.items}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Weight</p>
          <p className="text-gray-600">{shipment.weight}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Value</p>
          <p className="text-gray-600">{shipment.value}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600">
          {activeTab === 'inbound' ? 'Est. Arrival' : 'Est. Delivery'}: 
          {' ' + new Date(activeTab === 'inbound' ? shipment.estimatedArrival : shipment.estimatedDelivery).toLocaleDateString()}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Tracking: <span className="font-mono">{shipment.trackingNumber}</span>
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedShipment(shipment)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ShipmentModal = ({ shipment, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Shipment Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Shipment Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">ID:</span> {shipment.id}</div>
                <div><span className="font-medium">Reference:</span> {shipment.reference}</div>
                <div><span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${statusColors[shipment.status]}`}>
                    {shipment.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div><span className="font-medium">Priority:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${priorityColors[shipment.priority]}`}>
                    {shipment.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Party Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">{activeTab === 'inbound' ? 'Supplier:' : 'Customer:'}</span> {activeTab === 'inbound' ? shipment.supplier : shipment.customer}</div>
                <div><span className="font-medium">Carrier:</span> {shipment.carrier}</div>
                <div><span className="font-medium">Tracking:</span> {shipment.trackingNumber}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Route</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Origin:</span> {shipment.origin}</div>
                <div><span className="font-medium">Destination:</span> {shipment.destination}</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Cargo Details</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Items:</span> {shipment.items}</div>
                <div><span className="font-medium">Weight:</span> {shipment.weight}</div>
                <div><span className="font-medium">Value:</span> {shipment.value}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Estimated {activeTab === 'inbound' ? 'Arrival' : 'Delivery'}:</span> {new Date(activeTab === 'inbound' ? shipment.estimatedArrival : shipment.estimatedDelivery).toLocaleDateString()}</div>
              {(shipment.actualArrival || shipment.actualDelivery) && (
                <div><span className="font-medium">Actual {activeTab === 'inbound' ? 'Arrival' : 'Delivery'}:</span> {new Date(activeTab === 'inbound' ? shipment.actualArrival : shipment.actualDelivery).toLocaleDateString()}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Shipment Management</h1>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                New Shipment
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('inbound')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'inbound'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 rotate-180" />
              Inbound ({sampleShipments.inbound.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('outbound')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'outbound'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Outbound ({sampleShipments.outbound.length})
            </div>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by ID, reference, or party..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {getStatusOptions().map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Shipments Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredShipments.map(shipment => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </div>

        {filteredShipments.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No shipments found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedShipment && (
        <ShipmentModal 
          shipment={selectedShipment} 
          onClose={() => setSelectedShipment(null)} 
        />
      )}
    </div>
  );
};

export default ShipmentUI;
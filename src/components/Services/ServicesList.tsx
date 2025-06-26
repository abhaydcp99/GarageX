import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign, User, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { DataStore } from '../../data/mockData';

export function ServicesList() {
  const { isAuthenticated } = useAuth();
  const [services] = useState(DataStore.getServices());
  const [filteredServices, setFilteredServices] = useState(services);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = ['all', ...new Set(services.map(s => s.category))];

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterServices(category, priceRange);
  };

  const handlePriceFilter = (range: string) => {
    setPriceRange(range);
    filterServices(selectedCategory, range);
  };

  const filterServices = (category: string, price: string) => {
    let filtered = services;

    if (category !== 'all') {
      filtered = filtered.filter(s => s.category === category);
    }

    if (price !== 'all') {
      switch (price) {
        case 'under-50':
          filtered = filtered.filter(s => s.price < 50);
          break;
        case '50-100':
          filtered = filtered.filter(s => s.price >= 50 && s.price <= 100);
          break;
        case 'over-100':
          filtered = filtered.filter(s => s.price > 100);
          break;
      }
    }

    setFilteredServices(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Services</h1>
          <p className="text-gray-600">Choose from our comprehensive range of car services</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-900">Filters</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => handlePriceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="under-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="over-100">Over $100</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <img 
                src={service.imageUrl} 
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-lg font-bold text-green-600">${service.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{service.duration} mins</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{service.providerName}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    service.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.isActive ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                {isAuthenticated ? (
                  <Link
                    to={`/book/${service.id}`}
                    className={`w-full py-2 px-4 rounded-lg text-center font-medium transition-colors ${
                      service.isActive
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {service.isActive ? 'Book Now' : 'Unavailable'}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                  >
                    Login to Book
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
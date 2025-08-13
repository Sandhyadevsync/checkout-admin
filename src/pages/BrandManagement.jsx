import { useState } from 'react';
import { useBrand } from '../contexts/BrandContext';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Building2,
    Globe,
    Calendar,
    CreditCard,
    CheckCircle,
    AlertCircle,
    Clock
} from 'lucide-react';
import Card from '../components/Card';
import { Table, TableRow, TableCell } from '../components/Table';

const BrandManagement = () => {
    const { brands, updateBrand, deleteBrand, createBrand } = useBrand();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [planFilter, setPlanFilter] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [newBrandData, setNewBrandData] = useState({
        name: '',
        domain: '',
        logo: '',
        theme: {
            primaryColor: '#F58220',
            secondaryColor: '#000000',
            accentColor: '#FF6B35'
        },
        settings: {
            currency: 'USD',
            timezone: 'America/New_York',
            language: 'en'
        }
    });

    // Filter brands based on search and filters
    const filteredBrands = brands.filter(brand => {
        const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.domain.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || brand.status === statusFilter;
        const matchesPlan = planFilter === 'all' || brand.subscription.plan === planFilter;

        return matchesSearch && matchesStatus && matchesPlan;
    });

    const handleCreateBrand = async (e) => {
        e.preventDefault();
        try {
            await createBrand(newBrandData);
            setNewBrandData({
                name: '',
                domain: '',
                logo: '',
                theme: {
                    primaryColor: '#F58220',
                    secondaryColor: '#000000',
                    accentColor: '#FF6B35'
                },
                settings: {
                    currency: 'USD',
                    timezone: 'America/New_York',
                    language: 'en'
                }
            });
            setShowCreateModal(false);
        } catch (error) {
            console.error('Failed to create brand:', error);
        }
    };

    const handleEditBrand = async (e) => {
        e.preventDefault();
        try {
            await updateBrand(editingBrand.id, editingBrand);
            setEditingBrand(null);
        } catch (error) {
            console.error('Failed to update brand:', error);
        }
    };

    const handleDeleteBrand = async (brandId) => {
        if (window.confirm('Are you sure you want to delete this brand? This action cannot be undone.')) {
            try {
                await deleteBrand(brandId);
            } catch (error) {
                console.error('Failed to delete brand:', error);
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'trial': return 'bg-yellow-100 text-yellow-800';
            case 'suspended': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPlanColor = (plan) => {
        switch (plan) {
            case 'pro': return 'bg-purple-100 text-purple-800';
            case 'basic': return 'bg-blue-100 text-blue-800';
            case 'trial': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
                    <p className="text-gray-600">Manage all brands and their subscriptions</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn-primary flex items-center space-x-2"
                >
                    <Plus size={16} />
                    <span>Add New Brand</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{brands.length}</div>
                            <div className="text-sm text-gray-600">Total Brands</div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle size={20} className="text-green-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {brands.filter(b => b.status === 'active').length}
                            </div>
                            <div className="text-sm text-gray-600">Active Brands</div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock size={20} className="text-yellow-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {brands.filter(b => b.status === 'trial').length}
                            </div>
                            <div className="text-sm text-gray-600">Trial Brands</div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <CreditCard size={20} className="text-purple-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {brands.filter(b => b.subscription.plan === 'pro').length}
                            </div>
                            <div className="text-sm text-gray-600">Pro Plans</div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search brands..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="trial">Trial</option>
                        <option value="suspended">Suspended</option>
                    </select>

                    <select
                        value={planFilter}
                        onChange={(e) => setPlanFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                        <option value="all">All Plans</option>
                        <option value="pro">Pro</option>
                        <option value="basic">Basic</option>
                        <option value="trial">Trial</option>
                    </select>
                </div>
            </Card>

            {/* Brands Table */}
            <Card>
                <div className="overflow-x-auto">
                    <Table>
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Brand
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Domain
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Plan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Expires
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBrands.map((brand) => (
                                <TableRow key={brand.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                                                {brand.logo ? (
                                                    <img
                                                        src={brand.logo}
                                                        alt={brand.name}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <Building2 size={20} className="text-white" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{brand.name}</div>
                                                <div className="text-sm text-gray-500">ID: {brand.id}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Globe size={16} className="text-gray-400" />
                                            <span className="text-gray-900">{brand.domain}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(brand.status)}`}>
                                            {brand.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getPlanColor(brand.subscription.plan)}`}>
                                            {brand.subscription.plan}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={16} className="text-gray-400" />
                                            <span className="text-gray-900">{brand.subscription.expiresAt}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setEditingBrand(brand)}
                                                className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBrand(brand.id)}
                                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card>

            {/* Create Brand Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Create New Brand</h3>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleCreateBrand} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Brand Name *
                                </label>
                                <input
                                    type="text"
                                    value={newBrandData.name}
                                    onChange={(e) => setNewBrandData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Enter brand name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Domain *
                                </label>
                                <input
                                    type="text"
                                    value={newBrandData.domain}
                                    onChange={(e) => setNewBrandData(prev => ({ ...prev, domain: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="yourstore.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Logo URL
                                </label>
                                <input
                                    type="url"
                                    value={newBrandData.logo}
                                    onChange={(e) => setNewBrandData(prev => ({ ...prev, logo: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="https://example.com/logo.png"
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                                >
                                    Create Brand
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Brand Modal */}
            {editingBrand && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Edit Brand</h3>
                            <button
                                onClick={() => setEditingBrand(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleEditBrand} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Brand Name *
                                </label>
                                <input
                                    type="text"
                                    value={editingBrand.name}
                                    onChange={(e) => setEditingBrand(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Domain *
                                </label>
                                <input
                                    type="text"
                                    value={editingBrand.domain}
                                    onChange={(e) => setEditingBrand(prev => ({ ...prev, domain: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={editingBrand.status}
                                    onChange={(e) => setEditingBrand(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="trial">Trial</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Plan
                                </label>
                                <select
                                    value={editingBrand.subscription.plan}
                                    onChange={(e) => setEditingBrand(prev => ({
                                        ...prev,
                                        subscription: { ...prev.subscription, plan: e.target.value }
                                    }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="trial">Trial</option>
                                    <option value="basic">Basic</option>
                                    <option value="pro">Pro</option>
                                </select>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingBrand(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                                >
                                    Update Brand
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrandManagement;

import { useState } from 'react';
import { ChevronDown, Building2, Check, Plus, Settings } from 'lucide-react';
import { useBrand } from '../contexts/BrandContext';

const BrandSwitcher = () => {
    const { currentBrand, brands, switchBrand, createBrand } = useBrand();
    const [isOpen, setIsOpen] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newBrandData, setNewBrandData] = useState({
        name: '',
        domain: '',
        logo: ''
    });

    const handleBrandSwitch = (brandId) => {
        switchBrand(brandId);
        setIsOpen(false);
    };

    const handleCreateBrand = async (e) => {
        e.preventDefault();
        try {
            await createBrand(newBrandData);
            setNewBrandData({ name: '', domain: '', logo: '' });
            setShowCreateModal(false);
        } catch (error) {
            console.error('Failed to create brand:', error);
        }
    };

    if (!currentBrand) return null;

    return (
        <>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                >
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                        {currentBrand.logo ? (
                            <img
                                src={currentBrand.logo}
                                alt={currentBrand.name}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        ) : (
                            <Building2 size={16} className="text-white" />
                        )}
                    </div>
                    <div className="text-left">
                        <div className="text-sm font-medium text-white">{currentBrand.name}</div>
                        <div className="text-xs text-gray-400">{currentBrand.domain}</div>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Switch Brand</h3>
                            <p className="text-sm text-gray-600">Select a different brand to manage</p>
                        </div>

                        <div className="max-h-64 overflow-y-auto">
                            {brands.map((brand) => (
                                <button
                                    key={brand.id}
                                    onClick={() => handleBrandSwitch(brand.id)}
                                    className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors ${currentBrand.id === brand.id ? 'bg-orange-50 border-r-2 border-orange-500' : ''
                                        }`}
                                >
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
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-gray-900">{brand.name}</div>
                                        <div className="text-sm text-gray-600">{brand.domain}</div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className={`px-2 py-1 text-xs rounded-full ${brand.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {brand.status}
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${brand.subscription.plan === 'pro'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : brand.subscription.plan === 'basic'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {brand.subscription.plan}
                                            </span>
                                        </div>
                                    </div>
                                    {currentBrand.id === brand.id && (
                                        <Check size={20} className="text-orange-500" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-200">
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                            >
                                <Plus size={16} />
                                <span>Create New Brand</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Brand Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
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
                                    Brand Name
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
                                    Domain
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
                                    Logo URL (Optional)
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
        </>
    );
};

export default BrandSwitcher;

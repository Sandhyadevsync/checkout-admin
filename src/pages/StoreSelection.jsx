import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Building2,
    Plus,
    ArrowRight,
    Globe,
    ShoppingBag,
    Smartphone,
    Users,
    TrendingUp
} from 'lucide-react';

const StoreSelection = () => {
    const navigate = useNavigate();
    const [selectedStore, setSelectedStore] = useState(null);

    // Mock existing stores data
    const existingStores = [
        {
            id: 'store-1',
            name: 'Korin Mi',
            domain: 'korinmi.in',
            logo: '/logos/korinmi-logo.png',
            type: 'electronics',
            status: 'active'
        },
        {
            id: 'store-2',
            name: 'DevSync Tech',
            domain: 'www.devsynctech.co',
            logo: '/logos/devsync-logo.png',
            type: 'technology',
            status: 'active'
        }
    ];

    const handleStoreSelect = (store) => {
        setSelectedStore(store);
        // Navigate to checkout setup for existing store
        navigate('/checkout-setup', { state: { store, isExisting: true } });
    };

    const handleNewStore = () => {
        // Navigate to checkout setup for new store
        navigate('/checkout-setup', { state: { isExisting: false } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Background Illustrations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Left side illustration */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-96 h-96 opacity-10">
                    <div className="relative w-full h-full">
                        <div className="absolute left-0 top-0 w-32 h-32 bg-purple-200 rounded-full blur-xl"></div>
                        <div className="absolute left-20 top-20 w-24 h-24 bg-blue-200 rounded-full blur-xl"></div>
                        <div className="absolute left-40 top-40 w-20 h-20 bg-green-200 rounded-full blur-xl"></div>
                    </div>
                </div>

                {/* Right side illustration */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-96 h-96 opacity-10">
                    <div className="relative w-full h-full">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-orange-200 rounded-full blur-xl"></div>
                        <div className="absolute right-20 top-20 w-24 h-24 bg-red-200 rounded-xl blur-xl"></div>
                        <div className="absolute right-40 top-40 w-20 h-20 bg-yellow-200 rounded-xl blur-xl"></div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6">
                    <Link to="/login" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                        <ArrowRight size={20} className="rotate-180 mr-2" />
                        Back to Login
                    </Link>

                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                            <Building2 size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
                            <p className="text-sm text-gray-600">Admin Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-4xl">
                        {/* Title */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Open your existing store or set up a brand-new store
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Choose from your existing stores or create a new one to get started with our powerful checkout solution
                            </p>
                        </div>

                        {/* Store Options */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Existing Stores */}
                            {existingStores.map((store, index) => (
                                <div
                                    key={store.id}
                                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                    onClick={() => handleStoreSelect(store)}
                                >
                                    <div className="text-center">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                            {store.logo ? (
                                                <img
                                                    src={store.logo}
                                                    alt={store.name}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <Building2 size={32} className="text-white" />
                                            )}
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{store.name}</h3>
                                        <div className="flex items-center justify-center text-gray-600 mb-4">
                                            <Globe size={16} className="mr-2" />
                                            <span className="text-sm">{store.domain}</span>
                                        </div>

                                        <button className="w-full py-3 px-4 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                                            Open Store
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* New Store */}
                            <div
                                className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                onClick={handleNewStore}
                            >
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                        <Plus size={32} className="text-white" />
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">New Store</h3>
                                    <p className="text-gray-600 mb-4">Create a brand new store</p>

                                    <button className="w-full py-3 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                                        Add New Store
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                                Why choose our checkout solution?
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                                        <ShoppingBag size={24} className="text-blue-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Easy Setup</h4>
                                    <p className="text-sm text-gray-600">Get started in minutes with our simple setup process</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                        <Smartphone size={24} className="text-green-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Mobile Optimized</h4>
                                    <p className="text-sm text-gray-600">Perfect checkout experience on all devices</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Users size={24} className="text-purple-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Multi-Store</h4>
                                    <p className="text-sm text-gray-600">Manage multiple stores from one dashboard</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                        <TrendingUp size={24} className="text-orange-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Analytics</h4>
                                    <p className="text-sm text-gray-600">Track performance and optimize conversions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreSelection;

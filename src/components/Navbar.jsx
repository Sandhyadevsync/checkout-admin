import { useState } from 'react';
import { Wallet, RefreshCw, Sparkles, TrendingUp } from 'lucide-react';
import { useBrand } from '../contexts/BrandContext';

const Navbar = () => {
    const [showRechargeModal, setShowRechargeModal] = useState(false);
    const { currentBrand } = useBrand();

    const handleRefreshWallet = () => {
        // Handle wallet refresh logic
        console.log('Refreshing wallet...');
    };

    if (!currentBrand) return null;

    return (
        <nav className="bg-gradient-to-r from-slate-50 via-white to-slate-50 text-gray-800 px-8 py-4 shadow-lg border-b border-gray-100 backdrop-blur-sm">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Left side - Company Logo only */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 group">
                        <div className="relative">
                            <img
                                src="/devsync-logo.png"
                                alt="DevSync Logo"
                                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                </div>

                {/* Right side - Enhanced Actions */}
                <div className="flex items-center space-x-6">
                    {/* Enhanced Wallet Section */}
                    <div className="relative group">
                        <div className="flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-pink-50 px-4 py-3 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                            <div className="relative">
                                <Wallet size={18} className="text-orange-500 drop-shadow-sm" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-semibold text-gray-800">₹15,420.50</div>
                                <div className="text-xs text-gray-500 font-medium">Available</div>
                            </div>
                            <button
                                onClick={handleRefreshWallet}
                                className="p-2 hover:bg-orange-100 rounded-lg transition-all duration-300 hover:rotate-180"
                            >
                                <RefreshCw size={14} className="text-orange-500" />
                            </button>
                        </div>
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-pink-400/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setShowRechargeModal(true)}
                            className="relative group px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center space-x-2">
                                <Sparkles size={16} className="group-hover:animate-spin" />
                                <span>+ Recharge</span>
                            </div>
                        </button>

                        <button className="relative group px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center space-x-2">
                                <TrendingUp size={16} className="group-hover:animate-bounce" />
                                <span>₹ Pricing</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 
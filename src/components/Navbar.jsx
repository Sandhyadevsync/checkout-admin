import { useState } from 'react';
import {
    Wallet,
    RefreshCw,
    Plus,
    IndianRupee,
    Bell,
    User
} from 'lucide-react';

const Navbar = ({ currentSection = 'Dashboard' }) => {
    const [walletBalance, setWalletBalance] = useState(15420.50);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefreshWallet = () => {
        setIsRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setWalletBalance(prev => prev + Math.random() * 100);
            setIsRefreshing(false);
        }, 1000);
    };

    const handleRechargeWallet = () => {
        // Open recharge modal or navigate to recharge page
        alert('Recharge wallet functionality will be implemented here');
    };

    return (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Left side - Current Section */}
                <div className="flex items-center">
                    <h1 className="text-xl font-semibold text-gray-900">{currentSection}</h1>
                </div>

                {/* Right side - Wallet and Actions */}
                <div className="flex items-center space-x-4">
                    {/* Wallet Section */}
                    <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
                        <Wallet className="text-gray-600" size={20} />
                        <div className="text-sm">

                            <div className="font-semibold text-gray-900">
                                ₹{walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                        <button
                            onClick={handleRefreshWallet}
                            disabled={isRefreshing}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                            <RefreshCw
                                className={`text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`}
                                size={16}
                            />
                        </button>
                    </div>

                    {/* Recharge Button */}
                    <button
                        onClick={handleRechargeWallet}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <Plus size={16} />
                        <span>Recharge Wallet</span>
                    </button>

                    {/* Pricing */}
                    <button className="btn-secondary flex items-center space-x-2">
                        <IndianRupee size={16} />
                        <span>Pricing</span>
                    </button>

                    {/* Notifications */}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <Bell className="text-gray-600" size={20} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            3
                        </span>
                    </button>

                    {/* User Profile */}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <User className="text-gray-600" size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar; 
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
        <div className="bg-white border-b border-[#D3D3D3] px-4 py-3">
            <div className="flex items-center justify-between">
                {/* Left side - Current Section */}
                <div className="flex items-center">
                    <h1 className="text-base font-semibold text-[#000000]">{currentSection}</h1>
                </div>

                {/* Right side - Wallet and Actions */}
                <div className="flex items-center space-x-3">
                    {/* Wallet Section */}
                    <div className="flex items-center space-x-2 bg-[#F5F5F5] px-3 py-1.5 rounded-lg">
                        <Wallet className="text-[#333333]" size={16} />
                        <div className="text-sm">
                            <div className="font-semibold text-[#000000]">
                                ₹{walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                        <button
                            onClick={handleRefreshWallet}
                            disabled={isRefreshing}
                            className="p-1 hover:bg-[#D3D3D3] rounded transition-colors"
                        >
                            <RefreshCw
                                className={`text-[#333333] ${isRefreshing ? 'animate-spin' : ''}`}
                                size={14}
                            />
                        </button>
                    </div>

                    {/* Recharge Button */}
                    <button
                        onClick={handleRechargeWallet}
                        className="btn-primary flex items-center space-x-1.5"
                    >
                        <Plus size={14} />
                        <span>Recharge</span>
                    </button>

                    {/* Pricing */}
                    <button className="btn-primary flex items-center space-x-1.5">
                        <IndianRupee size={14} />
                        <span>Pricing</span>
                    </button>

                    {/* Notifications */}
                    <button className="p-1.5 hover:bg-[#F5F5F5] rounded-lg transition-colors relative">
                        <Bell className="text-[#333333]" size={16} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            3
                        </span>
                    </button>

                    {/* User Profile */}
                    <button className="p-1.5 hover:bg-[#F5F5F5] rounded-lg transition-colors">
                        <User className="text-[#333333]" size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar; 
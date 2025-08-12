import { useState } from 'react';
import {
    Wallet,
    RefreshCw,
    Plus,
    IndianRupee,
    Bell,
    User
} from 'lucide-react';
import RechargeWalletModal from './RechargeWalletModal';

const Navbar = ({ currentSection = 'Dashboard' }) => {
    const [walletBalance, setWalletBalance] = useState(15420.50);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showRechargeModal, setShowRechargeModal] = useState(false);

    const handleRefreshWallet = () => {
        setIsRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setWalletBalance(prev => prev + Math.random() * 100);
            setIsRefreshing(false);
        }, 1000);
    };

    const handleRechargeWallet = () => {
        setShowRechargeModal(true);
    };

    const handleCloseRechargeModal = () => {
        setShowRechargeModal(false);
    };

    return (
        <>
            <div className="bg-white border-b border-[#D3D3D3] px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Left side - Logo and Current Section */}
                    <div className="flex items-center space-x-4">
                        {/* Company Logo */}
                        <div className="flex items-center">
                            <img
                                src="/devsync-logo.png"
                                alt="DevSync Checkout Logo"
                                className="w-12 h-12 object-contain"
                                onError={(e) => {
                                    // Fallback to text if image fails to load
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            {/* Fallback text logo */}
                            <div className="relative hidden">
                                {/* Diagonal lines on left */}
                                <div className="absolute -left-2 top-0 flex flex-col gap-0.5">
                                    <div className="w-1 h-1 bg-[#F58220] transform rotate-45"></div>
                                    <div className="w-1 h-1 bg-[#F58220] transform rotate-45"></div>
                                    <div className="w-1 h-1 bg-[#F58220] transform rotate-45"></div>
                                </div>
                                {/* Main D letter */}
                                <div className="w-6 h-6 bg-[#F58220] rounded-sm flex items-center justify-center">
                                    <span className="text-black font-bold text-sm">D</span>
                                </div>
                                {/* Diagonal lines on right */}
                                <div className="absolute -right-1 top-0 flex flex-col gap-0.5">
                                    <div className="w-1 h-1 bg-[#F58220] transform rotate-45"></div>
                                    <div className="w-1 h-1 bg-[#F58220] transform rotate-45"></div>
                                </div>
                                {/* Corner accent */}
                                <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-[#F58220] transform rotate-45"></div>
                                {/* Horizontal line */}
                                <div className="absolute -right-3 top-2 w-2 h-0.5 bg-[#F58220]"></div>
                            </div>
                        </div>

                        {/* Current Section */}
                        <div className="border-l border-gray-300 pl-4">
                            <h1 className="text-base font-semibold text-[#000000]">{currentSection}</h1>
                        </div>
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

                        
                    </div>
                </div>
            </div>

            {/* Recharge Wallet Modal */}
            <RechargeWalletModal
                isOpen={showRechargeModal}
                onClose={handleCloseRechargeModal}
                currentBalance={walletBalance}
            />
        </>
    );
};

export default Navbar; 
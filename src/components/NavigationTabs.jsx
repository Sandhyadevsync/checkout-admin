import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingCart,
    ShoppingBag,
    Wallet,
    Settings,
    BarChart3,
    Users,
    Clock,
    TrendingDown,
    CreditCard,
    ChevronDown,
    Building2
} from 'lucide-react';

const NavigationTabs = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();

    const handleDropdownToggle = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const isActive = (path) => {
        if (path === '/dashboard') return location.pathname === '/dashboard';
        return location.pathname.startsWith(path);
    };

    return (
        <div className="bg-black border-b border-gray-800">
            <div className="px-6 py-4 pb-8">
                <div className="flex items-center space-x-3 overflow-x-auto">

                    {/* Dashboard */}
                    <Link
                        to="/dashboard"
                        className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${isActive('/dashboard')
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </Link>

                    {/* Orders Dropdown */}
                    <div className="relative flex-shrink-0">
                        <button
                            onClick={() => handleDropdownToggle('orders')}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/orders') || isActive('/pending-orders')
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <ShoppingCart size={18} />
                            <span>Orders</span>
                            <ChevronDown size={16} className={`ml-1 transition-transform ${openDropdown === 'orders' ? 'rotate-180' : ''}`} />
                        </button>

                        {openDropdown === 'orders' && (
                            <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-[9999]">
                                <Link
                                    to="/orders"
                                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white border-b border-gray-600"
                                >
                                    <div className="flex items-center space-x-2">
                                        <ShoppingCart size={16} />
                                        <span>Orders</span>
                                    </div>
                                </Link>
                                <Link
                                    to="/pending-orders"
                                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Clock size={16} />
                                        <span>Pending Orders</span>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Abandoned Carts */}
                    <Link
                        to="/abandoned-carts"
                        className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${isActive('/abandoned-carts')
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <ShoppingBag size={18} />
                        <span>Abandoned Carts</span>
                    </Link>

                    {/* Finance Dropdown */}
                    <div className="relative flex-shrink-0">
                        <button
                            onClick={() => handleDropdownToggle('finance')}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/finance') || isActive('/refunds') || isActive('/wallet') || isActive('/settlement-history') || isActive('/rewards-history')
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <Wallet size={18} />
                            <span>Finance</span>
                            <ChevronDown size={16} className={`ml-1 transition-transform ${openDropdown === 'finance' ? 'rotate-180' : ''}`} />
                        </button>

                        {openDropdown === 'finance' && (
                            <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-[9999]">
                                <Link
                                    to="/finance"
                                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white border-b border-gray-600"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Wallet size={16} />
                                        <span>Customer Finance</span>
                                    </div>
                                </Link>
                                <Link
                                    to="/refunds"
                                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white border-b border-gray-600"
                                >
                                    <div className="flex items-center space-x-2">
                                        <TrendingDown size={16} />
                                        <span>Refunds</span>
                                    </div>
                                </Link>
                                <Link
                                    to="/wallet"
                                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white border-b border-gray-600"
                                >
                                    <div className="flex items-center space-x-2">
                                        <CreditCard size={16} />
                                        <span>Wallet</span>
                                    </div>
                                </Link>
                                <Link
                                    to="/settlement-history"
                                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white border-b border-gray-600"
                                >
                                    <div className="flex items-center space-x-2">
                                        <BarChart3 size={16} />
                                        <span>Settlement History</span>
                                    </div>
                                </Link>
                                <Link
                                    to="/rewards-history"
                                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    <div className="flex items-center space-x-2">
                                        <BarChart3 size={16} />
                                        <span>Rewards History</span>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Reports */}
                    <Link
                        to="/reports"
                        className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${isActive('/reports')
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <BarChart3 size={18} />
                        <span>Reports</span>
                    </Link>

                    {/* User Management */}
                    <Link
                        to="/user-management"
                        className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${isActive('/user-management')
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <Users size={18} />
                        <span>User Management</span>
                    </Link>

                    {/* Settings */}
                    <Link
                        to="/settings"
                        className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${isActive('/settings')
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default NavigationTabs;

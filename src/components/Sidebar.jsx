import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingCart,
    ShoppingBag,
    Wallet,
    Settings,
    BarChart3,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Orders', icon: ShoppingCart, path: '/orders' },
        { name: 'Abandoned Carts', icon: ShoppingBag, path: '/abandoned-carts' },
        { name: 'Finance', icon: Wallet, path: '/finance' },
        { name: 'Reports', icon: BarChart3, path: '/reports' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const isExpanded = !collapsed || isHovered;

    return (
        <div
            className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} p-4 border-b border-gray-200`}>
                    {isExpanded && (
                        <h1 className="text-xl font-bold text-gray-900">DevSync Checkout</h1>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`sidebar-item ${isActive(item.path) ? 'active' : ''} ${!isExpanded ? '!justify-center !gap-0 !px-2' : isActive(item.path) ? '!border-r-2 !border-primary-600' : ''}`}
                                title={!isExpanded ? item.name : ''}
                            >
                                <Icon size={20} />
                                {isExpanded && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                {isExpanded && (
                    <div className="p-4 border-t border-gray-200">
                        <div className="text-xs text-gray-500">
                            © 2024 Checkout Admin
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar; 
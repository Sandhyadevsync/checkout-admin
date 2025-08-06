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
            className={`bg-[#000000] border-r border-[#2B2B2B] h-screen transition-all duration-300 relative overflow-hidden ${isExpanded ? 'w-64' : 'w-16'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col h-full relative z-10">
                {/* Header */}
                <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} p-3 border-b border-[#2B2B2B] bg-[#000000]`}>
                    {isExpanded ? (
                        <div className="flex items-center gap-2">
                            {/* Logo */}
                            <div className="flex items-center">
                                <img
                                    src="/logo.webp"
                                    alt="DevSync Checkout Logo"
                                    className="w-8 h-8 object-contain"
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
                            <h1 className="text-base font-semibold text-white">DevSync Checkout</h1>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            {/* Logo for collapsed state */}
                            <img
                                src="/logo.webp"
                                alt="DevSync Checkout Logo"
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                    // Fallback to CSS logo if image fails to load
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            {/* Fallback CSS logo for collapsed state */}
                            <div className="relative hidden">
                                {/* Diagonal lines on left */}
                                <div className="absolute -left-1.5 top-0 flex flex-col gap-0.5">
                                    <div className="w-0.5 h-0.5 bg-[#F58220] transform rotate-45"></div>
                                    <div className="w-0.5 h-0.5 bg-[#F58220] transform rotate-45"></div>
                                    <div className="w-0.5 h-0.5 bg-[#F58220] transform rotate-45"></div>
                                </div>
                                {/* Main D letter */}
                                <div className="w-6 h-6 bg-[#F58220] rounded-sm flex items-center justify-center">
                                    <span className="text-black font-bold text-xs">D</span>
                                </div>
                                {/* Diagonal lines on right */}
                                <div className="absolute -right-0.5 top-0 flex flex-col gap-0.5">
                                    <div className="w-0.5 h-0.5 bg-[#F58220] transform rotate-45"></div>
                                    <div className="w-0.5 h-0.5 bg-[#F58220] transform rotate-45"></div>
                                </div>
                                {/* Corner accent */}
                                <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-[#F58220] transform rotate-45"></div>
                                {/* Horizontal line */}
                                <div className="absolute -right-2 top-1.5 w-1.5 h-0.5 bg-[#F58220]"></div>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-lg hover:bg-[#2B2B2B] transition-colors text-white"
                    >
                        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1.5">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`sidebar-item ${isActive(item.path) ? 'active' : ''} ${!isExpanded ? '!justify-center !gap-0 !px-2' : ''}`}
                                title={!isExpanded ? item.name : ''}
                            >
                                <Icon size={18} className={`${isActive(item.path) ? 'text-[#F58220]' : 'text-gray-400'} transition-colors duration-200`} />
                                {isExpanded && <span className={`font-medium ${isActive(item.path) ? 'text-[#F58220]' : 'text-gray-400'}`}>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                {isExpanded && (
                    <div className="p-3 bg-[#000000]">
                        <div className="text-xs text-gray-400 font-medium">
                            © 2025 Devsync Checkout
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar; 
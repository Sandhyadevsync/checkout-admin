import { useState } from 'react';
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
    CreditCard
} from 'lucide-react';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [expandedSections, setExpandedSections] = useState(new Set(['orders']));
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/', type: 'item' },
        {
            name: 'Orders',
            icon: ShoppingCart,
            path: '/orders',
            type: 'section',
            children: [
                { name: 'Orders', path: '/orders', icon: ShoppingCart },
                { name: 'Pending Orders', path: '/pending-orders', icon: Clock }
            ]
        },
        { name: 'Abandoned Carts', icon: ShoppingBag, path: '/abandoned-carts', type: 'item' },
        {
            name: 'Finance',
            icon: Wallet,
            path: '/finance',
            type: 'section',
            children: [
                { name: 'Customer Finance', path: '/finance', icon: Wallet },
                { name: 'Refunds', path: '/refunds', icon: TrendingDown },
                { name: 'Wallet', path: '/wallet', icon: CreditCard },
                { name: 'Settlement History', path: '/settlement-history', icon: BarChart3 },
                { name: 'Rewards History', path: '/rewards-history', icon: BarChart3 }
            ]
        },
        { name: 'Reports', icon: BarChart3, path: '/reports', type: 'item' },
        { name: 'User Management', icon: Users, path: '/user-management', type: 'item' },
        { name: 'Settings', icon: Settings, path: '/settings', type: 'item' },
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const isExpanded = !collapsed || isHovered;

    const toggleSection = (sectionName) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionName)) {
                newSet.delete(sectionName);
            } else {
                newSet.add(sectionName);
            }
            return newSet;
        });
    };

    return (
        <div
            className={`bg-[#1E1E1E] border-r border-[#2D2D2D] h-screen transition-all duration-500 ease-in-out relative overflow-hidden ${isExpanded ? 'w-64' : 'w-16'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setCollapsed(!collapsed)}
        >
            <div className="flex flex-col h-full relative z-10">
                {/* Header */}
                <div className={`flex items-center ${isExpanded ? 'justify-center' : 'justify-center'} p-4 border-b border-[#2D2D2D] bg-white`}>
                    {isExpanded ? (
                        <div className="flex items-center gap-3">
                            {/* Logo */}
                            <div className="flex items-center">
                                <img
                                    src="/devsync-logo.png"
                                    alt="DevSync Checkout Logo"
                                    className="w-14 h-14 object-contain"
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
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            {/* Logo for collapsed state */}
                            <img
                                src="/logo-1.png"
                                alt="DevSync Checkout Logo"
                                className="w-12 h-12 object-contain"
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
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        if (item.type === 'section') {
                            const isSectionExpanded = expandedSections.has(item.name.toLowerCase());
                            const hasActiveChild = item.children?.some(child => isActive(child.path));

                            return (
                                <div key={item.name}>
                                    <button
                                        onClick={() => toggleSection(item.name.toLowerCase())}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${hasActiveChild ? 'bg-[#2D2D2D] text-[#F58220]' : 'text-gray-400 hover:bg-[#2D2D2D] hover:text-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Icon size={20} />
                                            {isExpanded && <span className="font-medium text-sm">{item.name}</span>}
                                        </div>
                                        {isExpanded && (
                                            <span className={`transform transition-transform duration-200 ${isSectionExpanded ? 'rotate-180' : ''}`}>
                                                ▼
                                            </span>
                                        )}
                                    </button>

                                    {isExpanded && isSectionExpanded && (
                                        <div className="ml-6 mt-2 space-y-1">
                                            {item.children.map((child) => {
                                                const ChildIcon = child.icon;
                                                return (
                                                    <Link
                                                        key={child.name}
                                                        to={child.path}
                                                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive(child.path)
                                                            ? 'bg-[#F58220] text-white'
                                                            : 'text-gray-400 hover:bg-[#2D2D2D] hover:text-gray-300'
                                                            }`}
                                                    >
                                                        <ChildIcon size={16} />
                                                        <span>{child.name}</span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`sidebar-item ${isActive(item.path) ? 'active' : ''} ${!isExpanded ? '!justify-center !gap-0 !px-2' : ''}`}
                                title={!isExpanded ? item.name : ''}
                            >
                                <Icon size={20} className={`${isActive(item.path) ? 'text-[#F58220]' : 'text-gray-400'} transition-colors duration-200`} />
                                {isExpanded && <span className={`font-medium text-sm ${isActive(item.path) ? 'text-[#F58220]' : 'text-gray-400'}`}>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                {isExpanded && (
                    <div className="p-4 bg-[#1E1E1E] border-t border-[#2D2D2D]">
                        <div className="text-xs text-gray-400 font-medium">
                            © 2025 DevSync Checkout
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

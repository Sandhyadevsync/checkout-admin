import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
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
    ChevronDown
} from 'lucide-react';

const NavigationTabs = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({});
    const location = useLocation();
    const dropdownRefs = useRef({});

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

    const toggleDropdown = (sectionName) => {
        console.log('toggleDropdown called with:', sectionName);
        console.log('Current activeDropdown:', activeDropdown);
        
        if (activeDropdown === sectionName) {
            setActiveDropdown(null);
            console.log('Closing dropdown for:', sectionName);
        } else {
            // Calculate dropdown position
            const buttonElement = dropdownRefs.current[sectionName]?.querySelector('button');
            if (buttonElement) {
                const rect = buttonElement.getBoundingClientRect();
                setDropdownPosition({
                    top: rect.bottom + window.scrollY + 4,
                    left: rect.left + window.scrollX,
                    width: rect.width
                });
            }
            setActiveDropdown(sectionName);
            console.log('Opening dropdown for:', sectionName);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeDropdown && !dropdownRefs.current[activeDropdown]?.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdown]);

    // Close dropdown when route changes
    useEffect(() => {
        setActiveDropdown(null);
    }, [location.pathname]);

    const renderDropdownPortal = (item) => {
        if (!activeDropdown || activeDropdown !== item.name) return null;

        console.log('Rendering dropdown portal for:', item.name, 'Position:', dropdownPosition);

        return createPortal(
            <div 
                className="fixed bg-white border border-gray-200 rounded-lg shadow-xl z-[9999]"
                style={{
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    width: Math.max(224, dropdownPosition.width),
                    minWidth: 'max-content'
                }}
            >
                <div className="py-2">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-200">
                        Debug: {item.name} dropdown at ({dropdownPosition.top}, {dropdownPosition.left})
                    </div>
                    {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                            <Link
                                key={child.name}
                                to={child.path}
                                onClick={() => setActiveDropdown(null)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-50 ${
                                    isActive(child.path)
                                        ? 'bg-[#F58220] text-white'
                                        : 'text-gray-700'
                                }`}
                            >
                                <ChildIcon size={16} />
                                <span>{child.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>,
            document.body
        );
    };

    return (
        <div className="bg-white border-b border-gray-200 px-4 py-2">
            {/* Debug Info */}
            <div className="text-xs text-gray-500 mb-2">
                Active Dropdown: {activeDropdown || 'None'} | 
                Location: {location.pathname}
                <button 
                    onClick={() => toggleDropdown('Orders')}
                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs"
                >
                    Test Orders Dropdown
                </button>
                <button 
                    onClick={() => toggleDropdown('Finance')}
                    className="ml-2 px-2 py-1 bg-green-500 text-white rounded text-xs"
                >
                    Test Finance Dropdown
                </button>
            </div>
            
            <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
                {navigation.map((item) => {
                    const Icon = item.icon;

                    if (item.type === 'section') {
                        const hasActiveChild = item.children?.some(child => isActive(child.path));
                        const isDropdownOpen = activeDropdown === item.name;

                        return (
                            <div key={item.name} className="relative" ref={el => dropdownRefs.current[item.name] = el}>
                                <button
                                    onClick={() => toggleDropdown(item.name)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${hasActiveChild
                                            ? 'bg-[#F58220] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span>{item.name}</span>
                                    <ChevronDown
                                        size={14}
                                        className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {/* Dropdown for section children */}
                                {/* Dropdowns are now rendered as portals below */}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${isActive(item.path)
                                    ? 'bg-[#F58220] text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <Icon size={16} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </div>
            
            {/* Render all dropdowns as portals */}
            {navigation.filter(item => item.type === 'section').map(item => renderDropdownPortal(item))}
        </div>
    );
};

export default NavigationTabs;

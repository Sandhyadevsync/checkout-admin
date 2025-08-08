import { useState } from 'react';
import {
    Building,
    ChevronUp,
    ChevronDown,
    Percent,
    Truck,
    CreditCard,
    Package,
    Globe,
    MapPin as MapPinIcon
} from 'lucide-react';

// Import reusable settings components
import GeneralSettings from '../components/settings/GeneralSettings';
import DiscountSettings from '../components/settings/DiscountSettings';
import ShippingSettings from '../components/settings/ShippingSettings';
import PaymentSettings from '../components/settings/PaymentSettings';
import PlatformSettings from '../components/settings/PlatformSettings';
import TrackingSettings from '../components/settings/TrackingSettings';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('general');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const settingsSections = [
        { id: 'general', name: 'General Settings', icon: Building },
        { id: 'discounts', name: 'Discounts', icon: Percent },
        { id: 'shipping', name: 'Shipping Settings', icon: Truck },
        { id: 'payment', name: 'Payment', icon: CreditCard },
        { id: 'platform', name: 'Platform', icon: Globe },
        { id: 'tracking', name: 'Tracking Info', icon: MapPinIcon }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'general':
                return <GeneralSettings />;
            case 'discounts':
                return <DiscountSettings />;
            case 'shipping':
                return <ShippingSettings />;
            case 'payment':
                return <PaymentSettings />;
            case 'platform':
                return <PlatformSettings />;
            case 'tracking':
                return <TrackingSettings />;
            default:
                return <GeneralSettings />;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-full">
            {/* Settings Sidebar */}
            <div className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-[#D3D3D3] p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#000000]">Settings</h2>
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isSidebarCollapsed ? (
                            <ChevronDown size={16} className="text-[#333333]" />
                        ) : (
                            <ChevronUp size={16} className="text-[#333333]" />
                        )}
                    </button>
                    <div className="hidden lg:block">
                        <ChevronUp size={16} className="text-[#333333]" />
                    </div>
                </div>

                <nav className={`space-y-1 transition-all duration-300 ${isSidebarCollapsed ? 'hidden lg:block' : 'block'}`}>
                    {settingsSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => {
                                    setActiveSection(section.id);
                                    // Auto-collapse on mobile after selection
                                    if (window.innerWidth < 1024) {
                                        setIsSidebarCollapsed(true);
                                    }
                                }}
                                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${activeSection === section.id
                                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                                    : 'text-[#333333] hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={16} />
                                <span className="text-sm font-medium">{section.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default Settings; 
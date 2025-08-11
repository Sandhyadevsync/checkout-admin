import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Menu, X } from 'lucide-react';

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const getCurrentSection = () => {
        switch (location.pathname) {
            case '/':
                return 'Dashboard';
            case '/orders':
                return 'Orders';
            case '/pending-orders': // Added for Pending Orders
                return 'Pending Orders';
            case '/abandoned-carts':
                return 'Abandoned Carts';
            case '/finance':
                return 'Customer Finance';
            case '/refunds':
                return 'Refunds';
            case '/wallet':
                return 'Wallet';
            case '/settlement-history':
                return 'Settlement History';
            case '/rewards-history':
                return 'Rewards History';
            case '/reports':
                return 'Reports';
            case '/user-management':
                return 'User Management';
            case '/settings':
                return 'Settings';
            default:
                return 'Dashboard';
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                >
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navbar */}
                <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/devsync-logo.png"
                                alt="DevSync Checkout Logo"
                                className="w-16 h-16 object-contain"
                                onError={(e) => {
                                    // Fallback to text if image fails to load
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span className="text-lg font-semibold text-gray-900 hidden">DevSync Checkout</span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                <Navbar currentSection={getCurrentSection()} />

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout; 
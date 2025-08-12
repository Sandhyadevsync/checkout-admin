import { useLocation } from 'react-router-dom';
import NavigationTabs from '../components/NavigationTabs';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
    const location = useLocation();

    const getCurrentSection = () => {
        const path = location.pathname;

        if (path === '/') return 'Dashboard';
        if (path === '/orders') return 'Orders';
        if (path === '/pending-orders') return 'Pending Orders';
        if (path === '/abandoned-carts') return 'Abandoned Carts';
        if (path === '/finance') return 'Customer Finance';
        if (path === '/refunds') return 'Refunds';
        if (path === '/wallet') return 'Wallet';
        if (path === '/settlement-history') return 'Settlement History';
        if (path === '/rewards-history') return 'Rewards History';
        if (path === '/user-management') return 'User Management';
        if (path === '/settings') return 'Settings';
        if (path === '/reports') return 'Reports';

        return 'Dashboard';
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Top navbar */}
            <Navbar currentSection={getCurrentSection()} />

            {/* Navigation Tabs */}
            <NavigationTabs />

            {/* Page content */}
            <main className="flex-1 overflow-y-auto p-4">
                {children}
            </main>
        </div>
    );
};

export default MainLayout; 
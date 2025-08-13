// Routes Configuration
// This file contains all the route definitions for the application

import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';
import PendingOrders from '../pages/PendingOrders';
import AbandonedCarts from '../pages/AbandonedCarts';
import Finance from '../pages/Finance';
import Refunds from '../pages/Refunds';
import Wallet from '../pages/Wallet';
import SettlementHistory from '../pages/SettlementHistory';
import RewardsHistory from '../pages/RewardsHistory';
import UserManagement from '../pages/UserManagement';
import Settings from '../pages/Settings';
import Reports from '../pages/Reports';
import BrandManagement from '../pages/BrandManagement';
import Login from '../pages/Login';
import StoreSelection from '../pages/StoreSelection';
import CheckoutSetup from '../pages/CheckoutSetup';

// Main application routes
export const appRoutes = [
    // SaaS Onboarding Routes (Public)
    {
        path: '/login',
        element: Login,
        name: 'Login',
        icon: 'LogIn',
        public: true
    },
    {
        path: '/store-selection',
        element: StoreSelection,
        name: 'Store Selection',
        icon: 'Building2',
        public: true
    },
    {
        path: '/checkout-setup',
        element: CheckoutSetup,
        name: 'Checkout Setup',
        icon: 'Settings',
        public: true
    },

    // Main Dashboard Routes (Protected)
    {
        path: '/dashboard',
        element: Dashboard,
        name: 'Dashboard',
        icon: 'LayoutDashboard'
    },
    {
        path: '/orders',
        element: Orders,
        name: 'Orders',
        icon: 'ShoppingCart'
    },
    {
        path: '/pending-orders',
        element: PendingOrders,
        name: 'Pending Orders',
        icon: 'Clock'
    },
    {
        path: '/abandoned-carts',
        element: AbandonedCarts,
        name: 'Abandoned Carts',
        icon: 'ShoppingBag'
    },
    {
        path: '/finance',
        element: Finance,
        name: 'Finance',
        icon: 'Wallet'
    },
    {
        path: '/refunds',
        element: Refunds,
        name: 'Refunds',
        icon: 'TrendingDown'
    },
    {
        path: '/wallet',
        element: Wallet,
        name: 'Wallet',
        icon: 'CreditCard'
    },
    {
        path: '/settlement-history',
        element: SettlementHistory,
        name: 'Settlement History',
        icon: 'BarChart3'
    },
    {
        path: '/rewards-history',
        element: RewardsHistory,
        name: 'Rewards History',
        icon: 'BarChart3'
    },
    {
        path: '/reports',
        element: Reports,
        name: 'Reports',
        icon: 'BarChart3'
    },
    {
        path: '/user-management',
        element: UserManagement,
        name: 'User Management',
        icon: 'Users'
    },
    {
        path: '/brand-management',
        element: BrandManagement,
        name: 'Brand Management',
        icon: 'Building2'
    },
    {
        path: '/settings',
        element: Settings,
        name: 'Settings',
        icon: 'Settings'
    }
];

// Finance sub-routes (for sidebar navigation)
export const financeSubRoutes = [
    {
        path: '/finance',
        name: 'Customer Finance',
        icon: 'Wallet'
    },
    {
        path: '/refunds',
        name: 'Refunds',
        icon: 'TrendingDown'
    },
    {
        path: '/wallet',
        name: 'Wallet',
        icon: 'CreditCard'
    },
    {
        path: '/settlement-history',
        name: 'Settlement History',
        icon: 'BarChart3'
    },
    {
        path: '/rewards-history',
        name: 'Rewards History',
        icon: 'BarChart3'
    }
];

// Orders sub-routes (for sidebar navigation)
export const ordersSubRoutes = [
    {
        path: '/orders',
        name: 'Orders',
        icon: 'ShoppingCart'
    },
    {
        path: '/pending-orders',
        name: 'Pending Orders',
        icon: 'Clock'
    }
];

// Admin sub-routes (for super admin users)
export const adminSubRoutes = [
    {
        path: '/brand-management',
        name: 'Brand Management',
        icon: 'Building2'
    },
    {
        path: '/user-management',
        name: 'User Management',
        icon: 'Users'
    }
];

// Helper function to get route by path
export const getRouteByPath = (path) => {
    return appRoutes.find(route => route.path === path);
};

// Helper function to get all route paths
export const getAllRoutePaths = () => {
    return appRoutes.map(route => route.path);
};

// Helper function to check if a path is valid
export const isValidRoute = (path) => {
    return appRoutes.some(route => route.path === path);
};

// Helper function to get public routes
export const getPublicRoutes = () => {
    return appRoutes.filter(route => route.public);
};

// Helper function to get protected routes
export const getProtectedRoutes = () => {
    return appRoutes.filter(route => !route.public);
};

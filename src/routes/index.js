// Routes Index
// Export all route-related configurations and components

export {
    appRoutes,
    financeSubRoutes,
    ordersSubRoutes,
    adminSubRoutes,
    getRouteByPath,
    getAllRoutePaths,
    isValidRoute,
    getPublicRoutes,
    getProtectedRoutes
} from './routesConfig';

// Export individual route components for direct imports if needed
export { default as Dashboard } from '../pages/Dashboard';
export { default as Orders } from '../pages/Orders';
export { default as PendingOrders } from '../pages/PendingOrders';
export { default as AbandonedCarts } from '../pages/AbandonedCarts';
export { default as Finance } from '../pages/Finance';
export { default as Refunds } from '../pages/Refunds';
export { default as Wallet } from '../pages/Wallet';
export { default as SettlementHistory } from '../pages/SettlementHistory';
export { default as RewardsHistory } from '../pages/RewardsHistory';
export { default as UserManagement } from '../pages/UserManagement';
export { default as Settings } from '../pages/Settings';
export { default as Reports } from '../pages/Reports';
export { default as BrandManagement } from '../pages/BrandManagement';
export { default as Login } from '../pages/Login';
export { default as StoreSelection } from '../pages/StoreSelection';
export { default as CheckoutSetup } from '../pages/CheckoutSetup';

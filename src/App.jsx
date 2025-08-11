import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import PendingOrders from './pages/PendingOrders';
import AbandonedCarts from './pages/AbandonedCarts';
import Finance from './pages/Finance';
import Refunds from './pages/Refunds';
import Wallet from './pages/Wallet';
import SettlementHistory from './pages/SettlementHistory';
import RewardsHistory from './pages/RewardsHistory';
import Reports from './pages/Reports';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/pending-orders" element={<PendingOrders />} />
          <Route path="/abandoned-carts" element={<AbandonedCarts />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/refunds" element={<Refunds />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settlement-history" element={<SettlementHistory />} />
          <Route path="/rewards-history" element={<RewardsHistory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';

// Placeholder Pages
import TenantLayout from './components/layout/TenantLayout';
import OrdersPage from './pages/tenant/OrdersPage';
import CouriersPage from './pages/tenant/CouriersPage';
import LandingPage from './pages/LandingPage';

import AdminLayout from './components/layout/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// Placeholder Pages
const TenantDashboardHome = () => <div className="text-2xl font-bold">Welcome to Dashboard</div>;
const NotFound = () => <div className="p-8 text-center text-red-500"><h1 className="text-2xl">404 Not Found</h1></div>;

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Super Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="tenants" element={<AdminDashboardPage />} />
          <Route path="earnings" element={<AdminDashboardPage />} />
          <Route path="settings" element={<AdminDashboardPage />} />
        </Route>
        
        {/* Tenant Dashboard Routes */}
        <Route path="/tenant/:tenantId" element={<TenantLayout />}>
          <Route index element={<TenantDashboardHome />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="couriers" element={<CouriersPage />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

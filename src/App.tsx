import { Routes, Route } from 'react-router-dom';

// Layout & Auth
import AppLayout from './layout/AppLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// Tenant Pages
import TenantDashboardPage from './pages/tenant/TenantDashboardPage';
import OrdersPage from './pages/tenant/OrdersPage';
import CreateOrderPage from './pages/tenant/CreateOrderPage';
import CouriersPage from './pages/tenant/CouriersPage';

const NotFound = () => <div className="p-8 text-center text-red-500"><h1 className="text-2xl">404 Not Found</h1></div>;

function App() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Super Admin Dashboard Routes */}
        <Route path="/admin" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="tenants" element={<AdminDashboardPage />} />
          <Route path="earnings" element={<AdminDashboardPage />} />
          <Route path="settings" element={<AdminDashboardPage />} />
        </Route>
        
        {/* Tenant Dashboard Routes */}
        <Route path="/tenant/:tenantId" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<TenantDashboardPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/new" element={<CreateOrderPage />} />
          <Route path="couriers" element={<CouriersPage />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

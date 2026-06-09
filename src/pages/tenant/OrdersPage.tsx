import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useParams } from 'react-router-dom';
import { fetchOrders } from '../../lib/api';
import { supabase } from '../../lib/supabase';
import type { Order } from '../../lib/api';
// Icons (assumed from lucide-react)
import { Upload, Plus, Search, ShieldAlert, Filter } from 'lucide-react';

const OrdersPage: React.FC = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadOrders = async () => {
      if (!tenantId) return;
      setLoading(true);
      try {
        // Resolve tenant UUID from path_name (slug)
        const { data: tenantData, error: tenantError } = await supabase
          .from('tenants')
          .select('id')
          .eq('path_name', tenantId)
          .single();
        if (tenantError) {
          // If no rows found, Supabase returns a 406 with code PGRST116
          if (tenantError.code === 'PGRST116') {
            console.warn('Tenant slug not found, treating as UUID:', tenantId);
            const tenantUuid = tenantId;
            const data = await fetchOrders(tenantUuid);
            setOrders(data);
            setLoading(false);
            return;
          }
          console.error('Error fetching tenant:', tenantError);
          setLoading(false);
          return;
        }
        const tenantUuid = tenantData.id;
        const data = await fetchOrders(tenantUuid);
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [tenantId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'returned':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'safe':
        return 'text-green-500';
      case 'moderate':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders (OMS)</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" /> Import CSV
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> New Order
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b bg-muted/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 max-w-sm relative">
              <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
              <Input placeholder="Search orders..." className="pl-9" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b bg-muted/20">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Risk Status</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center">Loading…</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">{order.order_number}</td>
                      <td className="p-4 align-middle">
                        <div className="flex flex-col">
                          <span>{order.customer_name}</span>
                          <span className="text-xs text-muted-foreground">{order.customer_phone}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle font-semibold">৳ {order.total_amount}</td>
                      <td className="p-4 align-middle">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>\
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-1.5" title="Placeholder for Future Fraud API">
                          <ShieldAlert className={`w-4 h-4 ${getRiskColor(order.risk_status)}`} />
                          <span className="text-xs text-muted-foreground capitalize">{order.risk_status}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;

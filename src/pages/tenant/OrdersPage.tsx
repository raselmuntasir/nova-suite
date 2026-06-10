import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  Filter, ChevronDown, Search, X, ListChecks,
  Printer, Download,
} from 'lucide-react';

export default function OrdersPage() {
  const { tenantId } = useParams<{ tenantId: string }>();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isGroupStatusOpen, setIsGroupStatusOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [tenantId]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data: tenantData } = await supabase
      .from('tenants')
      .select('id')
      .eq('path_name', tenantId || '')
      .single();

    if (tenantData) {
      const { data: ordersData } = await supabase
        .from('orders')
        .select(`*, order_items(*)`)
        .eq('tenant_id', tenantData.id)
        .order('created_at', { ascending: false });

      if (ordersData) setOrders(ordersData);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4 pb-10">

      {/* Filtering Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800">
        <div
          className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between cursor-pointer"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 uppercase tracking-wide">
            <Filter className="w-4 h-4 text-brand-500" /> Filtering
          </h2>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </div>

        {isFilterOpen && (
          <div className="p-6 space-y-6">
            <div className="relative max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Name, Phone, or Order ID..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white/90 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-400 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tight">Status</label>
                <select className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white/90 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500/10 cursor-pointer">
                  <option value="">All Status</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Confirmed</option>
                  <option>Delivered</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tight">Courier</label>
                <select className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white/90 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500/10 cursor-pointer">
                  <option>All</option>
                  <option>Pathao</option>
                  <option>Steadfast</option>
                  <option>REDX</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tight">Payment Status</label>
                <select className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white/90 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500/10 cursor-pointer">
                  <option>All</option>
                  <option>Paid</option>
                  <option>Unpaid</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tight">Date Range</label>
                <input
                  type="date"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white/90 rounded-lg px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500/10 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors shadow-theme-xs flex items-center gap-2">
                <Filter className="w-3 h-3" /> Apply Filter
              </button>
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors shadow-theme-xs flex items-center gap-2">
                <X className="w-3 h-3" /> Clear Filter
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Group by Status */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800">
        <button
          className="w-full px-4 py-3 flex items-center bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-800 transition-colors rounded-xl text-left gap-2"
          onClick={() => setIsGroupStatusOpen(!isGroupStatusOpen)}
        >
          <h2 className="text-gray-800 dark:text-white/90 font-medium text-sm">Group by Status</h2>
          <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isGroupStatusOpen ? 'rotate-180' : ''}`} />
        </button>
        {isGroupStatusOpen && (
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-3">
            <div className="bg-success-500 text-white rounded-lg p-4 min-w-[160px] flex-1 relative overflow-hidden shadow-theme-xs">
              <ListChecks className="w-8 h-8 text-white/30 absolute left-3 top-3" />
              <div className="text-right mt-4">
                <div className="text-3xl font-bold">{orders.length}</div>
                <div className="text-xs text-white/80">{orders.length} orders</div>
                <div className="text-sm font-semibold mt-1">Total</div>
              </div>
            </div>
            <div className="bg-error-500 text-white rounded-lg p-4 min-w-[160px] flex-1 relative overflow-hidden shadow-theme-xs">
              <X className="w-8 h-8 text-white/30 absolute left-3 top-3" />
              <div className="text-right mt-4">
                <div className="text-3xl font-bold">0%</div>
                <div className="text-xs text-white/80">Orders: 0</div>
                <div className="text-sm font-semibold mt-1">Return Ratio</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-theme-sm overflow-hidden">
        {/* Header */}
        <div className="bg-brand-500 px-5 py-3 flex flex-wrap items-center justify-between">
          <h2 className="text-white text-base font-bold flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center">
              <ListChecks className="w-4 h-4 text-white" />
            </div>
            Order List
          </h2>
          <div className="flex items-center bg-white/20 border border-white/30 rounded-lg overflow-hidden">
            <div className="px-3 py-1.5 bg-white/20 text-white text-xs font-bold tracking-wider border-r border-white/20">ID</div>
            <input type="text" placeholder="Search by ID" className="bg-transparent border-none outline-none text-white text-xs px-3 py-1.5 w-36 placeholder-white/50" />
          </div>
        </div>

        {/* Controls */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-2">
          <button className="bg-error-500 hover:bg-error-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-theme-xs flex items-center gap-1.5 transition-colors">
            <X className="w-3 h-3" /> Delete Selected
          </button>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Search:</label>
            <input
              type="text"
              placeholder="Filter orders..."
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white/90 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/10 transition-all w-48"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-brand-500">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Invoice ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Name & Number</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Address</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400 text-xs">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400 dark:text-gray-500 text-xs">
                    No data available in table
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'Pending'
                          ? 'bg-warning-50 text-warning-700 dark:bg-warning-500/10 dark:text-warning-400'
                          : order.status === 'Confirmed'
                          ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400'
                          : order.status === 'Delivered'
                          ? 'bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3"><input type="checkbox" className="rounded" /></td>
                    <td className="px-4 py-3 text-xs font-bold text-brand-500">{order.order_number}</td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-bold text-gray-800 dark:text-white/90">{order.customer_name}</div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">{order.customer_phone}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 max-w-[150px] truncate" title={order.customer_address}>
                      {order.customer_address}{order.customer_district ? `, ${order.customer_district}` : ''}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-bold text-gray-800 dark:text-white/90">{order.grand_total} Tk</div>
                      <div className="text-[10px] text-error-500 dark:text-error-400">Due: {order.due} Tk</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Showing {orders.length} entries</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Show</span>
            <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded px-1.5 py-0.5 outline-none cursor-pointer text-xs">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-t-xl">
            <h2 className="text-gray-800 dark:text-white/90 font-medium text-sm">Actions</h2>
          </div>
          <div className="p-4 flex flex-wrap gap-2">
            <button className="bg-success-500 hover:bg-success-600 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-theme-xs flex items-center gap-1">
              <Printer className="w-3 h-3" /> Print Selected
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-theme-xs flex items-center gap-1">
              <Download className="w-3 h-3" /> Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-t-xl">
            <h2 className="text-gray-800 dark:text-white/90 font-medium text-sm">Summary</h2>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-800 dark:text-white/90">Grand Total:</span>
              <span className="text-gray-600 dark:text-gray-400">0.00 Tk</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-800 dark:text-white/90">Due:</span>
              <span className="text-gray-600 dark:text-gray-400">0.00 Tk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

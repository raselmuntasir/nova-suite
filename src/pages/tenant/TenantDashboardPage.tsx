import React from 'react';
import {
  CheckCircle, Clock, Truck, Layers, Wallet,
  ChevronDown, Box, Hourglass, Tag, Info, PieChart, Globe, ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TenantDashboardPage() {
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white/90">Summary</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Today's Overview</p>
        </div>
        <button className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center shadow-sm transition-colors">
          Today <ChevronDown className="ml-2 w-3 h-3" />
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-success-500 text-white rounded-xl p-4 shadow-theme-sm relative overflow-hidden group">
          <CheckCircle className="absolute -right-2 -top-2 text-white/10 w-24 h-24 transform -rotate-12 transition-transform group-hover:rotate-0" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 p-2 rounded-lg"><Box className="w-4 h-4" /></div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Success</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold leading-none mb-1">150</div>
                <div className="text-[11px] text-white/80">Total Orders</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold leading-none mb-1">120</div>
                <div className="text-[11px] text-white/80">Completed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-light-500 text-white rounded-xl p-4 shadow-theme-sm relative overflow-hidden group">
          <Clock className="absolute -right-2 -top-2 text-white/10 w-24 h-24 transform -rotate-12 transition-transform group-hover:rotate-0" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 p-2 rounded-lg"><Hourglass className="w-4 h-4" /></div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">In Progress</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold leading-none mb-1">30</div>
                <div className="text-[11px] text-white/80">Pending</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold leading-none mb-1">80%</div>
                <div className="text-[11px] text-white/80">Conversion</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-warning-500 text-white rounded-xl p-4 shadow-theme-sm relative overflow-hidden group">
          <Truck className="absolute -right-2 -top-2 text-white/10 w-24 h-24 transform -rotate-12 transition-transform group-hover:rotate-0" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 p-2 rounded-lg"><Truck className="w-4 h-4" /></div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">In Transit</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold leading-none mb-1">15</div>
                <div className="text-[11px] text-white/80">In Courier</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold leading-none mb-1">5</div>
                <div className="text-[11px] text-white/80">Older</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-500 text-white rounded-xl p-4 shadow-theme-sm relative overflow-hidden group">
          <Layers className="absolute -right-2 -top-2 text-white/10 w-24 h-24 transform -rotate-12 transition-transform group-hover:rotate-0" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 p-2 rounded-lg"><Tag className="w-4 h-4" /></div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Inventory</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold leading-none mb-1">450</div>
                <div className="text-[11px] text-white/80">Total Units</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold leading-none mb-1">10</div>
                <div className="text-[11px] text-white/80">Returned</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-4 shadow-theme-sm relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div className="bg-white/10 p-2 rounded-lg"><Wallet className="w-4 h-4 text-success-400" /></div>
              <span className="text-[10px] bg-success-500/20 text-success-400 px-2 py-0.5 rounded-full">Finance</span>
            </div>
            <div className="space-y-1.5 mt-auto">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-400">Sales:</span>
                <span className="font-bold text-white">45,000৳</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-400">Purchase:</span>
                <span className="font-bold text-white">20,000৳</span>
              </div>
              <div className="h-px bg-gray-700 my-1"></div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-success-400 font-bold uppercase tracking-wider">Profit</span>
                <span className="text-lg font-bold text-success-400">25,000৳</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800 h-[280px] flex flex-col">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start">
            <div>
              <h2 className="text-gray-800 dark:text-white/90 font-medium flex items-center text-[13px]">
                Order Status Percentage <Info className="ml-1.5 w-3 h-3 text-gray-400" />
              </h2>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Last 30 days</p>
            </div>
            <button className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-1 rounded-lg text-[11px] font-medium flex items-center transition-colors">
              This Month <ChevronDown className="ml-1.5 w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-full mb-4">
              <PieChart className="w-10 h-10 opacity-30" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No data yet</p>
            <p className="text-[10px] opacity-60 mt-1">Try changing the date range</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800 h-[280px] flex flex-col">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start">
            <div>
              <h2 className="text-gray-800 dark:text-white/90 font-medium flex items-center text-[13px]">
                Order Source <Info className="ml-1.5 w-3 h-3 text-gray-400" />
              </h2>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Last 30 days</p>
            </div>
            <button className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-1 rounded-lg text-[11px] font-medium flex items-center transition-colors">
              This Month <ChevronDown className="ml-1.5 w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-full mb-4">
              <Globe className="w-10 h-10 opacity-30" />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No sources recorded</p>
            <p className="text-[10px] opacity-60 mt-1">Waiting for incoming orders</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-gray-800 dark:text-white/90 font-semibold text-[13px]">Recent Order List</h2>
          <Link
            to="orders"
            className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-1 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left text-[11px] whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300">#</th>
                  <th className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300">Date</th>
                  <th className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300">Name & Number</th>
                  <th className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300">Product</th>
                  <th className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300">Amount</th>
                  <th className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400 dark:text-gray-600 text-xs">
                    No data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

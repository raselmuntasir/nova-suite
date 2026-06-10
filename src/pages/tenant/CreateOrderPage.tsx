import { useState } from 'react';
import {
  UserCircle, Phone, Copy, Box, Search,
  ShoppingCart, Info, Receipt, CheckCircle, Plus
} from 'lucide-react';

const inputClass = "w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white/90 placeholder-gray-400 dark:placeholder-gray-500 shadow-theme-xs rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-3 focus:ring-brand-500/10 focus:border-brand-400 dark:focus:border-brand-700 transition-all font-medium";

export default function CreateOrderPage() {
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [advance, setAdvance] = useState(0);

  const netTotal = subtotal - discount;
  const grandTotal = netTotal + shipping;
  const balanceDue = grandTotal - advance;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white/90">Create New Order</h1>
      </div>

      {/* Customer Information */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
          <h2 className="text-gray-800 dark:text-white/90 font-bold text-sm flex items-center gap-2">
            <UserCircle className="w-4 h-4 text-brand-500" />
            Customer Information
          </h2>
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Step 1 of 3</span>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mobile Number*</label>
              <div className="flex rounded-xl overflow-hidden shadow-theme-xs">
                <input
                  type="text"
                  placeholder="017XXXXXXXX"
                  className="flex-1 w-full min-w-0 bg-white dark:bg-gray-800 border-2 border-r-0 border-gray-200 dark:border-gray-700 rounded-l-xl px-4 py-2 text-sm focus:outline-none focus:ring-3 focus:ring-brand-500/10 focus:border-brand-400 dark:text-white/90 dark:placeholder-gray-500 transition-all font-medium"
                />
                <button className="bg-success-500 hover:bg-success-600 text-white w-10 flex items-center justify-center transition-colors border-r border-success-600/20 shrink-0" title="WhatsApp">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="bg-blue-light-500 hover:bg-blue-light-600 text-white w-10 flex items-center justify-center transition-colors rounded-r-xl shrink-0" title="Copy">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Alternative Number</label>
              <div className="flex rounded-xl overflow-hidden shadow-theme-xs">
                <input type="text" placeholder="Alternative Number" className="flex-1 min-w-0 bg-white dark:bg-gray-800 border-2 border-r-0 border-gray-200 dark:border-gray-700 rounded-l-xl px-4 py-2 text-sm focus:outline-none focus:ring-3 focus:ring-brand-500/10 focus:border-brand-400 dark:text-white/90 dark:placeholder-gray-500 transition-all font-medium" />
                <button className="bg-blue-light-500 hover:bg-blue-light-600 text-white w-10 flex items-center justify-center transition-colors rounded-r-xl shrink-0">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name*</label>
              <input type="text" placeholder="Customer Name" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</label>
              <input type="email" placeholder="Customer Email" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Address*</label>
              <input type="text" placeholder="Full Address" className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">District</label>
              <select className={inputClass}>
                <option value="">Select District</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
              <h2 className="text-gray-800 dark:text-white/90 font-bold text-sm flex items-center gap-2">
                <Box className="w-4 h-4 text-brand-500" />
                Listed Products
              </h2>
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Step 2 of 3</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28 shrink-0">Select Product</label>
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex items-center cursor-pointer hover:border-brand-400 hover:bg-white dark:hover:bg-gray-750 hover:shadow-theme-xs transition-all group">
                  <Search className="w-4 h-4 text-gray-400 ml-4 group-hover:text-brand-500 transition-colors" />
                  <input type="text" placeholder="Search products..." className="w-full px-3 py-2.5 text-sm focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 bg-transparent text-gray-800 dark:text-white/90" />
                </div>
                <button className="w-10 h-10 bg-brand-500 hover:bg-brand-600 text-white rounded-xl flex items-center justify-center transition-all shadow-theme-xs shrink-0">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-hidden border border-gray-100 dark:border-gray-800 rounded-xl">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                      <th className="py-3 px-5 font-bold text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest">Product</th>
                      <th className="py-3 px-4 font-bold text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center">Price</th>
                      <th className="py-3 px-4 font-bold text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center w-28">Qty</th>
                      <th className="py-3 px-5 font-bold text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-1">
                            <ShoppingCart className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                          </div>
                          <p className="text-gray-400 dark:text-gray-500 text-sm">Order basket is empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order Meta */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order Status*</label>
                <select className={inputClass}>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Confirmed">Confirmed</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment Method*</label>
                <select className={inputClass}>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order Note</label>
              <textarea
                placeholder="General notes about this order..."
                className={`${inputClass} h-28 resize-none`}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800 sticky top-4">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between rounded-t-xl">
              <h2 className="text-gray-800 dark:text-white/90 font-bold text-sm flex items-center gap-2">
                <Receipt className="w-4 h-4 text-brand-500" />
                Order Summary
              </h2>
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Step 3 of 3</span>
            </div>

            <div className="p-6 space-y-4">
              {[
                { label: 'Subtotal', value: subtotal, setter: setSubtotal, color: 'gray' },
                { label: 'Discount/Less', value: discount, setter: setDiscount, color: 'success' },
              ].map(({ label, value, setter, color }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className={`text-[11px] font-bold uppercase tracking-wide text-${color === 'success' ? 'success-600 dark:text-success-400' : 'gray-600 dark:text-gray-400'}`}>{label}</span>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">৳</span>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setter(Number(e.target.value))}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-1.5 pl-6 text-right text-sm font-bold text-gray-800 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-400"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 dark:border-gray-700">
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Net Total</span>
                <span className="text-sm font-bold text-gray-700 dark:text-white/90">৳ {netTotal}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                  Shipping <Info className="w-3 h-3 text-gray-400" />
                </span>
                <div className="relative w-1/2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400">৳</span>
                  <input type="number" value={shipping} onChange={(e) => setShipping(Number(e.target.value))}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-1.5 pl-6 text-right text-sm font-bold text-gray-800 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-400"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center py-3 my-1 bg-brand-50 dark:bg-brand-500/10 px-4 rounded-xl border border-brand-100 dark:border-brand-500/20">
                <span className="text-[13px] font-black text-gray-800 dark:text-white/90 uppercase tracking-widest">Grand Total</span>
                <span className="text-xl font-black text-brand-600 dark:text-brand-400 tracking-tighter">৳ {grandTotal}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide">Advance Paid</span>
                <div className="relative w-1/2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-brand-400">৳</span>
                  <input type="number" value={advance} onChange={(e) => setAdvance(Number(e.target.value))}
                    className="w-full bg-white dark:bg-gray-800 border border-brand-200 dark:border-brand-800 rounded-xl px-4 py-1.5 pl-6 text-right text-sm font-bold text-brand-700 dark:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-400"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center py-3 bg-error-50 dark:bg-error-500/10 px-4 rounded-xl border border-error-100 dark:border-error-500/20">
                <span className="text-[12px] font-black text-error-600 dark:text-error-400 uppercase tracking-widest">Balance Due</span>
                <span className="text-xl font-black text-error-600 dark:text-error-400 tracking-tighter">৳ {balanceDue}</span>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl border-t border-gray-100 dark:border-gray-800">
              <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-black py-3.5 rounded-xl text-sm uppercase tracking-widest shadow-theme-md transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Confirm & Place Order
              </button>
              <p className="text-[9px] text-gray-400 dark:text-gray-500 text-center mt-3 font-bold uppercase tracking-tighter">Confirming will save the order</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

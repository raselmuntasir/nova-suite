import { useState } from 'react';
import { ChevronRight, Info } from 'lucide-react';

const inputClass = "w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white/90 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-3 focus:ring-brand-500/10 focus:border-brand-400 dark:focus:border-brand-800 transition-all";
const labelClass = "block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2";

export default function CouriersPage() {
  const [courierEnabled, setCourierEnabled] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white/90">Courier Configuration</h1>
      </div>

      {/* Global Settings Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800">
        <div className="px-5 py-3.5 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-t-xl">
          <h2 className="text-gray-800 dark:text-white/90 font-semibold text-sm">Global Settings</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className={labelClass}>Enable Courier</label>
              <select
                value={courierEnabled ? 'Enable' : 'Disable'}
                onChange={(e) => setCourierEnabled(e.target.value === 'Enable')}
                className={inputClass}
              >
                <option value="Disable">Disable</option>
                <option value="Enable">Enable</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Send to (In Courier) Only from API</label>
              <select className={inputClass}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Allow API to Make "Completed"</label>
              <select className={inputClass}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Allow Duplicate Parcel ID</label>
              <select className={inputClass}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className={`${labelClass} flex items-center gap-1`}>
                "Pending Return" if COD are 0 Tk
                <Info className="w-3 h-3 text-gray-400" />
              </label>
              <select className={inputClass}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div>
              <label className={`${labelClass} flex items-center gap-1`}>
                Default COD Charge(%)
                <Info className="w-3 h-3 text-gray-400" />
              </label>
              <input type="text" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Return/Damage charge from Courier</label>
              <select className={inputClass}>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className={labelClass}>Default Courier Note</label>
            <textarea
              rows={4}
              className={`${inputClass} resize-none`}
            ></textarea>
          </div>

          {/* Courier API Credentials */}
          {courierEnabled && (
            <div className="space-y-4 mt-8">
              <h3 className="text-sm font-bold text-gray-800 dark:text-white/90 border-b border-gray-200 dark:border-gray-800 pb-2">
                Courier API Credentials
              </h3>

              {/* Steadfast */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div
                  className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                  onClick={() => toggleAccordion('steadfast')}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">Steadfast Credentials</span>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${activeAccordion === 'steadfast' ? 'rotate-90' : ''}`} />
                  </div>
                </div>
                {activeAccordion === 'steadfast' && (
                  <div className="p-6 bg-white dark:bg-gray-900">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>API Key*</label>
                        <input type="text" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Secret Key*</label>
                        <input type="password" className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pathao */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div
                  className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                  onClick={() => toggleAccordion('pathao')}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">Pathao Credentials</span>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${activeAccordion === 'pathao' ? 'rotate-90' : ''}`} />
                  </div>
                </div>
                {activeAccordion === 'pathao' && (
                  <div className="p-6 bg-white dark:bg-gray-900">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Client ID*</label>
                        <input type="text" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Client Secret*</label>
                        <input type="password" className={inputClass} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* REDX */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <div
                  className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                  onClick={() => toggleAccordion('redx')}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">REDX Credentials</span>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${activeAccordion === 'redx' ? 'rotate-90' : ''}`} />
                  </div>
                </div>
                {activeAccordion === 'redx' && (
                  <div className="p-6 bg-white dark:bg-gray-900">
                    <div>
                      <label className={labelClass}>REDX API Token</label>
                      <input type="text" className={inputClass} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-sm border border-gray-200 dark:border-gray-800 p-6">
        <button className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-theme-xs transition-colors mb-2">
          Update Configuration
        </button>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">NB: * marked are required field.</p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate login for now - assuming success redirects to a tenant dashboard
    setTimeout(() => {
      setLoading(false);
      // Fake redirect to demo-merchant for development testing
      localStorage.setItem('dev_bypass_auth', 'true');
      navigate('/tenant/demo-merchant');
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setActiveTab('login');
      alert('Registration successful! Please login with your email.');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at top right, #1e1b4b, #0f172a)',
        fontFamily: "'Inter', 'Baloo Da 2', sans-serif"
      }}>
      
      {/* Animated background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-[bounce_6s_ease-in-out_infinite]">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-indigo-500/40 rotate-12">
            <Zap className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Nova <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Suite</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium mt-2 uppercase tracking-widest">Management Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden transition-all duration-500">
          
          {/* Tabs */}
          <div className="flex gap-1 bg-white/5 p-1 rounded-2xl mb-8">
            <button 
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${activeTab === 'login' ? 'bg-white/10 text-white shadow-xl' : 'text-slate-400 hover:text-slate-200'}`}
            >
              LOG IN
            </button>
            <button 
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${activeTab === 'register' ? 'bg-white/10 text-white shadow-xl' : 'text-slate-400 hover:text-slate-200'}`}
            >
              REGISTER
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input type="email" required placeholder="admin@example.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input type="password" required placeholder="••••••••" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-medium" />
                </div>
              </div>
              <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-3">
                {loading ? (
                  <span>LOADING...</span>
                ) : (
                  <>
                    <span>ENTER DASHBOARD</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" required placeholder="Your Full Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" required placeholder="admin@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Assign Password</label>
                <input type="password" required placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium" />
              </div>
              <button disabled={loading} type="submit" className="w-full bg-white/10 hover:bg-white/20 text-white font-black py-5 rounded-2xl border border-white/10 transition-all active:scale-95 uppercase tracking-widest text-sm">
                {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
              </button>
            </form>
          )}

          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
              ⚠️ {error}
            </div>
          )}
        </div>

        <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-8">Secure Environment v2.0</p>
      </div>
    </div>
  );
}

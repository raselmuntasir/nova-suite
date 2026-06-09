import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, DollarSign, Settings, LogOut } from 'lucide-react'

export default function AdminLayout() {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: `/admin`, icon: LayoutDashboard },
    { name: 'Tenants', href: `/admin/tenants`, icon: Users },
    { name: 'Earnings', href: `/admin/earnings`, icon: DollarSign },
    { name: 'Settings', href: `/admin/settings`, icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="flex h-16 shrink-0 items-center px-6 border-b">
          <span className="text-xl font-bold text-primary">Nova Admin</span>
          <span className="ml-2 text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Super</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (location.pathname.startsWith(item.href) && item.href !== `/admin`)
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t">
          <button className="flex w-full items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex shrink-0 items-center justify-between px-8 bg-card border-b">
          <h2 className="text-lg font-semibold capitalize">
            {location.pathname.split('/').pop() === 'admin' ? 'Dashboard' : location.pathname.split('/').pop()}
          </h2>
          <div className="flex items-center gap-4">
             {/* User profile dropdown placeholder */}
             <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
               A
             </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

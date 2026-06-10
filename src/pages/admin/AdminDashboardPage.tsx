import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Users, DollarSign, Activity, Search, ShieldCheck, Lock } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { fetchTenants, suspendTenant, reactivateTenant, type Tenant } from '../../lib/api'

export default function AdminDashboardPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  
  useEffect(() => {
    async function load() {
            try {
        const data = await fetchTenants()
        setTenants(data)
      } catch (err) {
        console.error(err)
      }
          }
    load()
  }, [])

  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳ 45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180 new merchants this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Healthy</div>
            <p className="text-xs text-muted-foreground">All APIs operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Tenant Management */}
      <Card>
        <CardHeader className="border-b bg-muted/10">
          <div className="flex items-center justify-between">
             <div>
               <CardTitle>Registered Tenants</CardTitle>
               <p className="text-sm text-muted-foreground mt-1">Manage platform subscriptions and access.</p>
             </div>
             <div className="flex items-center w-full max-w-sm relative">
               <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
               <Input placeholder="Search tenants by name or path..." className="pl-9" />
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b bg-muted/20">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Merchant</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Path (URL)</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Plan</th>
                  <th className="h-12 px-6 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-6 text-right align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-6 align-middle font-medium">{tenant.merchant_name}</td>
                    <td className="p-6 align-middle font-mono text-muted-foreground">/{tenant.path_name}</td>
                    <td className="p-6 align-middle font-semibold">{'Free'}</td>
                    <td className="p-6 align-middle">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(tenant.status || 'unknown')}`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="p-6 align-middle text-right">
                      {tenant.status === 'active' ? (
                        <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                          <Lock className="w-4 h-4 mr-2" /> Suspend
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white">
                          <ShieldCheck className="w-4 h-4 mr-2" /> Reactivate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

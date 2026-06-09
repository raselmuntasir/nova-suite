import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Truck, CheckCircle2 } from 'lucide-react'

export default function CouriersPage() {
  const couriers = [
    { id: 'pathao', name: 'Pathao Courier', connected: true },
    { id: 'steadfast', name: 'Steadfast Courier', connected: false },
    { id: 'redx', name: 'RedX', connected: false },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courier Automation</h1>
          <p className="text-muted-foreground mt-1">Configure your API credentials and manage bulk bookings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {couriers.map(courier => (
          <Card key={courier.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{courier.name}</CardTitle>
              <Truck className={`w-5 h-5 ${courier.connected ? 'text-primary' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent className="pt-4">
              {courier.connected ? (
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    API Connected
                  </div>
                  <Button variant="outline" className="w-full">Manage Settings</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground px-3 py-2 bg-muted/50 rounded-md">
                    Not configured
                  </div>
                  <Button className="w-full">Connect API</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

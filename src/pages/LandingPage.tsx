import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Package, Truck, ShieldCheck } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  const features = [
    {
      icon: Package,
      title: 'Order Management',
      description: 'Sync orders from WooCommerce and Shopify seamlessly. Manage your entire workflow from a single dashboard.',
    },
    {
      icon: Truck,
      title: 'Courier Automation',
      description: 'One-click bulk bookings for Pathao, Steadfast, and RedX. Auto-sync live tracking statuses.',
    },
    {
      icon: ShieldCheck,
      title: 'Future-Proof Risk AI',
      description: 'Built-in architecture for advanced fraud detection to identify high-risk customers instantly.',
    },
  ]

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all border-b bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              N
            </div>
            <span className="text-xl font-bold tracking-tight">Nova Suite</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/admin">Admin Login</Link>
            </Button>
            <Button className="rounded-full px-6 shadow-lg shadow-primary/20" asChild>
              <Link to="/tenant/demo-merchant">Merchant Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 sm:pt-40 sm:pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]"
          >
            The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">SaaS Platform</span> for E-commerce
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Streamline your operations with automated courier bookings, unified order management, and multi-tenant capabilities built for scale.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Button size="lg" className="h-12 px-8 rounded-full text-base font-semibold shadow-xl shadow-primary/25">
              Start your free trial <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base font-semibold">
              Book a Demo
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="p-8 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

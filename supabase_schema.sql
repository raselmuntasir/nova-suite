-- ==========================================
-- NOVA SUITE MVP DATABASE SCHEMA (SUPABASE)
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tenants Table
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Link to Supabase Auth User
    merchant_name VARCHAR(255) NOT NULL,
    path_name VARCHAR(255) UNIQUE NOT NULL, -- Used for routing e.g., /merchant-name
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Subscriptions Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    plan_name VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
    valid_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    order_number VARCHAR(100) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'returned', 'cancelled')),
    risk_status VARCHAR(50) DEFAULT 'unknown' CHECK (risk_status IN ('unknown', 'safe', 'moderate', 'high')), -- Placeholder for Future Fraud API
    courier_provider VARCHAR(50),
    tracking_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Courier Configurations Table
CREATE TABLE IF NOT EXISTS public.courier_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL CHECK (provider IN ('pathao', 'steadfast', 'redx')),
    api_key TEXT NOT NULL,
    secret_key TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(tenant_id, provider)
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courier_configs ENABLE ROW LEVEL SECURITY;

-- Tenants Policy: A user can only view and edit their own tenant profile
CREATE POLICY "Users can view own tenant" ON public.tenants
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own tenant" ON public.tenants
    FOR UPDATE USING (auth.uid() = user_id);

-- Subscriptions Policy: Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
    FOR SELECT USING (
        tenant_id IN (SELECT id FROM public.tenants WHERE user_id = auth.uid())
    );

-- Orders Policy: Users can perform all operations on their own orders
CREATE POLICY "Users can manage own orders" ON public.orders
    FOR ALL USING (
        tenant_id IN (SELECT id FROM public.tenants WHERE user_id = auth.uid())
    );

-- Courier Configs Policy: Users can manage their own courier configs
CREATE POLICY "Users can manage own courier configs" ON public.courier_configs
    FOR ALL USING (
        tenant_id IN (SELECT id FROM public.tenants WHERE user_id = auth.uid())
    );

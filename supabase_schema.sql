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
    customer_alt_phone VARCHAR(50),
    customer_address TEXT NOT NULL,
    customer_district VARCHAR(100),
    
    -- Financials
    subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
    discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    shipping DECIMAL(10, 2) NOT NULL DEFAULT 0,
    grand_total DECIMAL(10, 2) NOT NULL DEFAULT 0,
    advance DECIMAL(10, 2) NOT NULL DEFAULT 0,
    due DECIMAL(10, 2) NOT NULL DEFAULT 0,
    
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Confirmed', 'In Courier', 'Hold', 'Canceled', 'Delivered', 'Returned')),
    payment_method VARCHAR(50) DEFAULT 'Cash on Delivery',
    note TEXT,
    
    courier_provider VARCHAR(50),
    tracking_id VARCHAR(255),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Courier Configurations Table
CREATE TABLE IF NOT EXISTS public.courier_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    
    -- Global Settings
    is_enabled BOOLEAN DEFAULT false,
    send_to_api_only BOOLEAN DEFAULT true,
    allow_api_completed BOOLEAN DEFAULT false,
    allow_duplicate_id BOOLEAN DEFAULT false,
    pending_return_zero_cod BOOLEAN DEFAULT false,
    default_cod_charge_percent DECIMAL(5,2) DEFAULT 0,
    charge_return_from_courier BOOLEAN DEFAULT true,
    default_courier_note TEXT,
    
    -- Steadfast
    steadfast_api_key TEXT,
    steadfast_secret_key TEXT,
    
    -- Pathao
    pathao_client_id TEXT,
    pathao_client_secret TEXT,
    
    -- RedX
    redx_api_token TEXT,
    
    -- Toggles
    enable_sundarban BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(tenant_id)
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
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

-- Orders Policy: Users can manage own orders
CREATE POLICY "Users can manage own orders" ON public.orders
    FOR ALL USING (
        tenant_id IN (SELECT id FROM public.tenants WHERE user_id = auth.uid())
    );

-- Order Items Policy: Users can manage own order items
CREATE POLICY "Users can manage own order items" ON public.order_items
    FOR ALL USING (
        order_id IN (SELECT id FROM public.orders WHERE tenant_id IN (SELECT id FROM public.tenants WHERE user_id = auth.uid()))
    );

-- Courier Configs Policy: Users can manage their own courier configs
CREATE POLICY "Users can manage own courier configs" ON public.courier_configs
    FOR ALL USING (
        tenant_id IN (SELECT id FROM public.tenants WHERE user_id = auth.uid())
    );

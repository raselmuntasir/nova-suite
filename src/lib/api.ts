import { supabase } from './supabase';
import type { Tables } from './database.types';

/**
 * Fetch orders for a specific tenant.
 * The Supabase RLS policies ensure that only rows belonging to the tenant are returned.
 */
export async function fetchOrders(tenantId: string): Promise<Tables<'orders'>[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('tenant_id', tenantId);
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  return data as Tables<'orders'>[];
}

/**
 * Fetch all tenants (admin view).
 */
export async function fetchTenants(): Promise<Tables<'tenants'>[]> {
  const { data, error } = await supabase.from('tenants').select('*');
  if (error) {
    console.error('Error fetching tenants:', error);
    return [];
  }
  return data as Tables<'tenants'>[];
}

/**
 * Suspend a tenant (set status to 'suspended').
 */
export async function suspendTenant(id: string): Promise<void> {
  const { error } = await supabase
    .from('tenants')
    .update({ status: 'suspended' })
    .eq('id', id);
  if (error) {
    console.error('Error suspending tenant:', error);
    throw error;
  }
}

/**
 * Reactivate a tenant (set status to 'active').
 */
export async function reactivateTenant(id: string): Promise<void> {
  const { error } = await supabase
    .from('tenants')
    .update({ status: 'active' })
    .eq('id', id);
  if (error) {
    console.error('Error reactivating tenant:', error);
    throw error;
  }
}
export type Order = Tables<'orders'>;
export type Tenant = Tables<'tenants'>;

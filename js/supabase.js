// Supabase client configuration
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js@2';

// These will be populated from your .env file after connecting to Supabase
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Routes functions
export async function getRoutes() {
  try {
    const { data, error } = await supabase
      .from('routes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching routes:', error);
    return [];
  }
}

export async function addRoute(route) {
  try {
    const { data, error } = await supabase
      .from('routes')
      .insert([route])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error adding route:', error);
    throw error;
  }
}

export async function updateRoute(id, updates) {
  try {
    const { data, error } = await supabase
      .from('routes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating route:', error);
    throw error;
  }
}

export async function deleteRoute(id) {
  try {
    const { error } = await supabase
      .from('routes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting route:', error);
    throw error;
  }
}

// Vehicles functions
export async function getVehicles() {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
}

export async function addVehicle(vehicle) {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([vehicle])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error adding vehicle:', error);
    throw error;
  }
}

export async function updateVehicle(id, updates) {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
}

export async function deleteVehicle(id) {
  try {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
}
import { createClient } from '@supabase/supabase-js';

// Get Supabase configuration from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY are set.'
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export helper functions for common operations

/**
 * Submit a demo request
 * @param {Object} requestData - The demo request data
 * @param {string} requestData.name - Name of the person requesting demo
 * @param {string} requestData.email - Email address
 * @param {string} requestData.company - Company name
 * @param {string} requestData.message - Demo request message
 * @returns {Promise<Object>} - The created demo request
 */
export async function submitDemoRequest(requestData) {
  const { data, error } = await supabase
    .from('demo_requests')
    .insert([
      {
        name: requestData.name,
        email: requestData.email,
        company: requestData.company,
        message: requestData.message,
        status: 'pending',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error submitting demo request:', error);
    throw error;
  }

  return data;
}

/**
 * Fetch all demo requests (for admin use)
 * @param {number} limit - Maximum number of requests to fetch
 * @param {number} offset - Number of requests to skip
 * @returns {Promise<Array>} - Array of demo requests
 */
export async function getDemoRequests(limit = 100, offset = 0) {
  const { data, error } = await supabase
    .from('demo_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching demo requests:', error);
    throw error;
  }

  return data;
}

/**
 * Fetch QSI metrics
 * @returns {Promise<Array>} - Array of QSI metrics
 */
export async function getQSIMetrics() {
  const { data, error } = await supabase
    .from('qsi_metrics')
    .select('*')
    .order('metric_value', { ascending: false });

  if (error) {
    console.error('Error fetching QSI metrics:', error);
    throw error;
  }

  return data;
}

/**
 * Fetch QSI metric for a specific city
 * @param {string} cityName - Name of the city
 * @returns {Promise<Object>} - QSI metric data for the city
 */
export async function getQSIMetricByCity(cityName) {
  const { data, error } = await supabase
    .from('qsi_metrics')
    .select('*')
    .eq('city_name', cityName)
    .single();

  if (error) {
    console.error(`Error fetching QSI metric for ${cityName}:`, error);
    throw error;
  }

  return data;
}

/**
 * Track an analytics event
 * @param {Object} eventData - The analytics event data
 * @param {string} eventData.event_type - Type of event
 * @param {Object} eventData.event_data - Additional event data (JSON)
 * @param {string} eventData.page_url - Current page URL
 * @returns {Promise<Object>} - The created analytics event
 */
export async function trackAnalyticsEvent(eventData) {
  const { data, error } = await supabase
    .from('analytics_events')
    .insert([
      {
        event_type: eventData.event_type,
        event_data: eventData.event_data || {},
        page_url: eventData.page_url || window.location.href,
        user_agent: navigator.userAgent,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error tracking analytics event:', error);
    throw error;
  }

  return data;
}

export default supabase;

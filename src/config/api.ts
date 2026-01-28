/**
 * API Configuration
 * Uses environment variable for API URL, defaults to localhost for development
 */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

/**
 * Get full API endpoint URL
 * @param endpoint - API endpoint path (e.g., /api/v1/flight/predict)
 * @returns Full URL with base API URL
 */
export const getApiUrl = (endpoint: string): string => {
  return `${API_URL}${endpoint}`;
};
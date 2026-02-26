
/**
 * API Service for Richie AI
 * This service is designed to be easily swapped with a real FastAPI backend.
 * To connect to FastAPI, update the BASE_URL and replace mock calls with fetch().
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  // User Profile
  getProfile: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      name: 'Guest User',
      email: 'guest@example.com',
      plan: 'Free'
    };
  },

  // Companions
  getCompanions: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // This would be: const res = await fetch(`${BASE_URL}/companions`); return res.json();
    return []; // Return empty or mock data
  },

  // Progress
  getProgress: async () => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      lessonsCompleted: 12,
      companionsCreated: 5,
      history: []
    };
  },

  // Admin Stats
  getAdminStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      totalUsers: 12482,
      revenue: 4200000,
      apiCosts: 185000,
      activeSessions: 1204
    };
  }
};

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:4000';
export const GRAPHQL_ENDPOINT = `${API_BASE_URL}/graphql`;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'codefolio.token',
  THEME: 'codefolio.theme',
  USER: 'codefolio.user',
};

// Skill Levels
export const SKILL_LEVELS = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
};

// Project Types (for filtering)
export const PROJECT_FILTERS = {
  ALL: 'all',
  WEB: 'web',
  MOBILE: 'mobile',
  DESIGN: 'design',
  OTHER: 'other',
};

// Animation Timings (in seconds)
export const ANIMATION_TIMINGS = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 0.8,
  VERY_SLOW: 1.2,
};

// Color Scheme
export const COLORS = {
  NIGHT: '#000000',
  OCEAN: '#4A70A9',
  MIST: '#8FABD4',
  SAND: '#EFECE3',
};

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
};

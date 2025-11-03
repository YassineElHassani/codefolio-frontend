import { STORAGE_KEYS } from './constants';

class AuthService {
  /**
   * Get authentication token from localStorage
   */
  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  /**
   * Set authentication token to localStorage
   */
  setToken(token) {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } else {
      this.clearToken();
    }
  }

  /**
   * Clear authentication token from localStorage
   */
  clearToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return Boolean(this.getToken());
  }

  /**
   * Get stored user info
   */
  getUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Set user info
   */
  setUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      this.clearUser();
    }
  }

  /**
   * Clear user info
   */
  clearUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  /**
   * Clear all auth data
   */
  logout() {
    this.clearToken();
    this.clearUser();
  }

  /**
   * Decode JWT token (basic payload extraction)
   */
  decodeToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token) {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  }
}

export default new AuthService();

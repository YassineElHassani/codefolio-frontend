import { GRAPHQL_ENDPOINT } from './constants';
import authService from './authService';

class ApiService {
  /**
   * Execute GraphQL query or mutation
   */
  async request(query, variables = {}, options = {}) {
    try {
      const token = authService.getToken();
      
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
          ...options.headers,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const data = await response.json();

      if (data.errors) {
        const error = new Error(data.errors[0]?.message || 'GraphQL Error');
        error.graphqlErrors = data.errors;
        throw error;
      }

      return data.data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  /**
   * Decode GraphQL query string (for debugging)
   */
  decodeGraphQL(query) {
    if (typeof query === 'object' && query.loc) {
      return query.loc.source.body;
    }
    return String(query);
  }
}

export default new ApiService();

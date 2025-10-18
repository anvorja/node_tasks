const API_BASE = 'http://127.0.0.1:8000/tasks/api/v1';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Si es DELETE, no intentar parsear JSON
      if (options.method === 'DELETE') {
        return { success: true };
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error - ${endpoint}:`, error);
      throw error;
    }
  }

  // Tasks endpoints
  tasks = {
    list: (params = '') => this.request(`/tasks/${params}`),

    create: (task) => this.request('/tasks/', {
      method: 'POST',
      body: JSON.stringify(task),
    }),

    update: (id, task) => this.request(`/tasks/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(task),
    }),

    delete: (id) => this.request(`/tasks/${id}/`, {
      method: 'DELETE',
    }),

    toggle: (id) => this.request(`/tasks/${id}/toggle_done/`, {
      method: 'PATCH',
    }),

    stats: () => this.request('/tasks/stats/'),
  };

  // Categories endpoints
  categories = {
    list: () => this.request('/categories/'),

    create: (category) => this.request('/categories/', {
      method: 'POST',
      body: JSON.stringify(category),
    }),

    update: (id, category) => this.request(`/categories/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(category),
    }),

    delete: (id) => this.request(`/categories/${id}/`, {
      method: 'DELETE',
    }),
  };
}

export const api = new ApiService();
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Fetch all servers with pagination and filters
export const fetchServers = async ({ page = 1, limit = 20, search = '', status = '' } = {}) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (search) params.append('search', search);
    if (status) params.append('status', status);

    const response = await fetch(`${API_BASE_URL}/servers?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching servers:', error);
    throw error;
  }
};

// Fetch a single server by name
export const fetchServerByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/servers/${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching server ${name}:`, error);
    throw error;
  }
};

// Create a new server
export const createServer = async (serverData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/servers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serverData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating server:', error);
    throw error;
  }
};

// Update a server
export const updateServer = async (name, serverData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/servers/${encodeURIComponent(name)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serverData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating server ${name}:`, error);
    throw error;
  }
};

// Delete a server
export const deleteServer = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/servers/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting server ${name}:`, error);
    throw error;
  }
};

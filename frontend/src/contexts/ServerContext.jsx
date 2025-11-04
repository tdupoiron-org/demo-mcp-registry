import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchServers } from '../services/api';

const ServerContext = createContext();

export const useServers = () => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServers must be used within a ServerProvider');
  }
  return context;
};

export const ServerProvider = ({ children }) => {
  const [servers, setServers] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    search: '',
    status: '',
  });

  const loadServers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchServers(filters);
      setServers(data.servers || []);
      setMetadata(data.metadata || {});
    } catch (err) {
      setError(err.message || 'Failed to load servers');
      console.error('Error loading servers:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadServers();
  }, [loadServers]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      page: 1,
      limit: 20,
      search: '',
      status: '',
    });
  };

  const refresh = () => {
    loadServers();
  };

  return (
    <ServerContext.Provider
      value={{
        servers,
        metadata,
        loading,
        error,
        filters,
        updateFilters,
        resetFilters,
        refresh,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

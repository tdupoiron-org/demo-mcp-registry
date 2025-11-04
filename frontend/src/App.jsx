import { ThemeProvider } from './contexts/ThemeContext';
import { ServerProvider, useServers } from './contexts/ServerContext';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeToggle from './components/ThemeToggle';
import Statistics from './components/Statistics';
import SearchBar from './components/SearchBar';
import ServerGrid from './components/ServerGrid';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const AppContent = () => {
  const { servers, metadata, loading, error, updateFilters, refresh } = useServers();

  const handleSearch = (searchTerm) => {
    updateFilters({ search: searchTerm, page: 1 });
  };

  return (
    <>
      <ThemeToggle />
      
      <div className="container">
        <header>
          <h1>🚀 MCP Registry</h1>
          <p>Browse and install Model Context Protocol servers</p>
        </header>

        <main style={{ padding: '40px' }}>
          <Statistics 
            total={metadata.total || 0} 
            page={metadata.page || 1} 
            limit={metadata.limit || 20} 
          />

          <SearchBar onSearch={handleSearch} />

          {error ? (
            <ErrorMessage message={error} onRetry={refresh} />
          ) : (
            <ServerGrid servers={servers} loading={loading} />
          )}

          {metadata.totalPages > 1 && !loading && !error && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '40px',
              flexWrap: 'wrap',
            }}>
              <button
                onClick={() => updateFilters({ page: metadata.page - 1 })}
                disabled={metadata.page <= 1}
                style={{
                  padding: '10px 20px',
                  background: metadata.page <= 1 ? 'var(--badge-bg-start)' : '#667eea',
                  color: metadata.page <= 1 ? 'var(--text-muted)' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: metadata.page <= 1 ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Previous
              </button>
              <span style={{
                padding: '10px 20px',
                background: 'var(--badge-bg-start)',
                border: '2px solid var(--badge-border)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>
                Page {metadata.page} of {metadata.totalPages}
              </span>
              <button
                onClick={() => updateFilters({ page: metadata.page + 1 })}
                disabled={metadata.page >= metadata.totalPages}
                style={{
                  padding: '10px 20px',
                  background: metadata.page >= metadata.totalPages ? 'var(--badge-bg-start)' : '#667eea',
                  color: metadata.page >= metadata.totalPages ? 'var(--text-muted)' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: metadata.page >= metadata.totalPages ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Next
              </button>
            </div>
          )}
        </main>

        <footer style={{
          background: 'linear-gradient(135deg, var(--footer-bg-start), var(--footer-bg-end))',
          borderTop: '2px solid var(--footer-border)',
          padding: '30px 40px',
          textAlign: 'center',
        }}>
          <p style={{
            color: 'var(--footer-text)',
            fontSize: '14px',
            marginBottom: '10px',
          }}>
            Powered by React & Node.js | Data stored in PostgreSQL
          </p>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '12px',
          }}>
            © 2025 MCP Registry
          </p>
        </footer>
      </div>
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ServerProvider>
          <AppContent />
        </ServerProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

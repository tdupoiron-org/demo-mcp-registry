import ServerTile from './ServerTile';

const ServerGrid = ({ servers, loading }) => {
  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
      }}>
        <div style={{
          display: 'inline-block',
          width: '50px',
          height: '50px',
          border: '4px solid var(--badge-border)',
          borderTopColor: '#667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <p style={{
          marginTop: '20px',
          color: 'var(--text-secondary)',
          fontSize: '16px',
        }}>
          Loading servers...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!servers || servers.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
      }}>
        <p style={{
          fontSize: '48px',
          marginBottom: '16px',
        }}>
          📭
        </p>
        <h3 style={{
          fontSize: '20px',
          color: 'var(--text-primary)',
          marginBottom: '8px',
        }}>
          No servers found
        </h3>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
        }}>
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      padding: '20px 0',
    }}>
      {servers.map((server) => (
        <ServerTile key={server.id || server.name} server={server} />
      ))}
    </div>
  );
};

export default ServerGrid;

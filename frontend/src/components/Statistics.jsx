const Statistics = ({ total = 0, page = 1, limit = 20 }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--badge-bg-start) 0%, var(--badge-bg-end) 100%)',
      border: '2px solid var(--badge-border)',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
      marginBottom: '30px',
    }}>
      <h2 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        color: 'var(--text-primary)',
        marginBottom: '8px',
      }}>
        {total}
      </h2>
      <p style={{ 
        fontSize: '14px', 
        color: 'var(--text-secondary)',
      }}>
        MCP Servers Available
      </p>
      {total > limit && (
        <p style={{ 
          fontSize: '12px', 
          color: 'var(--text-muted)',
          marginTop: '8px',
        }}>
          Showing {((page - 1) * limit) + 1}-{Math.min(page * limit, total)} of {total}
        </p>
      )}
    </div>
  );
};

export default Statistics;

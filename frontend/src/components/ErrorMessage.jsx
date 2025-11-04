const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, var(--error-bg-start) 0%, var(--error-bg-end) 100%)',
      borderRadius: '12px',
      margin: '40px',
    }}>
      <h2 style={{ color: 'var(--error-text)', marginBottom: '16px', fontSize: '24px' }}>
        ⚠️ Error Loading Servers
      </h2>
      <p style={{ color: 'var(--error-text)', marginBottom: '24px', fontSize: '16px' }}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '12px 24px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

import { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = 'Search servers...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Debounce search
    if (value.length === 0 || value.length >= 2) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '14px 20px',
          fontSize: '16px',
          border: '2px solid var(--select-border)',
          borderRadius: '10px',
          background: 'var(--select-bg)',
          color: 'var(--text-primary)',
          transition: 'all 0.3s ease',
          outline: 'none',
        }}
        onFocus={(e) => e.target.style.borderColor = '#667eea'}
        onBlur={(e) => e.target.style.borderColor = 'var(--select-border)'}
      />
    </form>
  );
};

export default SearchBar;

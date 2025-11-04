import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      id="theme-toggle"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        fontSize: '24px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span id="theme-icon">{isDarkMode ? '☀️' : '🌙'}</span>
    </button>
  );
};

export default ThemeToggle;

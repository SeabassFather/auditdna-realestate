/**
 * Button Component for AuditDNA
 * Reusable button with multiple variants
 */
import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const getVariantStyles = () => {
    const variants = {
      primary: {
        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        color: '#fff',
        border: '2px solid #22c55e',
        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)',
      },
      secondary: {
        background: 'rgba(30, 41, 59, 0.6)',
        color: '#fff',
        border: '2px solid rgba(100, 116, 139, 0.3)',
        boxShadow: 'none',
      },
      danger: {
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: '#fff',
        border: '2px solid #ef4444',
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
      },
      warning: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: '#fff',
        border: '2px solid #f59e0b',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
      },
      info: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: '#fff',
        border: '2px solid #3b82f6',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
      },
      ghost: {
        background: 'transparent',
        color: '#94a3b8',
        border: '2px solid transparent',
        boxShadow: 'none',
      },
      outline: {
        background: 'transparent',
        color: '#22c55e',
        border: '2px solid #22c55e',
        boxShadow: 'none',
      },
    };
    return variants[variant] || variants.primary;
  };

  const getSizeStyles = () => {
    const sizes = {
      small: {
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        borderRadius: '8px',
      },
      medium: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        borderRadius: '10px',
      },
      large: {
        padding: '1rem 2rem',
        fontSize: '1.125rem',
        borderRadius: '12px',
      },
    };
    return sizes[size] || sizes.medium;
  };

  const buttonStyles = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: '600',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'all 0.3s ease',
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    outline: 'none',
  };

  const handleMouseEnter = (e) => {
    if (!disabled && !loading) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.5)';
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = getVariantStyles().boxShadow;
  };

  return (
    <button
      type={type}
      style={buttonStyles}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {loading && (
        <span style={spinnerStyles}>
          <svg
            style={{ animation: 'spin 1s linear infinite' }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75" />
          </svg>
        </span>
      )}
      {Icon && iconPosition === 'left' && !loading && <Icon size={18} />}
      {children}
      {Icon && iconPosition === 'right' && !loading && <Icon size={18} />}
    </button>
  );
};

const spinnerStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// Add keyframes for spinner animation - only once
let stylesInjected = false;
if (typeof document !== 'undefined' && !stylesInjected) {
  const existingStyle = document.getElementById('auditdna-button-keyframes');
  if (!existingStyle) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'auditdna-button-keyframes';
    styleSheet.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
  }
  stylesInjected = true;
}

export default Button;


/**
 * Input Component for AuditDNA
 * Form input with validation states, label, and error message support
 */
import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Input = forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      onBlur,
      onFocus,
      error,
      success,
      helperText,
      disabled = false,
      required = false,
      fullWidth = true,
      icon: Icon,
      iconPosition = 'left',
      className = '',
      id,
      name,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const getInputStyles = () => {
      let borderColor = 'rgba(100, 116, 139, 0.3)';
      let boxShadow = 'none';

      if (isFocused) {
        borderColor = '#22c55e';
        boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
      }
      if (error) {
        borderColor = '#ef4444';
        boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
      }
      if (success) {
        borderColor = '#22c55e';
        boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
      }

      return {
        width: fullWidth ? '100%' : 'auto',
        padding: Icon ? '0.75rem 2.5rem' : '0.75rem 1rem',
        paddingLeft: Icon && iconPosition === 'left' ? '2.5rem' : undefined,
        paddingRight: Icon && iconPosition === 'right' ? '2.5rem' : isPassword ? '2.5rem' : undefined,
        background: 'rgba(30, 41, 59, 0.6)',
        border: `2px solid ${borderColor}`,
        borderRadius: '10px',
        color: '#fff',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        outline: 'none',
        boxShadow,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'text',
      };
    };

    const handleFocus = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div style={{ ...containerStyles, width: fullWidth ? '100%' : 'auto' }} className={className}>
        {label && (
          <label htmlFor={inputId} style={labelStyles}>
            {label}
            {required && <span style={requiredStyles}>*</span>}
          </label>
        )}

        <div style={inputWrapperStyles}>
          {Icon && iconPosition === 'left' && (
            <span style={{ ...iconStyles, left: '0.75rem' }}>
              <Icon size={18} />
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            style={getInputStyles()}
            {...props}
          />

          {Icon && iconPosition === 'right' && !isPassword && (
            <span style={{ ...iconStyles, right: '0.75rem' }}>
              <Icon size={18} />
            </span>
          )}

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={passwordToggleStyles}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {(error || success) && !isPassword && (
            <span style={{ ...statusIconStyles, right: Icon && iconPosition === 'right' ? '2.5rem' : '0.75rem' }}>
              {error && <AlertCircle size={18} color="#ef4444" />}
              {success && <CheckCircle size={18} color="#22c55e" />}
            </span>
          )}
        </div>

        {(error || helperText) && (
          <p style={error ? errorStyles : helperTextStyles}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const labelStyles = {
  color: '#94a3b8',
  fontSize: '0.9rem',
  fontWeight: '600',
};

const requiredStyles = {
  color: '#ef4444',
  marginLeft: '0.25rem',
};

const inputWrapperStyles = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const iconStyles = {
  position: 'absolute',
  color: '#64748b',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
};

const passwordToggleStyles = {
  position: 'absolute',
  right: '0.75rem',
  background: 'none',
  border: 'none',
  color: '#64748b',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
};

const statusIconStyles = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
};

const helperTextStyles = {
  color: '#64748b',
  fontSize: '0.8rem',
  margin: 0,
};

const errorStyles = {
  color: '#ef4444',
  fontSize: '0.8rem',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
};

export default Input;


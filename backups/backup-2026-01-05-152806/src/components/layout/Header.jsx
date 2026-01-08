/**
 * Header Component for AuditDNA
 * Navigation bar with logo, navigation links, and user menu
 */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';

const Header = ({ onMenuToggle }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/services', label: 'Services' },
    { path: '/compliance', label: 'Compliance' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle?.(!isMenuOpen);
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>AuditDNA</span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={styles.desktopNav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.navLink,
                ...(isActive(item.path) ? styles.navLinkActive : {}),
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <div style={styles.userSection}>
          <button
            style={styles.userButton}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <User size={20} />
          </button>
          
          {isUserMenuOpen && (
            <div style={styles.userDropdown}>
              <Link to="/profile" style={styles.dropdownItem}>
                <User size={16} />
                <span>Profile</span>
              </Link>
              <Link to="/settings" style={styles.dropdownItem}>
                <Settings size={16} />
                <span>Settings</span>
              </Link>
              <button style={styles.dropdownItem}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button style={styles.menuButton} onClick={handleMenuToggle}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav style={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.mobileNavLink,
                ...(isActive(item.path) ? styles.mobileNavLinkActive : {}),
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: '2px solid rgba(34, 197, 94, 0.3)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    textDecoration: 'none',
  },
  logoText: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#22c55e',
    textShadow: '0 0 20px rgba(34, 197, 94, 0.6)',
    letterSpacing: '1px',
  },
  desktopNav: {
    display: 'flex',
    gap: '1rem',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  navLink: {
    padding: '0.75rem 1.25rem',
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: '600',
    borderRadius: '8px',
    transition: 'all 0.3s',
  },
  navLinkActive: {
    color: '#fff',
    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)',
  },
  userSection: {
    position: 'relative',
  },
  userButton: {
    background: 'rgba(30, 41, 59, 0.6)',
    border: '2px solid rgba(100, 116, 139, 0.3)',
    borderRadius: '50%',
    padding: '0.5rem',
    color: '#94a3b8',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  userDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '0.5rem',
    background: 'rgba(15, 23, 42, 0.98)',
    border: '1px solid rgba(100, 116, 139, 0.3)',
    borderRadius: '12px',
    padding: '0.5rem',
    minWidth: '160px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    color: '#94a3b8',
    textDecoration: 'none',
    borderRadius: '8px',
    width: '100%',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: '0.5rem',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
  mobileNav: {
    display: 'none',
    flexDirection: 'column',
    padding: '1rem 2rem',
    background: 'rgba(15, 23, 42, 0.98)',
    borderTop: '1px solid rgba(100, 116, 139, 0.3)',
    '@media (max-width: 768px)': {
      display: 'flex',
    },
  },
  mobileNavLink: {
    padding: '0.75rem 1rem',
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: '600',
    borderRadius: '8px',
  },
  mobileNavLinkActive: {
    color: '#fff',
    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  },
};

export default Header;


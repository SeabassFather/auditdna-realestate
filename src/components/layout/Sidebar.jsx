/**
 * Sidebar Component for AuditDNA
 * Navigation menu with collapsible sections and active state handling
 */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Leaf,
  DollarSign,
  Truck,
  BarChart2,
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState(['main']);

  const menuItems = [
    {
      id: 'main',
      title: 'Main',
      items: [
        { icon: Home, label: 'Home', path: '/' },
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: BarChart2, label: 'Analytics', path: '/analytics' },
      ],
    },
    {
      id: 'modules',
      title: 'Modules',
      items: [
        { icon: Leaf, label: 'Agriculture', path: '/agriculture' },
        { icon: DollarSign, label: 'Finance', path: '/finance' },
        { icon: ShieldCheck, label: 'Compliance', path: '/compliance' },
        { icon: Truck, label: 'Logistics', path: '/logistics' },
      ],
    },
    {
      id: 'management',
      title: 'Management',
      items: [
        { icon: FileText, label: 'Documents', path: '/documents' },
        { icon: Users, label: 'Users', path: '/users' },
        { icon: Settings, label: 'Settings', path: '/settings' },
      ],
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActive = (path) => location.pathname === path;
  const isSectionExpanded = (sectionId) => expandedSections.includes(sectionId);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div style={styles.overlay} onClick={onClose} />}

      {/* Sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <div style={styles.sidebarContent}>
          {/* Logo */}
          <div style={styles.logo}>
            <span style={styles.logoText}>AuditDNA</span>
          </div>

          {/* Navigation */}
          <nav style={styles.nav}>
            {menuItems.map((section) => (
              <div key={section.id} style={styles.section}>
                <button
                  style={styles.sectionHeader}
                  onClick={() => toggleSection(section.id)}
                >
                  <span style={styles.sectionTitle}>{section.title}</span>
                  {isSectionExpanded(section.id) ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {isSectionExpanded(section.id) && (
                  <div style={styles.sectionItems}>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          style={{
                            ...styles.navItem,
                            ...(isActive(item.path) ? styles.navItemActive : {}),
                          }}
                          onClick={onClose}
                        >
                          <Icon size={18} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div style={styles.sidebarFooter}>
            <p style={styles.version}>v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '260px',
    background: 'rgba(15, 23, 42, 0.98)',
    borderRight: '1px solid rgba(100, 116, 139, 0.3)',
    zIndex: 50,
    transition: 'transform 0.3s ease',
    overflow: 'hidden',
  },
  sidebarContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '1rem',
  },
  logo: {
    padding: '1rem',
    borderBottom: '1px solid rgba(100, 116, 139, 0.3)',
    marginBottom: '1rem',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#22c55e',
    textShadow: '0 0 20px rgba(34, 197, 94, 0.6)',
  },
  nav: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    background: 'none',
    border: 'none',
    color: '#64748b',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
  sectionTitle: {
    flex: 1,
    textAlign: 'left',
  },
  sectionItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    paddingLeft: '0.5rem',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    color: '#94a3b8',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'all 0.3s',
    fontSize: '0.9rem',
  },
  navItemActive: {
    color: '#fff',
    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)',
  },
  sidebarFooter: {
    padding: '1rem',
    borderTop: '1px solid rgba(100, 116, 139, 0.3)',
  },
  version: {
    color: '#64748b',
    fontSize: '0.75rem',
    textAlign: 'center',
    margin: 0,
  },
};

export default Sidebar;


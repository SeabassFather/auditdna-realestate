/**
 * Footer Component for AuditDNA
 * Contains copyright info, links, and contact information
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' },
      { label: 'Press', path: '/press' },
    ],
    services: [
      { label: 'Audit Services', path: '/services/audit' },
      { label: 'Compliance', path: '/services/compliance' },
      { label: 'Traceability', path: '/services/traceability' },
      { label: 'Intelligence', path: '/services/intelligence' },
    ],
    resources: [
      { label: 'Documentation', path: '/docs' },
      { label: 'API Reference', path: '/api' },
      { label: 'Support', path: '/support' },
      { label: 'FAQs', path: '/faqs' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
    ],
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Main Footer Content */}
        <div style={styles.mainContent}>
          {/* Brand Section */}
          <div style={styles.brandSection}>
            <h3 style={styles.brandName}>AuditDNA</h3>
            <p style={styles.brandDescription}>
              Comprehensive Audit Management Platform. Trusted by growers, suppliers,
              and buyers worldwide since 2010.
            </p>
            <div style={styles.socialLinks}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                <Twitter size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div style={styles.linksContainer}>
            <div style={styles.linksSection}>
              <h4 style={styles.linksSectionTitle}>Company</h4>
              {footerLinks.company.map((link) => (
                <Link key={link.path} to={link.path} style={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={styles.linksSection}>
              <h4 style={styles.linksSectionTitle}>Services</h4>
              {footerLinks.services.map((link) => (
                <Link key={link.path} to={link.path} style={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={styles.linksSection}>
              <h4 style={styles.linksSectionTitle}>Resources</h4>
              {footerLinks.resources.map((link) => (
                <Link key={link.path} to={link.path} style={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={styles.linksSection}>
              <h4 style={styles.linksSectionTitle}>Contact</h4>
              <div style={styles.contactItem}>
                <Mail size={16} />
                <span>info@auditdna.com</span>
              </div>
              <div style={styles.contactItem}>
                <Phone size={16} />
                <span>+1 (800) 123-4567</span>
              </div>
              <div style={styles.contactItem}>
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <p style={styles.copyright}>
             {currentYear} CM Products International - Built by SeabassFather. All rights reserved.
          </p>
          <div style={styles.legalLinks}>
            {footerLinks.legal.map((link) => (
              <Link key={link.path} to={link.path} style={styles.legalLink}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'rgba(15, 23, 42, 0.95)',
    borderTop: '2px solid rgba(34, 197, 94, 0.3)',
    backdropFilter: 'blur(12px)',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '3rem',
    marginBottom: '2rem',
  },
  brandSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  brandName: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#22c55e',
    margin: 0,
    textShadow: '0 0 20px rgba(34, 197, 94, 0.6)',
  },
  brandDescription: {
    color: '#94a3b8',
    lineHeight: '1.6',
    margin: 0,
    fontSize: '0.95rem',
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(100, 116, 139, 0.3)',
    borderRadius: '50%',
    color: '#94a3b8',
    textDecoration: 'none',
    transition: 'all 0.3s',
  },
  linksContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
  },
  linksSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  linksSectionTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: '1rem',
    marginBottom: '0.5rem',
    margin: 0,
  },
  link: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#94a3b8',
    fontSize: '0.9rem',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(100, 116, 139, 0.3)',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    color: '#64748b',
    fontSize: '0.85rem',
    margin: 0,
  },
  legalLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  legalLink: {
    color: '#64748b',
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'color 0.3s',
  },
};

export default Footer;


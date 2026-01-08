<<<<<<< HEAD
import React from 'react';
=======
ï»¿import React from 'react';
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-auditdna py-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-6 col-md-12 mb-4">
            <div className="d-flex align-items-center mb-3">
              <div className="logo-badge me-2">A</div>
              <span className="h5 mb-0 text-secondary-blue fw-bold">AuditDNA</span>
            </div>
            <p className="text-muted mb-3">
              Advanced audit and compliance solutions for mortgage, agriculture, and trade finance industries. 
              Streamlining processes with cutting-edge technology and ensuring regulatory compliance.
            </p>
            <div className="d-flex">
              <a href="#" className="text-muted me-3" aria-label="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-muted me-3" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold mb-3 text-secondary-blue">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/services" className="text-muted text-decoration-none">Audit Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/cases" className="text-muted text-decoration-none">Case Management</Link>
              </li>
              <li className="mb-2">
                <Link to="/files" className="text-muted text-decoration-none">Document Management</Link>
              </li>
              <li className="mb-2">
                <a href="https://nass.usda.gov/Data_and_Statistics/index.php" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-muted text-decoration-none">
                  USDA Data
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="fw-bold mb-3 text-secondary-blue">Legal & Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Terms of Service</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Contact Support</a>
              </li>
              <li className="mb-2">
                <Link to="/admin" className="text-muted text-decoration-none">Admin Portal</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0 small">
<<<<<<< HEAD
               2024 AuditDNA. All rights reserved. | Licensed Financial Services Provider
               2024 AuditDNA. All rights reserved. | Licensed Financial Services Provider
=======
               2024 AuditDNA. All rights reserved. | Licensed Financial Services Provider
               2024 AuditDNA. All rights reserved. | Licensed Financial Services Provider
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted mb-0 small">
              NMLS ID: 123456 | Equal Housing Opportunity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

<<<<<<< HEAD
export default Footer;
=======
export default Footer;
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75


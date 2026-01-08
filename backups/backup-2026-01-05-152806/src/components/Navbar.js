import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">AuditDNA</div>
    <ul>
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/trade-portal">Trade Portal</Link></li>
    </ul>
    <div className="profile-menu">
      {/* Profile/Notification icons here */}
    </div>
  </nav>
);

export default Navbar;

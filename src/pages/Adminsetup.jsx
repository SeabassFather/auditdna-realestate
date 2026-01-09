// ADMIN SETUP - Run this ONCE to create your admin account
// After running, DELETE this file or remove the route
// src/pages/AdminSetup.jsx

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

export default function AdminSetup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Creating admin account...');

    try {
      // Create Firebase Auth account
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create admin profile in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email,
        name,
        role: 'admin',  // THIS MAKES YOU ADMIN
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });

      setStatus('✅ ADMIN ACCOUNT CREATED SUCCESSFULLY!');
      setDone(true);
    } catch (error) {
      setStatus('❌ Error: ' + error.message);
    }
  };

  if (done) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          background: '#1e293b',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
          <h2 style={{ color: '#22c55e', marginBottom: '16px' }}>Admin Account Created!</h2>
          <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
            You can now login at <strong>/login</strong> with your credentials.
          </p>
          <div style={{ background: '#0f172a', padding: '16px', marginBottom: '24px' }}>
            <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 8px' }}>YOUR CREDENTIALS</p>
            <p style={{ color: '#e2e8f0', margin: '4px 0' }}>Email: <strong>{email}</strong></p>
            <p style={{ color: '#e2e8f0', margin: '4px 0' }}>Password: <strong>{password}</strong></p>
          </div>
          <p style={{ color: '#ef4444', fontSize: '13px' }}>
            ⚠️ IMPORTANT: Delete this page (AdminSetup.jsx) and remove its route from App.js!
          </p>
          <a href="/login" style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 32px',
            background: '#cba658',
            color: '#0f172a',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Go to Login →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        background: '#1e293b',
        padding: '40px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ color: '#cba658', marginBottom: '8px', textAlign: 'center' }}>
          🔐 Admin Setup
        </h2>
        <p style={{ color: '#64748b', fontSize: '13px', textAlign: 'center', marginBottom: '32px' }}>
          Create your admin account (run once only)
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '6px' }}>
              YOUR NAME
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Saul Garcia"
              required
              style={{
                width: '100%',
                padding: '12px',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#e2e8f0',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '6px' }}>
              ADMIN EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@enjoybaja.com"
              required
              style={{
                width: '100%',
                padding: '12px',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#e2e8f0',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '6px' }}>
              ADMIN PASSWORD
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Strong password (min 6 chars)"
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '12px',
                background: '#0f172a',
                border: '1px solid #334155',
                color: '#e2e8f0',
                fontSize: '14px'
              }}
            />
            <p style={{ color: '#64748b', fontSize: '11px', marginTop: '6px' }}>
              Use a strong password - you'll need this to login!
            </p>
          </div>

          {status && (
            <div style={{
              padding: '12px',
              marginBottom: '16px',
              background: status.includes('✅') ? 'rgba(34,197,94,0.2)' : status.includes('❌') ? 'rgba(239,68,68,0.2)' : 'rgba(59,130,246,0.2)',
              border: `1px solid ${status.includes('✅') ? '#22c55e' : status.includes('❌') ? '#ef4444' : '#3b82f6'}`,
              color: status.includes('✅') ? '#22c55e' : status.includes('❌') ? '#ef4444' : '#3b82f6',
              fontSize: '13px'
            }}>
              {status}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: '#cba658',
              border: 'none',
              color: '#0f172a',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Create Admin Account
          </button>
        </form>

        <p style={{ color: '#ef4444', fontSize: '11px', textAlign: 'center', marginTop: '24px' }}>
          ⚠️ Only run this ONCE! Delete this page after creating your admin account.
        </p>
      </div>
    </div>
  );
}
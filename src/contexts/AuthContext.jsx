// Firebase Auth Context for EnjoyBaja
// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user profile from Firestore
        const profile = await getUserProfile(firebaseUser.uid);
        setUser(firebaseUser);
        setUserProfile(profile);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Get user profile from Firestore
  const getUserProfile = async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: uid, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  };

  // ============================================
  // LOGIN
  // ============================================
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getUserProfile(result.user.uid);
      
      // Update last login
      await updateDoc(doc(db, 'users', result.user.uid), {
        lastLogin: serverTimestamp()
      });

      return { success: true, user: result.user, profile };
    } catch (error) {
      console.error('Login error:', error);
      let message = 'Invalid email or password';
      if (error.code === 'auth/user-not-found') message = 'No account found with this email';
      if (error.code === 'auth/wrong-password') message = 'Incorrect password';
      if (error.code === 'auth/too-many-requests') message = 'Too many attempts. Try again later.';
      return { success: false, error: message };
    }
  };

  // ============================================
  // CREATE ADMIN ACCOUNT (Run once to set up your admin)
  // ============================================
  const createAdminAccount = async (email, password, name) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create admin profile in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email,
        name,
        role: 'admin',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });

      return { success: true, user: result.user };
    } catch (error) {
      console.error('Create admin error:', error);
      return { success: false, error: error.message };
    }
  };

  // ============================================
  // CREATE AGENT ACCOUNT (Called when admin approves)
  // ============================================
  const createAgentAccount = async (agentData, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, agentData.email, password);
      
      // Create agent profile in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email: agentData.email,
        name: agentData.fullName || agentData.name,
        role: 'agent',
        company: agentData.companyName || agentData.company,
        phone: agentData.phone,
        position: agentData.position,
        status: 'active',
        createdAt: serverTimestamp(),
        approvedAt: serverTimestamp()
      });

      // Update pending agent record
      if (agentData.pendingId) {
        await updateDoc(doc(db, 'pending_agents', agentData.pendingId), {
          status: 'approved',
          approvedAt: serverTimestamp(),
          userId: result.user.uid
        });
      }

      return { success: true, user: result.user, password };
    } catch (error) {
      console.error('Create agent error:', error);
      let message = error.message;
      if (error.code === 'auth/email-already-in-use') message = 'Email already registered';
      return { success: false, error: message };
    }
  };

  // ============================================
  // REGISTER AGENT (Pending approval)
  // ============================================
  const registerAgent = async (agentData) => {
    try {
      // Check if email already exists in pending
      const pendingQuery = query(
        collection(db, 'pending_agents'), 
        where('email', '==', agentData.email)
      );
      const pendingSnap = await getDocs(pendingQuery);
      
      if (!pendingSnap.empty) {
        return { success: false, error: 'Application already submitted with this email' };
      }

      // Check if email already exists in users
      const usersQuery = query(
        collection(db, 'users'), 
        where('email', '==', agentData.email)
      );
      const usersSnap = await getDocs(usersQuery);
      
      if (!usersSnap.empty) {
        return { success: false, error: 'Email already registered' };
      }

      // Create pending agent document
      const agentId = 'AGT-' + Date.now();
      await setDoc(doc(db, 'pending_agents', agentId), {
        ...agentData,
        id: agentId,
        status: 'pending',
        submittedAt: serverTimestamp()
      });

      return { success: true, agentId };
    } catch (error) {
      console.error('Register agent error:', error);
      return { success: false, error: error.message };
    }
  };

  // ============================================
  // GET ALL PENDING AGENTS (Admin)
  // ============================================
  const getPendingAgents = async () => {
    try {
      const q = query(collection(db, 'pending_agents'), where('status', '==', 'pending'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Get pending agents error:', error);
      return [];
    }
  };

  // ============================================
  // GET ALL AGENTS (Admin)
  // ============================================
  const getAllAgents = async () => {
    try {
      // Get pending
      const pendingQuery = query(collection(db, 'pending_agents'));
      const pendingSnap = await getDocs(pendingQuery);
      const pending = pendingSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Get approved agents from users collection
      const approvedQuery = query(collection(db, 'users'), where('role', '==', 'agent'));
      const approvedSnap = await getDocs(approvedQuery);
      const approved = approvedSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), status: 'approved' }));

      return {
        pending: pending.filter(a => a.status === 'pending'),
        approved,
        rejected: pending.filter(a => a.status === 'rejected'),
        all: [...pending, ...approved]
      };
    } catch (error) {
      console.error('Get all agents error:', error);
      return { pending: [], approved: [], rejected: [], all: [] };
    }
  };

  // ============================================
  // APPROVE AGENT (Admin)
  // ============================================
  const approveAgent = async (agentId, agentData) => {
    try {
      // Generate password
      const password = generatePassword();
      
      // Create the agent's Firebase Auth account
      const result = await createAgentAccount({ ...agentData, pendingId: agentId }, password);
      
      if (!result.success) {
        return result;
      }

      return { success: true, password, email: agentData.email };
    } catch (error) {
      console.error('Approve agent error:', error);
      return { success: false, error: error.message };
    }
  };

  // ============================================
  // REJECT AGENT (Admin)
  // ============================================
  const rejectAgent = async (agentId, reason) => {
    try {
      await updateDoc(doc(db, 'pending_agents', agentId), {
        status: 'rejected',
        rejectionReason: reason,
        rejectedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Reject agent error:', error);
      return { success: false, error: error.message };
    }
  };

  // ============================================
  // PASSWORD RESET
  // ============================================
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  };

  // ============================================
  // LOGOUT
  // ============================================
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // ============================================
  // HELPER: Generate Password
  // ============================================
  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // ============================================
  // CONTEXT VALUE
  // ============================================
  const value = { 
    user,
    userProfile,
    loading,
    login, 
    logout,
    registerAgent,
    createAdminAccount,
    createAgentAccount,
    approveAgent,
    rejectAgent,
    getPendingAgents,
    getAllAgents,
    resetPassword,
    isAuthenticated: !!user, 
    isAdmin: userProfile?.role === 'admin', 
    isAgent: userProfile?.role === 'agent'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
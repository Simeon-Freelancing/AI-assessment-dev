import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase"; // your supabase client

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isInitializingAuth, setIsInitializingAuth] = useState(true);
  const [pendingEmail, setPendingEmail] = useState(null);
  const [authError, setAuthError] = useState(null);

  // Restore session on app start
  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          setSession(data.session);
          setUser(data.session.user);
        }
      } catch (err) {
        console.log("Session load error:", err);
      } finally {
        setIsInitializingAuth(false);
      }
    };

    loadSession();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("SUPABASE AUTH EVENT:", event);

        if (newSession) {
          setSession(newSession);
          setUser(newSession.user);
        } else {
          setSession(null);
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  
  const requestOtp = async (email) => {
    setAuthError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        type: "email", // ensures 6-digit OTP mode
      });

      if (error) {
        setAuthError(error.message);
        return { success: false, error };
      }

      setPendingEmail(email);
      return { success: true };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err };
    }
  };

  const verifyOtp = async (token) => {
    setAuthError(null);

    if (!pendingEmail) {
      setAuthError("No pending email for OTP verification.");
      return { success: false };
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: pendingEmail,
        token,
        type: "email",
      });

      if (error) {
        setAuthError(error.message || "Invalid OTP");
        return { success: false, error };
      }

      // Verification creates a full session automatically
      setPendingEmail(null);

      setSession(data.session);
      setUser(data.session.user);

      return { success: true, user: data.session.user };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err };
    }
  };


  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setPendingEmail(null);
      setAuthError(null);
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const clearError = () => setAuthError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isInitializingAuth,
        pendingEmail,
        authError,
        requestOtp,
        verifyOtp,
        logout,
        clearError,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

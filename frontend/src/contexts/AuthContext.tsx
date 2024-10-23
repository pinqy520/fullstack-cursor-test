import React, { createContext, useState, useContext, useEffect } from 'react'
import apiClient from '../api/client'
import type { User, LoginResponse } from '../types/api'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode;
  navigate: (path: string) => void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, navigate }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // 验证 token 有效性的逻辑
      // ...
    }

    // 监听 authError 事件
    const handleAuthError = () => {
      setUser(null)
      navigate('/login')
    };

    window.addEventListener('authError', handleAuthError);

    return () => {
      window.removeEventListener('authError', handleAuthError);
    };
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      const response: LoginResponse = await apiClient.loginUser({ email, password })
      setUser(response.user)
      localStorage.setItem('token', response.token)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = async () => {
    await apiClient.logoutUser()
    setUser(null)
    localStorage.removeItem('token')
    navigate('/login')
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

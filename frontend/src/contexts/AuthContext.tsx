import React, { createContext, useState, useContext, useEffect } from 'react'
import type { User, LoginResponse } from '../types/api'
import { useApi } from './ApiContext'

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
  const api = useApi()
  const [user, setUser] = useState<User | null>(() => {
    // 从 localStorage 初始化用户状态
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !user) {
      // 可以添加验证 token 的 API 调用
      api.validateToken()
        .then(response => {
          setUser(response.user)
          localStorage.setItem('user', JSON.stringify(response.user))
        })
        .catch(() => {
          // token 无效，清除存储的信息
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/login')
        })
    }

    const handleAuthError = () => {
      setUser(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')
    };

    window.addEventListener('authError', handleAuthError);

    return () => {
      window.removeEventListener('authError', handleAuthError);
    };
  }, [navigate, api, user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.loginUser({ email, password })
      setUser(response.user)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.logoutUser()
    } finally {
      setUser(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login')
    }
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

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response: LoginResponse = await apiClient.loginUser({ email, password })
    setUser(response.user)
    localStorage.setItem('user', JSON.stringify(response.user))
    localStorage.setItem('token', response.token)
    // 可以考虑在这里添加 axios 默认 headers
    // axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
  }

  const logout = async () => {
    await apiClient.logoutUser()
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
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

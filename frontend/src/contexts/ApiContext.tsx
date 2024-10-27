import React, { createContext, useContext } from 'react'
import type { API } from '../types/api'
import apiClient from '../api/client'

const ApiContext = createContext<API | undefined>(undefined)

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ApiContext.Provider value={apiClient}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApi = () => {
  const context = useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}

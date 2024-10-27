import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Layout } from '@douyinfe/semi-ui'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import UserManagement from './components/UserManagement'
import RoleManagement from './components/RoleManagement'
import PermissionManagement from './components/PermissionManagement'
import Navigation from './components/Navigation'
import apiClient from './api/client'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/Register'
import { ApiProvider } from './contexts/ApiContext'

const { Content } = Layout;

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ApiProvider>
      <AuthProvider navigate={navigate}>
        <Layout>
          <Navigation />
          <Content style={{ padding: '24px' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route path="/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
              <Route path="/roles" element={<PrivateRoute><RoleManagement /></PrivateRoute>} />
              <Route path="/permissions" element={<PrivateRoute><PermissionManagement /></PrivateRoute>} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Content>
        </Layout>
      </AuthProvider>
    </ApiProvider>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

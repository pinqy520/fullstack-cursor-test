import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Layout } from '@douyinfe/semi-ui'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import UserManagement from './components/UserManagement'
import RoleManagement from './components/RoleManagement'
import PermissionManagement from './components/PermissionManagement'
import Navigation from './components/Navigation'

const { Header, Content } = Layout

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return user ? element : <Navigate to="/login" replace />
}

const AppContent: React.FC = () => {
  const { user } = useAuth()

  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        {user && (
          <Header>
            <Navigation />
          </Header>
        )}
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/users" element={<PrivateRoute element={<UserManagement />} />} />
            <Route path="/roles" element={<PrivateRoute element={<RoleManagement />} />} />
            <Route path="/permissions" element={<PrivateRoute element={<PermissionManagement />} />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Typography, Card, Space, Button } from '@douyinfe/semi-ui'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div>
      <Title>Welcome to the Dashboard</Title>
      <Card style={{ marginTop: '20px' }}>
        <Paragraph>Hello, {user?.name || 'User'}!</Paragraph>
        <Paragraph>This is your personal dashboard. Here you can manage your account and access various features of the application.</Paragraph>
      </Card>
      <Space vertical align="start" style={{ marginTop: '20px' }}>
        <Button onClick={() => navigate('/users')}>Manage Users</Button>
        <Button onClick={() => navigate('/roles')}>Manage Roles</Button>
        <Button onClick={() => navigate('/permissions')}>Manage Permissions</Button>
      </Space>
    </div>
  )
}

export default Dashboard

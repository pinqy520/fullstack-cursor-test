import React, { useState } from 'react'
import { Form, Button, Typography } from '@douyinfe/semi-ui'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const { Text } = Typography

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (values: any) => {
    try {
      await login(values.email, values.password)  // 使用 AuthContext 的 login 函数存储用户信息
      navigate('/dashboard')
    } catch (err) {
      setError('Login failed. Please check your credentials.')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input field="email" label="Email" style={{ width: '100%' }} />
      <Form.Input field="password" label="Password" type="password" style={{ width: '100%' }} />
      <Button htmlType="submit" type="primary" style={{ marginTop: 16 }}>Login</Button>
      {error && <Text type="danger">{error}</Text>}
    </Form>
  )
}

export default Login

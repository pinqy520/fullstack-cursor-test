import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Form, Button, Toast } from '@douyinfe/semi-ui'
import { IconUser, IconLock } from '@douyinfe/semi-icons'

const Login: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password)
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
      Toast.error('Login failed. Please check your credentials.')
    }
  }

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          field="email"
          label="Email"
          placeholder="Enter your email"
          prefix={<IconUser />}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        />
        <Form.Input
          field="password"
          label="Password"
          placeholder="Enter your password"
          prefix={<IconLock />}
          type="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        />
        <Button type="primary" htmlType="submit" block>Login</Button>
      </Form>
    </div>
  )
}

export default Login

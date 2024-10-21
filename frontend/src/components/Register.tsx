import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Toast } from '@douyinfe/semi-ui'
import { IconUser, IconLock, IconMail } from '@douyinfe/semi-icons'

const Register: React.FC = () => {
  const navigate = useNavigate()

  const handleSubmit = async (values: { email: string; password: string; name: string }) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) {
        throw new Error('Registration failed')
      }
      Toast.success('Registration successful')
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error)
      Toast.error('Registration failed. Please try again.')
    }
  }

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          field="email"
          label="Email"
          placeholder="Enter your email"
          prefix={<IconMail />}
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
        <Form.Input
          field="name"
          label="Name"
          placeholder="Enter your name"
          prefix={<IconUser />}
          rules={[{ required: true, message: 'Please enter your name' }]}
        />
        <Button type="primary" htmlType="submit" block>Register</Button>
      </Form>
    </div>
  )
}

export default Register

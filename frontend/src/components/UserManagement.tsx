import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Toast } from '@douyinfe/semi-ui'

interface User {
  id: number
  email: string
  name: string
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      Toast.error('Failed to load users')
    }
  }

  const handleSubmit = async (values: { email: string; name: string }) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, password: 'defaultPassword' }), // In a real app, you'd want to generate a random password or have the user set it
      })
      if (!response.ok) throw new Error('Failed to create user')
      Toast.success('User created successfully')
      setVisible(false)
      fetchUsers()
    } catch (error) {
      console.error('Error creating user:', error)
      Toast.error('Failed to create user')
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Name', dataIndex: 'name' },
  ]

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setVisible(true)} style={{ marginBottom: '20px' }}>Add User</Button>
      <Table columns={columns} dataSource={users} />
      <Modal
        title="Add User"
        visible={visible}
        onOk={() => {}}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Input field="email" label="Email" rules={[{ required: true, type: 'email' }]} />
          <Form.Input field="name" label="Name" rules={[{ required: true }]} />
          <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>Submit</Button>
        </Form>
      </Modal>
    </div>
  )
}

export default UserManagement

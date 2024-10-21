import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Toast } from '@douyinfe/semi-ui'

interface Role {
  id: number
  name: string
}

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/roles')
      if (!response.ok) throw new Error('Failed to fetch roles')
      const data = await response.json()
      setRoles(data)
    } catch (error) {
      console.error('Error fetching roles:', error)
      Toast.error('Failed to load roles')
    }
  }

  const handleSubmit = async (values: { name: string }) => {
    try {
      const response = await fetch('/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error('Failed to create role')
      Toast.success('Role created successfully')
      setVisible(false)
      fetchRoles()
    } catch (error) {
      console.error('Error creating role:', error)
      Toast.error('Failed to create role')
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
  ]

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setVisible(true)} style={{ marginBottom: '20px' }}>Add Role</Button>
      <Table columns={columns} dataSource={roles} />
      <Modal
        title="Add Role"
        visible={visible}
        onOk={() => {}}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Input field="name" label="Role Name" rules={[{ required: true }]} />
          <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>Submit</Button>
        </Form>
      </Modal>
    </div>
  )
}

export default RoleManagement

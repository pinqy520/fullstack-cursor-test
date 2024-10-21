import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Toast } from '@douyinfe/semi-ui'

interface Permission {
  id: number
  name: string
}

const PermissionManagement: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetchPermissions()
  }, [])

  const fetchPermissions = async () => {
    try {
      const response = await fetch('/api/permissions')
      if (!response.ok) throw new Error('Failed to fetch permissions')
      const data = await response.json()
      setPermissions(data)
    } catch (error) {
      console.error('Error fetching permissions:', error)
      Toast.error('Failed to load permissions')
    }
  }

  const handleSubmit = async (values: { name: string }) => {
    try {
      const response = await fetch('/api/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error('Failed to create permission')
      Toast.success('Permission created successfully')
      setVisible(false)
      fetchPermissions()
    } catch (error) {
      console.error('Error creating permission:', error)
      Toast.error('Failed to create permission')
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
  ]

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setVisible(true)} style={{ marginBottom: '20px' }}>Add Permission</Button>
      <Table columns={columns} dataSource={permissions} />
      <Modal
        title="Add Permission"
        visible={visible}
        onOk={() => {}}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Input field="name" label="Permission Name" rules={[{ required: true }]} />
          <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>Submit</Button>
        </Form>
      </Modal>
    </div>
  )
}

export default PermissionManagement

import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Toast } from '@douyinfe/semi-ui'
import { API, Permission, PermissionCreationData } from '../types/api'

interface PermissionManagementProps {
  api: API
}

const PermissionManagement: React.FC<PermissionManagementProps> = ({ api }) => {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [visible, setVisible] = useState(false)
  const [formApi, setFormApi] = useState<any>(null)

  useEffect(() => {
    fetchPermissions()
  }, [])

  const fetchPermissions = async () => {
    try {
      const fetchedPermissions = await api.getAllPermissions()
      setPermissions(fetchedPermissions)
    } catch (error) {
      console.error('Failed to fetch permissions:', error)
      Toast.error('Failed to fetch permissions')
    }
  }

  const handleCreatePermission = async (values: PermissionCreationData) => {
    try {
      await api.createPermission(values)
      Toast.success('Permission created successfully')
      setVisible(false)
      formApi.reset()
      fetchPermissions()
    } catch (error) {
      console.error('Failed to create permission:', error)
      Toast.error('Failed to create permission')
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Scope', dataIndex: 'scope' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text: string, record: Permission) => (
        <Button onClick={() => handleDeletePermission(record.id)}>Delete</Button>
      ),
    },
  ]

  const handleDeletePermission = async (id: number) => {
    try {
      await api.deletePermission(id)
      Toast.success('Permission deleted successfully')
      fetchPermissions()
    } catch (error) {
      Toast.error('Failed to delete permission')
    }
  }

  return (
    <div>
      <Button onClick={() => setVisible(true)}>Create Permission</Button>
      <Table columns={columns} dataSource={permissions} />
      <Modal
        title="Create Permission"
        visible={visible}
        onOk={() => formApi.submitForm()}
        onCancel={() => setVisible(false)}
      >
        <Form getFormApi={setFormApi} onSubmit={handleCreatePermission}>
          <Form.Input field="name" label="Name" />
          <Form.Input field="description" label="Description" />
          <Form.Input field="scope" label="Scope" />
        </Form>
      </Modal>
    </div>
  )
}

export default PermissionManagement

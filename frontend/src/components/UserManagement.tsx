import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Toast, Select } from '@douyinfe/semi-ui'
import { API, User, RegistrationData, Role } from '../types/api'

interface UserManagementProps {
  api: API;
}

const UserManagement: React.FC<UserManagementProps> = ({ api }) => {
  const [users, setUsers] = useState<User[]>([])
  const [visible, setVisible] = useState(false)
  const [formApi, setFormApi] = useState<any>(null)
  const [roles, setRoles] = useState<Role[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [roleModalVisible, setRoleModalVisible] = useState(false)

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await api.getAllUsers()
      setUsers(fetchedUsers)
    } catch (error) {
      Toast.error('Failed to fetch users')
    }
  }

  const fetchRoles = async () => {
    try {
      const fetchedRoles = await api.getAllRoles()
      setRoles(fetchedRoles)
    } catch (error) {
      Toast.error('Failed to fetch roles')
    }
  }

  const handleCreateUser = async (values: RegistrationData) => {
    try {
      await api.registerUser(values)
      Toast.success('User created successfully')
      setVisible(false)
      formApi.reset()
      fetchUsers()
    } catch (error) {
      Toast.error('Failed to create user')
    }
  }

  const handleAssignRole = async (values: { roleId: number }) => {
    if (!selectedUser) return
    try {
      await api.assignRoleToUser(selectedUser.id, values.roleId)
      Toast.success('Role assigned successfully')
      setRoleModalVisible(false)
      fetchUsers()
    } catch (error) {
      Toast.error('Failed to assign role')
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text: string, record: User) => (
        <Button onClick={() => handleDeleteUser(record.id)}>Delete</Button>
      ),
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      render: (roles: Array<{ roleId: number }>, record: User) => (
        <>
          {roles.map(role => role.roleId).join(', ')}
          <Button onClick={() => { setSelectedUser(record); setRoleModalVisible(true); }}>
            Manage Roles
          </Button>
        </>
      ),
    },
  ]

  const handleDeleteUser = async (id: number) => {
    try {
      await api.deleteUser(id)
      Toast.success('User deleted successfully')
      fetchUsers()
    } catch (error) {
      Toast.error('Failed to delete user')
    }
  }

  return (
    <div>
      <Button onClick={() => setVisible(true)}>Create User</Button>
      <Table columns={columns} dataSource={users} />
      <Modal
        title="Create User"
        visible={visible}
        onOk={() => formApi.submitForm()}
        onCancel={() => setVisible(false)}
      >
        <Form getFormApi={setFormApi} onSubmit={handleCreateUser}>
          <Form.Input field="name" label="Name" />
          <Form.Input field="email" label="Email" />
          <Form.Input field="password" label="Password" type="password" />
        </Form>
      </Modal>
      <Modal
        title="Assign Role"
        visible={roleModalVisible}
        onOk={() => formApi.submitForm()}
        onCancel={() => setRoleModalVisible(false)}
      >
        <Form getFormApi={setFormApi} onSubmit={handleAssignRole}>
          <Form.Select field="roleId" label="Role" style={{ width: '100%' }}>
            {roles.map(role => (
              <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
            ))}
          </Form.Select>
        </Form>
      </Modal>
    </div>
  )
}

export default UserManagement

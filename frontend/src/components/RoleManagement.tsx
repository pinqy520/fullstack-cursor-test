import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Toast, Select } from '@douyinfe/semi-ui'
import { API, Role, RoleCreationData, Permission } from '../types/api'

interface RoleManagementProps {
  api: API;
}

const RoleManagement: React.FC<RoleManagementProps> = ({ api }) => {
  const [roles, setRoles] = useState<Role[]>([])
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [formApi, setFormApi] = useState<any>(null)
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [permissionModalVisible, setPermissionModalVisible] = useState(false)

  useEffect(() => {
    fetchRoles()
    fetchPermissions()
  }, [])

  const fetchRoles = async () => {
    try {
      const fetchedRoles = await api.getAllRoles()
      console.log('Fetched roles:', fetchedRoles);  // 添加这行来查看获取的角色数据
      setRoles(fetchedRoles)
    } catch (error) {
      console.error('Failed to fetch roles:', error)
      Toast.error('Failed to fetch roles')
    }
  }

  const fetchPermissions = async () => {
    try {
      const fetchedPermissions = await api.getAllPermissions()
      setPermissions(fetchedPermissions)
    } catch (error) {
      Toast.error('Failed to fetch permissions')
    }
  }

  const handleCreateRole = async (values: RoleCreationData) => {
    try {
      await api.createRole(values)
      Toast.success('Role created successfully')
      setVisible(false)
      formApi.reset()
      fetchRoles()
    } catch (error) {
      console.error('Failed to create role:', error)
      Toast.error('Failed to create role')
    }
  }

  const handleEditRole = async (values: RoleCreationData) => {
    if (!selectedRole) return
    try {
      await api.updateRole(selectedRole.id, values)
      Toast.success('Role updated successfully')
      setEditVisible(false)
      fetchRoles()
    } catch (error) {
      console.error('Failed to update role:', error)
      Toast.error('Failed to update role')
    }
  }

  const handleDeleteRole = async (id: number) => {
    try {
      await api.deleteRole(id)
      Toast.success('Role deleted successfully')
      fetchRoles()
    } catch (error) {
      Toast.error('Failed to delete role')
    }
  }

  const handleAssignPermission = async (values: { permissionId: number }) => {
    if (!selectedRole) return
    try {
      await api.assignPermissionToRole(selectedRole.id, values.permissionId)
      Toast.success('Permission assigned successfully')
      setPermissionModalVisible(false)
      fetchRoles()
    } catch (error) {
      Toast.error('Failed to assign permission')
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Parent Role', dataIndex: 'parentRole', render: (parentRole: Role) => parentRole?.name || 'None' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text: string, record: Role) => (
        <>
          <Button onClick={() => { setSelectedRole(record); setEditVisible(true); }}>Edit</Button>
          <Button onClick={() => handleDeleteRole(record.id)}>Delete</Button>
        </>
      ),
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      render: (permissions: Permission[] | undefined, record: Role) => (
        <>
          {permissions?.map(permission => permission.name).join(', ') || 'No permissions'}
          <Button onClick={() => { setSelectedRole(record); setPermissionModalVisible(true); }}>
            Manage Permissions
          </Button>
        </>
      ),
    },
  ]

  return (
    <div>
      <Button onClick={() => setVisible(true)}>Create Role</Button>
      <Table columns={columns} dataSource={roles} />
      <Modal
        title="Create Role"
        visible={visible}
        onOk={() => formApi.submitForm()}
        onCancel={() => setVisible(false)}
      >
        <Form getFormApi={setFormApi} onSubmit={handleCreateRole}>
          <Form.Input field="name" label="Name" />
          <Form.Input field="description" label="Description" />
          <Form.Select field="parentRoleId" label="Parent Role">
            <Select.Option value="">None</Select.Option>
            {roles.map(role => (
              <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
            ))}
          </Form.Select>
        </Form>
      </Modal>
      <Modal
        title="Edit Role"
        visible={editVisible}
        onOk={() => formApi.submitForm()}
        onCancel={() => setEditVisible(false)}
      >
        <Form getFormApi={setFormApi} onSubmit={handleEditRole} initValues={selectedRole}>
          <Form.Input field="name" label="Name" />
          <Form.Input field="description" label="Description" />
          <Form.Select field="parentRoleId" label="Parent Role">
            <Select.Option value="">None</Select.Option>
            {roles.filter(role => role.id !== selectedRole?.id).map(role => (
              <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
            ))}
          </Form.Select>
        </Form>
      </Modal>
      <Modal
        title="Assign Permission"
        visible={permissionModalVisible}
        onOk={() => formApi.submitForm()}
        onCancel={() => setPermissionModalVisible(false)}
      >
        <Form getFormApi={setFormApi} onSubmit={handleAssignPermission}>
          <Form.Select field="permissionId" label="Permission" style={{ width: '100%' }}>
            {permissions.map(permission => (
              <Select.Option key={permission.id} value={permission.id}>{permission.name}</Select.Option>
            ))}
          </Form.Select>
        </Form>
      </Modal>
    </div>
  )
}

export default RoleManagement

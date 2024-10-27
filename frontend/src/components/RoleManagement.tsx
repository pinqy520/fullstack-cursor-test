import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Toast, Select, ButtonGroup } from '@douyinfe/semi-ui'
import { Role, RoleCreationData, Permission } from '../types/api'
import { useApi } from '../contexts/ApiContext'

const RoleManagement: React.FC = () => {
  const api = useApi()
  const [roles, setRoles] = useState<Role[]>([])
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [formApi, setFormApi] = useState<any>(null)
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  useEffect(() => {
    fetchRoles()
    fetchPermissions()
  }, [])

  const fetchRoles = async () => {
    try {
      const fetchedRoles = await api.getAllRoles()
      setRoles(fetchedRoles)
    } catch (error) {
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

  const handleEditRole = async (values: RoleCreationData & { permissions: number[] }) => {
    if (!selectedRole) return
    try {
      await api.updateRole(selectedRole.id, values)
      // 更新角色的权限
      const currentPermissions = selectedRole.permissions?.map(p => p.id) || []
      const newPermissions = values.permissions || []
      
      // 移除不再需要的权限
      for (const permId of currentPermissions) {
        if (!newPermissions.includes(permId)) {
          await api.removePermissionFromRole(selectedRole.id, permId)
        }
      }
      
      // 添加新的权限
      for (const permId of newPermissions) {
        if (!currentPermissions.includes(permId)) {
          await api.assignPermissionToRole(selectedRole.id, permId)
        }
      }

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

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Parent Role', dataIndex: 'parentRole', render: (parentRole: Role) => parentRole?.name || 'None' },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      render: (permissions: Permission[] | undefined) => (
        <>{permissions?.map(permission => permission.name).join(', ') || 'No permissions'}</>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text: string, record: Role) => (
        <ButtonGroup>
          <Button onClick={() => { 
            setSelectedRole(record); 
            setEditVisible(true); 
          }}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteRole(record.id)}>
            Delete
          </Button>
        </ButtonGroup>
      ),
    },
  ]

  return (
    <div>
      <Button onClick={() => setVisible(true)}>Create Role</Button>
      <Table columns={columns} dataSource={roles} />
      
      {/* Create Role Modal */}
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

      {/* Edit Role Modal */}
      <Modal
        title="Edit Role"
        visible={editVisible}
        onOk={() => formApi.submitForm()}
        onCancel={() => setEditVisible(false)}
        width={600}
      >
        <Form 
          getFormApi={setFormApi} 
          onSubmit={handleEditRole} 
          initValues={{
            ...selectedRole,
            permissions: selectedRole?.permissions?.map(p => p.id) || []
          }}
        >
          <Form.Input field="name" label="Name" />
          <Form.Input field="description" label="Description" />
          <Form.Select field="parentRoleId" label="Parent Role">
            <Select.Option value="">None</Select.Option>
            {roles.filter(role => role.id !== selectedRole?.id).map(role => (
              <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
            ))}
          </Form.Select>
          <Form.Select
            field="permissions"
            label="Permissions"
            multiple
            style={{ width: '100%' }}
          >
            {permissions.map(permission => (
              <Select.Option 
                key={permission.id} 
                value={permission.id}
              >
                {permission.name}
              </Select.Option>
            ))}
          </Form.Select>
        </Form>
      </Modal>
    </div>
  )
}

export default RoleManagement

import React from 'react'
import { Layout, Nav, Button, Avatar } from '@douyinfe/semi-ui'
import { IconUser, IconUserGroup, IconKey, IconSetting } from '@douyinfe/semi-icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { OnSelectedData } from '@douyinfe/semi-ui/lib/es/navigation'

const { Sider } = Layout

const Navigation: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleSelect = (data: OnSelectedData) => {
    navigate(`/${data.itemKey}`)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Sider style={{ height: '100vh' }}>
      <Nav
        style={{ height: '100%' }}
        defaultSelectedKeys={['dashboard']}
        items={[
          { itemKey: 'dashboard', text: 'Dashboard', icon: <IconSetting /> },
          { itemKey: 'users', text: 'Users', icon: <IconUser /> },
          { itemKey: 'roles', text: 'Roles', icon: <IconUserGroup /> },
          { itemKey: 'permissions', text: 'Permissions', icon: <IconKey /> },
        ]}
        onSelect={handleSelect}
        header={{
          logo: <Avatar color="orange" size="small">AD</Avatar>,
          text: 'Admin Dashboard'
        }}
        footer={
          user && (
            <Button theme="borderless" style={{ width: '100%', marginTop: 12 }} onClick={handleLogout}>
              Logout
            </Button>
          )
        }
      />
    </Sider>
  )
}

export default Navigation
